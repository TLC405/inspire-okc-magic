import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Plus, Trash2, Link2, GitMerge, CheckCircle2, Loader2, X, Edit3, Save } from "lucide-react";

type Entity = {
  id: string;
  name: string;
  entity_type: string;
  bio: string;
  neighborhood: string | null;
  category: string | null;
  verified: boolean;
  created_at: string;
};

type Relationship = {
  id: string;
  source_id: string;
  target_id: string;
  relationship_type: string;
  weight: number;
  source_entity?: Entity;
  target_entity?: Entity;
};

const ENTITY_TYPES = ["place", "person", "organization", "event", "venue", "neighborhood"];
const REL_TYPES = ["hosts", "sponsors", "located_in", "related_to", "organized_by", "member_of"];

export function GraphEditor() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Entity | null>(null);
  const [mergeTarget, setMergeTarget] = useState<Entity | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);

  // Create form
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("place");
  const [newBio, setNewBio] = useState("");
  const [newNeighborhood, setNewNeighborhood] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Relationship form
  const [showAddRel, setShowAddRel] = useState(false);
  const [relTargetSearch, setRelTargetSearch] = useState("");
  const [relType, setRelType] = useState("related_to");
  const [relTargetId, setRelTargetId] = useState("");

  const fetchEntities = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("entities").select("*").order("name");
    if (search) query = query.ilike("name", `%${search}%`);
    if (typeFilter !== "all") query = query.eq("entity_type", typeFilter);
    const { data } = await query.limit(200);
    setEntities((data as Entity[]) || []);
    setLoading(false);
  }, [search, typeFilter]);

  useEffect(() => { fetchEntities(); }, [fetchEntities]);

  const fetchRelationships = async (entityId: string) => {
    const { data: rels } = await supabase
      .from("entity_relationships")
      .select("*")
      .or(`source_id.eq.${entityId},target_id.eq.${entityId}`);
    if (!rels) return;
    // Enrich with entity names
    const ids = new Set<string>();
    rels.forEach(r => { ids.add(r.source_id); ids.add(r.target_id); });
    const { data: relEntities } = await supabase.from("entities").select("id,name,entity_type").in("id", [...ids]);
    const entityMap = new Map((relEntities || []).map(e => [e.id, e]));
    setRelationships(rels.map(r => ({
      ...r,
      source_entity: entityMap.get(r.source_id) as Entity | undefined,
      target_entity: entityMap.get(r.target_id) as Entity | undefined,
    })));
  };

  const selectEntity = (e: Entity) => {
    setSelected(e);
    setMergeTarget(null);
    setShowAddRel(false);
    fetchRelationships(e.id);
  };

  const createEntity = async () => {
    if (!newName.trim()) return;
    await supabase.from("entities").insert({
      name: newName.trim(),
      entity_type: newType,
      bio: newBio,
      neighborhood: newNeighborhood || null,
      category: newCategory || null,
    });
    setNewName(""); setNewBio(""); setNewNeighborhood(""); setNewCategory("");
    setShowCreate(false);
    fetchEntities();
  };

  const deleteEntity = async (id: string) => {
    if (!confirm("Delete this entity and all its relationships?")) return;
    await supabase.from("entities").delete().eq("id", id);
    setSelected(null);
    fetchEntities();
  };

  const updateEntity = async () => {
    if (!editingEntity) return;
    await supabase.from("entities").update({
      name: editingEntity.name,
      entity_type: editingEntity.entity_type,
      bio: editingEntity.bio,
      neighborhood: editingEntity.neighborhood,
      category: editingEntity.category,
      verified: editingEntity.verified,
    }).eq("id", editingEntity.id);
    setEditingEntity(null);
    setSelected(editingEntity);
    fetchEntities();
  };

  const mergeEntities = async () => {
    if (!selected || !mergeTarget) return;
    if (!confirm(`Merge "${mergeTarget.name}" into "${selected.name}"? The merged entity will be deleted.`)) return;
    // Move relationships from mergeTarget to selected
    await supabase.from("entity_relationships").update({ source_id: selected.id }).eq("source_id", mergeTarget.id);
    await supabase.from("entity_relationships").update({ target_id: selected.id }).eq("target_id", mergeTarget.id);
    // Add alias
    await supabase.from("entity_aliases").insert({ entity_id: selected.id, alias: mergeTarget.name });
    // Delete merged entity
    await supabase.from("entities").delete().eq("id", mergeTarget.id);
    setMergeTarget(null);
    fetchEntities();
    fetchRelationships(selected.id);
  };

  const addRelationship = async () => {
    if (!selected || !relTargetId) return;
    await supabase.from("entity_relationships").insert({
      source_id: selected.id,
      target_id: relTargetId,
      relationship_type: relType,
    });
    setShowAddRel(false);
    setRelTargetId("");
    setRelTargetSearch("");
    fetchRelationships(selected.id);
  };

  const deleteRelationship = async (relId: string) => {
    await supabase.from("entity_relationships").delete().eq("id", relId);
    if (selected) fetchRelationships(selected.id);
  };

  const filteredForMerge = entities.filter(e => selected && e.id !== selected.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left: Entity List */}
      <div className="lg:col-span-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-2 top-2.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search entities…" className="w-full pl-8 pr-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
          </div>
          <button onClick={() => setShowCreate(!showCreate)} className="skeuo-btn px-3 py-2 text-xs">
            <Plus size={14} />
          </button>
        </div>

        <div className="flex gap-1 mb-3 flex-wrap">
          {["all", ...ENTITY_TYPES].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} className={`px-2 py-1 rounded text-[10px] font-semibold ${typeFilter === t ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        {showCreate && (
          <div className="skeuo-card p-3 rounded mb-3 space-y-2">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Entity name" className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <select value={newType} onChange={e => setNewType(e.target.value)} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground">
              {ENTITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input value={newNeighborhood} onChange={e => setNewNeighborhood(e.target.value)} placeholder="Neighborhood" className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Category" className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <textarea value={newBio} onChange={e => setNewBio(e.target.value)} placeholder="Bio" rows={2} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <button onClick={createEntity} className="skeuo-btn w-full justify-center text-xs py-2">Create Entity</button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="animate-spin text-accent" /></div>
        ) : (
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {entities.map(e => (
              <button key={e.id} onClick={() => selectEntity(e)} className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selected?.id === e.id ? "bg-accent/20 text-accent" : "hover:bg-muted/30 text-foreground"}`}>
                <div className="flex items-center gap-2">
                  {e.verified && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                  <span className="font-medium truncate">{e.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto shrink-0">{e.entity_type}</span>
                </div>
                {e.neighborhood && <span className="text-[10px] text-muted-foreground">{e.neighborhood}</span>}
              </button>
            ))}
            {entities.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No entities found. Create one to start building the graph.</p>}
          </div>
        )}
        <p className="text-[10px] text-muted-foreground mt-2">{entities.length} entities</p>
      </div>

      {/* Right: Detail / Edit / Relationships */}
      <div className="lg:col-span-2">
        {!selected ? (
          <div className="skeuo-card p-8 rounded-lg text-center">
            <Link2 size={32} className="mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">Select an entity to view details, relationships, and merge options.</p>
          </div>
        ) : editingEntity ? (
          <div className="skeuo-card p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground">Edit Entity</h3>
              <button onClick={() => setEditingEntity(null)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <input value={editingEntity.name} onChange={e => setEditingEntity({ ...editingEntity, name: e.target.value })} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <select value={editingEntity.entity_type} onChange={e => setEditingEntity({ ...editingEntity, entity_type: e.target.value })} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground">
              {ENTITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input value={editingEntity.neighborhood || ""} onChange={e => setEditingEntity({ ...editingEntity, neighborhood: e.target.value || null })} placeholder="Neighborhood" className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <input value={editingEntity.category || ""} onChange={e => setEditingEntity({ ...editingEntity, category: e.target.value || null })} placeholder="Category" className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <textarea value={editingEntity.bio} onChange={e => setEditingEntity({ ...editingEntity, bio: e.target.value })} rows={3} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={editingEntity.verified} onChange={e => setEditingEntity({ ...editingEntity, verified: e.target.checked })} />
              Verified
            </label>
            <button onClick={updateEntity} className="skeuo-btn w-full justify-center text-xs py-2"><Save size={14} className="mr-1" /> Save Changes</button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Entity Header */}
            <div className="skeuo-card p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-lg">{selected.name}</h3>
                    {selected.verified && <CheckCircle2 size={16} className="text-emerald-500" />}
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold">{selected.entity_type}</span>
                    {selected.neighborhood && <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{selected.neighborhood}</span>}
                    {selected.category && <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{selected.category}</span>}
                  </div>
                  {selected.bio && <p className="text-sm text-muted-foreground mt-2">{selected.bio}</p>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditingEntity({ ...selected })} className="p-1.5 rounded hover:bg-muted/30"><Edit3 size={14} className="text-muted-foreground" /></button>
                  <button onClick={() => deleteEntity(selected.id)} className="p-1.5 rounded hover:bg-red-500/10"><Trash2 size={14} className="text-red-400" /></button>
                </div>
              </div>
            </div>

            {/* Relationships */}
            <div className="skeuo-card p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-foreground">Relationships ({relationships.length})</h4>
                <button onClick={() => setShowAddRel(!showAddRel)} className="skeuo-btn px-2 py-1 text-[10px]"><Plus size={12} className="mr-1" /> Add</button>
              </div>

              {showAddRel && (
                <div className="p-3 bg-muted/20 rounded mb-3 space-y-2">
                  <select value={relType} onChange={e => setRelType(e.target.value)} className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground">
                    {REL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input value={relTargetSearch} onChange={e => setRelTargetSearch(e.target.value)} placeholder="Search target entity…" className="w-full px-3 py-2 bg-muted/30 border border-border/50 rounded text-sm text-foreground" />
                  {relTargetSearch && (
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {entities.filter(e => e.id !== selected.id && e.name.toLowerCase().includes(relTargetSearch.toLowerCase())).slice(0, 10).map(e => (
                        <button key={e.id} onClick={() => { setRelTargetId(e.id); setRelTargetSearch(e.name); }} className={`w-full text-left px-2 py-1 rounded text-xs ${relTargetId === e.id ? "bg-accent/20 text-accent" : "hover:bg-muted/30 text-foreground"}`}>
                          {e.name} <span className="text-muted-foreground">({e.entity_type})</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <button onClick={addRelationship} disabled={!relTargetId} className="skeuo-btn w-full justify-center text-xs py-2 disabled:opacity-50">Add Relationship</button>
                </div>
              )}

              <div className="space-y-1">
                {relationships.map(r => (
                  <div key={r.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/20 text-sm">
                    <Link2 size={12} className="text-accent shrink-0" />
                    <span className="text-foreground">{r.source_entity?.name || r.source_id}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-mono">{r.relationship_type}</span>
                    <span className="text-foreground">{r.target_entity?.name || r.target_id}</span>
                    <button onClick={() => deleteRelationship(r.id)} className="ml-auto p-1 hover:bg-red-500/10 rounded"><Trash2 size={12} className="text-red-400" /></button>
                  </div>
                ))}
                {relationships.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">No relationships yet</p>}
              </div>
            </div>

            {/* Merge Tool */}
            <div className="skeuo-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <GitMerge size={14} className="text-accent" />
                <h4 className="text-sm font-bold text-foreground">Merge Duplicate</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Select another entity to merge into "{selected.name}". Relationships transfer, the duplicate becomes an alias.</p>
              <div className="max-h-32 overflow-y-auto space-y-1 mb-2">
                {filteredForMerge.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || !search).slice(0, 20).map(e => (
                  <button key={e.id} onClick={() => setMergeTarget(e)} className={`w-full text-left px-2 py-1 rounded text-xs ${mergeTarget?.id === e.id ? "bg-amber-500/20 text-amber-600" : "hover:bg-muted/30 text-foreground"}`}>
                    {e.name} <span className="text-muted-foreground">({e.entity_type})</span>
                  </button>
                ))}
              </div>
              {mergeTarget && (
                <button onClick={mergeEntities} className="skeuo-btn w-full justify-center text-xs py-2 bg-amber-500/10 text-amber-600 border-amber-500/30">
                  <GitMerge size={14} className="mr-1" /> Merge "{mergeTarget.name}" → "{selected.name}"
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
