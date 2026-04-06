import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

let logged = false;

export function useVisitorLog() {
  useEffect(() => {
    if (logged) return;
    logged = true;

    supabase.functions.invoke("log-visitor", {
      body: {
        page_path: window.location.pathname,
        referrer: document.referrer || null,
      },
    }).catch(() => {});
  }, []);
}
