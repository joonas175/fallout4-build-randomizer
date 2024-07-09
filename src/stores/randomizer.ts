import { atom } from "nanostores";
import type { Perk } from "../types/perks";
import { currentLvl } from "./level";
import { incrementPerkLevel, perkLevels, perksMapped } from "./perks";
import { increment, specialComputedValues, specialsStore, type SpecialsStore } from "./special";

export const rolls = atom<(Perk | string)[]>([]);

export const lastRoll = atom<null | Perk | string>(null);

export const randomizeSpecials = () => {
  let specialsToSet = Math.abs(Object.values(specialsStore.get()).reduce((acc, value) => acc + value, 0) - 28 + currentLvl.get());
  while(specialsToSet > 0) {
    const special = Object.keys(specialsStore.get())[Math.floor(Math.random() * 7)] as keyof SpecialsStore;
    const value = specialsStore.get()[special as keyof SpecialsStore];
    if(value < 10) {
      specialsStore.setKey(special, value + 1);
      specialsToSet--;
    }
  }
}

export const randomize = () => {
  if(currentLvl.get() === 0) {
    randomizeSpecials();
  } else {
    const specialsAvailable = Object.entries(specialComputedValues.get()).filter(([_, value]) => value < 10).map(([key, _]) => key as keyof SpecialsStore);
    const perksRanks = perkLevels.get();
    const perksAvailable = perksMapped.reduce((acc, specialPerks) => {
      for(const perk of specialPerks.perks) {
        if(perk.rank > specialComputedValues.get()[specialPerks.special]) {
          break;
        }
        const currentRank = perksRanks[perk.name] ?? 0;
        const nextRank = perk.ranked[currentRank];
        if(nextRank) {
          if(nextRank.level <= currentLvl.get()) {
            acc.push(perk);
          }
        }
      }

      return acc;
    }, [] as Perk[]);

    if(specialsAvailable.length === 0 && perksAvailable.length === 0) {
      console.log('No specials or perks available to increment');
      return;
    }

    const randomSpecialOrPerk = [...specialsAvailable, ...perksAvailable][Math.floor(Math.random() * (specialsAvailable.length + perksAvailable.length))];

    if(typeof randomSpecialOrPerk === 'string') {
      console.log('Incrementing special', randomSpecialOrPerk);
      increment(randomSpecialOrPerk);
    } else {
      console.log('Incrementing perk', randomSpecialOrPerk.name);
      incrementPerkLevel(randomSpecialOrPerk.name);
    }

    if(randomSpecialOrPerk) {
      lastRoll.set(randomSpecialOrPerk);
      const _rolls = rolls.get();
      _rolls.push(randomSpecialOrPerk);
      rolls.set(_rolls);
    }
  }
};

