import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Save, Trash2, GripVertical, Eye, EyeOff, Loader2 } from "lucide-react";

type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image_url: string;
  sort_order: number;
  active: boolean;
};

export function HeroSlideEditor() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchSlides = async () => {
    const { data } = await supabase
      .from("hero_slides")
      .select("*")
      .order("sort_order", { ascending: true });
    setSlides((data as HeroSlide[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const addSlide = async () => {
    const newOrder = slides.length;
    const { data } = await supabase.from("hero_slides").insert({
      title: "New Slide",
      subtitle: "Add a subtitle",
      cta_text: "Explore",
      cta_link: "/",
      image_url: "",
      sort_order: newOrder,
      active: false,
    }).select().single();
    if (data) setSlides((prev) => [...prev, data as HeroSlide]);
  };

  const updateSlide = async (id: string, updates: Partial<HeroSlide>) => {
    setSaving(id);
    await supabase.from("hero_slides").update(updates).eq("id", id);
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setSaving(null);
  };

  const deleteSlide = async (id: string) => {
    await supabase.from("hero_slides").delete().eq("id", id);
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  if (loading) return <div className="flex items-center gap-2 py-8 justify-center"><Loader2 size={16} className="animate-spin text-accent" /><span className="text-sm text-muted-foreground">Loading slides...</span></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="label-caps text-foreground">Hero Carousel Slides</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage the rotating hero images on the homepage. Active slides override defaults.</p>
        </div>
        <button onClick={addSlide} className="skeuo-btn text-xs"><Plus size={12} /> Add Slide</button>
      </div>

      {slides.length === 0 ? (
        <div className="skeuo-card-inset p-6 rounded text-center">
          <p className="text-sm text-muted-foreground">No custom slides yet. The homepage uses default slides.</p>
          <button onClick={addSlide} className="skeuo-btn text-xs mt-3"><Plus size={12} /> Create First Slide</button>
        </div>
      ) : (
        <div className="space-y-3">
          {slides.map((slide) => (
            <div key={slide.id} className={`skeuo-card-inset p-4 rounded ${!slide.active ? "opacity-60" : ""}`}>
              <div className="flex items-start gap-3">
                <GripVertical size={14} className="text-muted-foreground/40 mt-2 flex-shrink-0" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">Title</label>
                      <input
                        value={slide.title}
                        onChange={(e) => setSlides((p) => p.map((s) => (s.id === slide.id ? { ...s, title: e.target.value } : s)))}
                        onBlur={() => updateSlide(slide.id, { title: slide.title })}
                        className="w-full px-2 py-1.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">Subtitle</label>
                      <input
                        value={slide.subtitle}
                        onChange={(e) => setSlides((p) => p.map((s) => (s.id === slide.id ? { ...s, subtitle: e.target.value } : s)))}
                        onBlur={() => updateSlide(slide.id, { subtitle: slide.subtitle })}
                        className="w-full px-2 py-1.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">Image URL</label>
                      <input
                        value={slide.image_url}
                        onChange={(e) => setSlides((p) => p.map((s) => (s.id === slide.id ? { ...s, image_url: e.target.value } : s)))}
                        onBlur={() => updateSlide(slide.id, { image_url: slide.image_url })}
                        placeholder="https://..."
                        className="w-full px-2 py-1.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">CTA Text</label>
                        <input
                          value={slide.cta_text}
                          onChange={(e) => setSlides((p) => p.map((s) => (s.id === slide.id ? { ...s, cta_text: e.target.value } : s)))}
                          onBlur={() => updateSlide(slide.id, { cta_text: slide.cta_text })}
                          className="w-full px-2 py-1.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">CTA Link</label>
                        <input
                          value={slide.cta_link}
                          onChange={(e) => setSlides((p) => p.map((s) => (s.id === slide.id ? { ...s, cta_link: e.target.value } : s)))}
                          onBlur={() => updateSlide(slide.id, { cta_link: slide.cta_link })}
                          className="w-full px-2 py-1.5 bg-muted/30 border border-border/50 rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => updateSlide(slide.id, { active: !slide.active })}
                    className={`p-1.5 rounded transition-colors ${slide.active ? "text-emerald-500 hover:bg-emerald-500/10" : "text-muted-foreground hover:bg-muted/30"}`}
                    title={slide.active ? "Active" : "Inactive"}
                  >
                    {slide.active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => deleteSlide(slide.id)} className="p-1.5 rounded text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                  {saving === slide.id && <Loader2 size={12} className="animate-spin text-accent" />}
                </div>
              </div>
              {slide.image_url && (
                <div className="mt-2 ml-7">
                  <img src={slide.image_url} alt={slide.title} className="h-16 w-28 object-cover rounded border border-border/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
