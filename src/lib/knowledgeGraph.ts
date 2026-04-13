/**
 * Knowledge Graph — in-memory relationship graph built from static data.
 * Enables "Related Items" discovery and causal relationship mapping.
 */

import { singlesEvents } from "@/data/singlesEvents";
import { fitnessSpots } from "@/data/fitnessSpots";
import { volunteerOrgs } from "@/data/volunteerOrgs";

export type NodeType = "venue" | "neighborhood" | "category" | "organizer" | "tag" | "listing";
export type EdgeType = "hosts" | "located_in" | "organized_by" | "tagged_with" | "related_to" | "same_neighborhood";

export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  listingType?: "singles" | "fitness" | "volunteer";
  listingId?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: EdgeType;
  weight: number;
}

export interface RelatedItem {
  listingType: "singles" | "fitness" | "volunteer";
  listingId: string;
  name: string;
  reason: string;
  score: number;
}

class KnowledgeGraph {
  private nodes = new Map<string, GraphNode>();
  private adjacency = new Map<string, GraphEdge[]>();
  private built = false;

  private nodeId(type: NodeType, label: string): string {
    return `${type}:${label.toLowerCase().trim()}`;
  }

  private addNode(type: NodeType, label: string, extra?: Partial<GraphNode>): string {
    const id = this.nodeId(type, label);
    if (!this.nodes.has(id)) {
      this.nodes.set(id, { id, type, label, ...extra });
      this.adjacency.set(id, []);
    }
    return id;
  }

  private addEdge(sourceId: string, targetId: string, type: EdgeType, weight = 1) {
    const edge: GraphEdge = { source: sourceId, target: targetId, type, weight };
    this.adjacency.get(sourceId)?.push(edge);
    // Bidirectional for discovery
    const reverse: GraphEdge = { source: targetId, target: sourceId, type, weight };
    this.adjacency.get(targetId)?.push(reverse);
  }

  build() {
    if (this.built) return;

    // Index singles events
    for (const evt of singlesEvents) {
      const listingId = this.addNode("listing", `singles:${evt.id}`, {
        listingType: "singles",
        listingId: evt.id,
        label: evt.name,
      });
      const venueId = this.addNode("venue", evt.venue);
      const hoodId = this.addNode("neighborhood", evt.neighborhood);
      const catId = this.addNode("category", evt.category);
      const orgId = this.addNode("organizer", evt.organizer);

      this.addEdge(venueId, listingId, "hosts", 3);
      this.addEdge(listingId, hoodId, "located_in", 2);
      this.addEdge(orgId, listingId, "organized_by", 2);
      this.addEdge(listingId, catId, "tagged_with", 1);
      this.addEdge(venueId, hoodId, "located_in", 1);

      for (const tag of evt.tags) {
        const tagId = this.addNode("tag", tag);
        this.addEdge(listingId, tagId, "tagged_with", 1);
      }
    }

    // Index fitness spots
    for (const spot of fitnessSpots) {
      const listingId = this.addNode("listing", `fitness:${spot.id}`, {
        listingType: "fitness",
        listingId: spot.id,
        label: spot.name,
      });
      const hoodId = this.addNode("neighborhood", spot.neighborhood);
      const catId = this.addNode("category", spot.category);

      this.addEdge(listingId, hoodId, "located_in", 2);
      this.addEdge(listingId, catId, "tagged_with", 1);

      for (const tag of spot.tags) {
        const tagId = this.addNode("tag", tag);
        this.addEdge(listingId, tagId, "tagged_with", 1);
      }
    }

    // Index volunteer orgs
    for (const org of volunteerOrgs) {
      const listingId = this.addNode("listing", `volunteer:${org.id}`, {
        listingType: "volunteer",
        listingId: org.id,
        label: org.name,
      });
      const hoodId = this.addNode("neighborhood", org.neighborhood);
      const catId = this.addNode("category", org.category);

      this.addEdge(listingId, hoodId, "located_in", 2);
      this.addEdge(listingId, catId, "tagged_with", 1);

      for (const tag of org.tags) {
        const tagId = this.addNode("tag", tag);
        this.addEdge(listingId, tagId, "tagged_with", 1);
      }
    }

    this.built = true;
  }

  /**
   * Find related items for a given listing.
   */
  getRelated(listingType: "singles" | "fitness" | "volunteer", listingId: string, limit = 5): RelatedItem[] {
    this.build();

    const sourceId = this.nodeId("listing", `${listingType}:${listingId}`);
    const sourceNode = this.nodes.get(sourceId);
    if (!sourceNode) return [];

    // Two-hop traversal: listing → shared node → other listing
    const scores = new Map<string, { score: number; reasons: Set<string> }>();

    const firstHop = this.adjacency.get(sourceId) || [];
    for (const edge1 of firstHop) {
      const intermediateNode = this.nodes.get(edge1.target);
      if (!intermediateNode || intermediateNode.type === "listing") continue;

      const secondHop = this.adjacency.get(edge1.target) || [];
      for (const edge2 of secondHop) {
        const targetNode = this.nodes.get(edge2.target);
        if (!targetNode || targetNode.type !== "listing" || edge2.target === sourceId) continue;

        const key = edge2.target;
        const existing = scores.get(key) || { score: 0, reasons: new Set<string>() };

        const hopScore = edge1.weight * edge2.weight;
        existing.score += hopScore;

        if (intermediateNode.type === "venue") existing.reasons.add(`Also at ${intermediateNode.label}`);
        else if (intermediateNode.type === "neighborhood") existing.reasons.add(`More in ${intermediateNode.label}`);
        else if (intermediateNode.type === "organizer") existing.reasons.add(`By ${intermediateNode.label}`);
        else if (intermediateNode.type === "category") existing.reasons.add(`${intermediateNode.label}`);
        else if (intermediateNode.type === "tag") existing.reasons.add(`#${intermediateNode.label}`);

        scores.set(key, existing);
      }
    }

    const results: RelatedItem[] = [];
    for (const [nodeId, { score, reasons }] of scores) {
      const node = this.nodes.get(nodeId)!;
      if (node.listingType && node.listingId) {
        results.push({
          listingType: node.listingType,
          listingId: node.listingId,
          name: node.label,
          reason: [...reasons].slice(0, 2).join(" · "),
          score,
        });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /**
   * Get all listings connected to a neighborhood.
   */
  getByNeighborhood(neighborhood: string): RelatedItem[] {
    this.build();
    const hoodId = this.nodeId("neighborhood", neighborhood);
    const edges = this.adjacency.get(hoodId) || [];

    return edges
      .map((e) => this.nodes.get(e.target))
      .filter((n): n is GraphNode => !!n && n.type === "listing" && !!n.listingType && !!n.listingId)
      .map((n) => ({
        listingType: n.listingType!,
        listingId: n.listingId!,
        name: n.label,
        reason: `In ${neighborhood}`,
        score: 1,
      }));
  }

  /**
   * Get graph statistics for admin context.
   */
  getStats() {
    this.build();
    const typeCounts: Record<string, number> = {};
    for (const node of this.nodes.values()) {
      typeCounts[node.type] = (typeCounts[node.type] || 0) + 1;
    }
    let edgeCount = 0;
    for (const edges of this.adjacency.values()) {
      edgeCount += edges.length;
    }
    return {
      nodeCount: this.nodes.size,
      edgeCount: edgeCount / 2, // bidirectional
      typeCounts,
    };
  }
}

// Singleton
export const knowledgeGraph = new KnowledgeGraph();
