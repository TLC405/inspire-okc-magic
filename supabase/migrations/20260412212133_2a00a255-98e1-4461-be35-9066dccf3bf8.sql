
-- Admin chat messages for INSPIRE Intelligence
CREATE TABLE public.admin_chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view own chat messages"
  ON public.admin_chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert own chat messages"
  ON public.admin_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete own chat messages"
  ON public.admin_chat_messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

-- Admin settings key-value store
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, setting_key)
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view own settings"
  ON public.admin_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert own settings"
  ON public.admin_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update own settings"
  ON public.admin_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete own settings"
  ON public.admin_settings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id AND public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at on admin_settings
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for fast lookups
CREATE INDEX idx_admin_chat_messages_user_id ON public.admin_chat_messages (user_id, created_at DESC);
CREATE INDEX idx_admin_settings_user_key ON public.admin_settings (user_id, setting_key);
