import { perks } from '../../fo4/js/perks.js';
import type { Perks, SpecialPerks } from '../types/perks.js';
import { Special } from './special.js';

const specialMap = {
  'st': Special.STRENGTH,
  'pe': Special.PERCEPTION,
  'en': Special.ENDURANCE,
  'ch': Special.CHARISMA,
  'in': Special.INTELLIGENCE,
  'ag': Special.AGILITY,
  'lu': Special.LUCK
}

export const perksMapped = perks.reduce<Perks>((acc, perk) => {
  perk.special = specialMap[perk.special as keyof typeof specialMap];
  acc.push(perk as SpecialPerks);
  return acc;
}, [] as Perks);