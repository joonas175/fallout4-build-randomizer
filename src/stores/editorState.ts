import { atom } from "nanostores";
import { resetPerkLevels } from "./perks";
import { imSpecialBook, resetBobbleheads, resetSpecials, setImSpecialBook } from "./special";

export const editing = atom(false);

export const toggleEditing = () => {
  editing.set(!editing.get());
};

export const resetAll = () => {
  resetPerkLevels();
  resetBobbleheads();
  resetSpecials();
  imSpecialBook.set(null);
}