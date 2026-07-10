
-- 1. Fix RLS policy always true: newsletter_subscribers INSERT
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- 2. Set search_path on remaining SECURITY DEFINER functions
CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public','pgmq'
AS $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public','pgmq'
AS $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
 RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public','pgmq'
AS $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public','pgmq'
AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$function$;

-- 3. Remove moderation_queue (admin-only sensitive content) from Realtime publication
--    so unauthenticated/authenticated users cannot subscribe to its channel.
ALTER PUBLICATION supabase_realtime DROP TABLE public.moderation_queue;

-- 4. Document that feed_sources.config must never store raw credentials/secrets;
--    secrets belong in Vault. Enforce with a defensive check constraint on common
--    secret-shaped keys.
COMMENT ON COLUMN public.feed_sources.config IS
  'Non-sensitive feed configuration only. Never store API keys, tokens, passwords, or secrets here — use Supabase Vault.';

ALTER TABLE public.feed_sources
  DROP CONSTRAINT IF EXISTS feed_sources_config_no_secrets;
ALTER TABLE public.feed_sources
  ADD CONSTRAINT feed_sources_config_no_secrets
  CHECK (
    config IS NULL
    OR NOT (
      config ? 'api_key'
      OR config ? 'apiKey'
      OR config ? 'secret'
      OR config ? 'password'
      OR config ? 'token'
      OR config ? 'access_token'
      OR config ? 'refresh_token'
      OR config ? 'private_key'
    )
  );
