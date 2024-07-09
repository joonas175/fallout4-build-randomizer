import { atom } from "nanostores";

export const editing = atom(false);

export const toggleEditing = () => {
  editing.set(!editing.get());
};