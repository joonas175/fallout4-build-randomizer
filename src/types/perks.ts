import type { Special } from "../stores/special";

export type PerkRank = {
  rank: number;
  level: number;
  description: string;
}

export type Perk = {
  rank: number;
  name: string;
  img: string;
  ranks: number;
  ranked: PerkRank[];
}

export type SpecialPerks = {
  special: Special;
  perks: Perk[];
}

export type Perks = SpecialPerks[]