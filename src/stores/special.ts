import { computed, map } from 'nanostores';

export enum Special {
  STRENGTH = 'Strength',
  PERCEPTION = 'Perception',
  ENDURANCE = 'Endurance',
  CHARISMA = 'Charisma',
  INTELLIGENCE = 'Intelligence',
  AGILITY = 'Agility',
  LUCK = 'Luck'
}

type SpecialsStore = Record<Special, number>;

export const specialsStore = map<SpecialsStore>({
  [Special.STRENGTH]: 0,
  [Special.PERCEPTION]: 0,
  [Special.ENDURANCE]: 0,
  [Special.CHARISMA]: 0,
  [Special.INTELLIGENCE]: 0,
  [Special.AGILITY]: 0,
  [Special.LUCK]: 0,
});

export const increment = (special: Special) => () => {
  const value = specialsStore.get()[special];
  if(value < 10) {
    specialsStore.setKey(special, value + 1);
  }
}

export const decrement = (special: Special) => () => {
  const value = specialsStore.get()[special];
  if(value > 0) {
    specialsStore.setKey(special, specialsStore.get()[special] - 1);
  }
}

type SpecialBobbleheadsStore = Record<Special, boolean>;

export const bobbleheadsFoundStore = map<SpecialBobbleheadsStore>({
  [Special.STRENGTH]: false,
  [Special.PERCEPTION]: false,
  [Special.ENDURANCE]: false,
  [Special.CHARISMA]: false,
  [Special.INTELLIGENCE]: false,
  [Special.AGILITY]: false,
  [Special.LUCK]: false,
})

export const toggleBobbleheadFound = (special: Special) => () => {
  const value = bobbleheadsFoundStore.get()[special];
  bobbleheadsFoundStore.setKey(special, !value);
}

export const specialComputedValues = computed([specialsStore, bobbleheadsFoundStore], (s, b) => {
  return Object.entries(s).reduce((acc, [key, value]) => {
    acc[key as Special] = value + (b[key as Special] ? 1 : 0);

    return acc;
  }, {} as Partial<SpecialsStore>) as SpecialsStore;
});