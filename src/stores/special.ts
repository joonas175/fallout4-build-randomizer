import { atom, computed, map } from 'nanostores';

export enum Special {
  STRENGTH = 'Strength',
  PERCEPTION = 'Perception',
  ENDURANCE = 'Endurance',
  CHARISMA = 'Charisma',
  INTELLIGENCE = 'Intelligence',
  AGILITY = 'Agility',
  LUCK = 'Luck'
}

export type SpecialsStore = Record<Special, number>;

export const specialsStore = map<SpecialsStore>({
  [Special.STRENGTH]: 1,
  [Special.PERCEPTION]: 1,
  [Special.ENDURANCE]: 1,
  [Special.CHARISMA]: 1,
  [Special.INTELLIGENCE]: 1,
  [Special.AGILITY]: 1,
  [Special.LUCK]: 1,
});

export const increment = (special: Special) => {
  const value = specialsStore.get()[special];
  if(value < 10) {
    specialsStore.setKey(special, value + 1);
  }
}

export const decrement = (special: Special) => {
  const value = specialsStore.get()[special];
  if(value > 1) {
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

export const imSpecialBook = atom<null | Special>(null);

export const setImSpecialBook = (special: Special) => () => {
  if(imSpecialBook.get() === special) {
    imSpecialBook.set(null);
    return;
  }
  imSpecialBook.set(special);
};

export const specialComputedValues = computed([specialsStore, bobbleheadsFoundStore, imSpecialBook], (s, bobble, book) => {
  return Object.entries(s).reduce((acc, [key, value]) => {
    acc[key as Special] = value + (bobble[key as Special] ? 1 : 0) + (book === key ? 1 : 0);

    return acc;
  }, {} as Partial<SpecialsStore>) as SpecialsStore;
});