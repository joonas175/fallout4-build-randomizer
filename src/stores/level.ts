import { computed } from "nanostores";
import { specialsStore } from "./special";
import { perkLevels } from "./perks";

export const currentLvl = computed<number, [typeof specialsStore, typeof perkLevels]>(
  [specialsStore, perkLevels], 
  (specials, perkLevels) => {
    return Math.max(Object.values(specials).reduce((acc, value) => acc + value, 0) - 21
      + Object.values(perkLevels).reduce((acc, value) => acc + value, 0), 0);
  }
);
