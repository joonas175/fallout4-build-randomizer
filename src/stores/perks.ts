import { computed, map } from 'nanostores';
import { perks } from '../../fo4/js/perks.js';
import type { Perk, PerkRank, Perks, SpecialPerks } from '../types/perks.js';
import { Special, specialComputedValues } from './special.js';

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

const perksInitial = () => perks.reduce((acc, perk) => {
  perk.perks.forEach(p => {
    acc[p.name] = 0;
  })
  return acc;
}, {} as Record<string, number>);

export const perkLevels = map<Record<string, number>>(perksInitial());

export const resetPerkLevels = () => {
  perkLevels.set(perksInitial());
};

export const incrementPerkLevel = (perk: string) => {
  perkLevels.setKey(perk, perkLevels.get()[perk] + 1);
}

export const decrementPerkLevel = (perk: string) => {
  const lvl = perkLevels.get()[perk];
  if(lvl > 0) {
    perkLevels.setKey(perk, perkLevels.get()[perk] - 1);
  }
}

type PerkSummaries = Record<string, string[]>;

export const perkSummaries = computed(perkLevels, (perkLevels) => {
  return perksMapped.reduce((acc, specialPerks) => {
    const specialLevel = specialComputedValues.get()[specialPerks.special];
    for(const perk of specialPerks.perks) {
      if(perk.rank > specialLevel) {
        break;
      }
      const currentRank = perkLevels[perk.name] ?? 0;
      if(currentRank > 0) {
        const summaries: string[] = [];
        perk.ranked.slice(0, currentRank).forEach((rank) => {
          summaries.push(rank.description);
        });
        acc[perk.name] = summaries;
      }
    }

    return acc;
  }, {} as PerkSummaries);
});