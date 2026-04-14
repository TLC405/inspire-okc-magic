import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";

type SiteModule = {
  id: string;
  section_key: string;
  label: string;
  visible: boolean;
  sort_order: number;
  config: Record<string, any>;
};

type SiteCopyMap = Record<string, string>;

interface SiteConfig {
  modules: SiteModule[];
  copy: SiteCopyMap;
  isModuleVisible: (key: string) => boolean;
  getCopy: (key: string, fallback?: string) => string;
  loading: boolean;
}

const defaultConfig: SiteConfig = {
  modules: [],
  copy: {},
  isModuleVisible: () => true,
  getCopy: (_key, fallback = "") => fallback,
  loading: true,
};

export const SiteConfigContext = createContext<SiteConfig>(defaultConfig);

export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext);
}

export function useSiteConfigLoader(): SiteConfig {
  const [modules, setModules] = useState<SiteModule[]>([]);
  const [copy, setCopy] = useState<SiteCopyMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("site_modules").select("*").order("sort_order", { ascending: true }),
      supabase.from("site_copy").select("*"),
    ]).then(([modRes, copyRes]) => {
      if (modRes.data) setModules(modRes.data as SiteModule[]);
      if (copyRes.data) {
        const map: SiteCopyMap = {};
        copyRes.data.forEach((row: any) => {
          map[row.copy_key] = row.copy_value;
        });
        setCopy(map);
      }
      setLoading(false);
    });
  }, []);

  const isModuleVisible = (key: string) => {
    if (modules.length === 0) return true; // No modules configured = show all
    const mod = modules.find(m => m.section_key === key);
    return mod ? mod.visible : true; // Unknown key = show
  };

  const getCopy = (key: string, fallback = "") => {
    return copy[key] || fallback;
  };

  return { modules, copy, isModuleVisible, getCopy, loading };
}
