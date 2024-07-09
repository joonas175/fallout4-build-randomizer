import { atom } from "nanostores";
import { perkLevels, resetPerkLevels } from "./perks";
import { bobbleheadsFoundStore, imSpecialBook, resetBobbleheads, resetSpecials, setImSpecialBook, specialsStore } from "./special";
import { currentLvl } from "./level";

export const editing = atom(false);

export const toggleEditing = () => {
  editing.set(!editing.get());
};

export const saveAutomatically = atom(true);

export const toggleSaveAutomatically = () => {
  saveAutomatically.set(!saveAutomatically.get());
};

export const resetAll = () => {
  resetPerkLevels();
  resetBobbleheads();
  resetSpecials();
  imSpecialBook.set(null);
  window.history.pushState(null, '', '');
}

type UrlParams = {
  s: ReturnType<typeof specialsStore.get>,
  p: ReturnType<typeof perkLevels.get>,
  b: ReturnType<typeof bobbleheadsFoundStore.get>,
  i: ReturnType<typeof imSpecialBook.get>,
}

export const copyBuildURL = () => {
  const urlParams: UrlParams = {
    s: specialsStore.get(),
    p: perkLevels.get(),
    b: bobbleheadsFoundStore.get(),
    i: imSpecialBook.get(),
  }

  const base64 = btoa(JSON.stringify(urlParams));

  navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${base64}`);
}

export const init = () => {
  if(window.location.search) {
    saveAutomatically.set(false);
    const base64 = window.location.search.slice(1);
    window.history.pushState(null, '', '?');
    const urlParams: UrlParams = JSON.parse(atob(base64));
    specialsStore.set(urlParams.s);
    perkLevels.set(urlParams.p);
    bobbleheadsFoundStore.set(urlParams.b);
    setImSpecialBook(urlParams.i);
  } else {
    loadLocally();
  }
};

export const saveLocally = () => {
  const urlParams: UrlParams = {
    s: specialsStore.get(),
    p: perkLevels.get(),
    b: bobbleheadsFoundStore.get(),
    i: imSpecialBook.get(),
  }

  localStorage.setItem('build', JSON.stringify(urlParams));
};

export const loadLocally = () => {
  const build = localStorage.getItem('build');
  if(build) {
    const urlParams: UrlParams = JSON.parse(build);
    specialsStore.set(urlParams.s);
    perkLevels.set(urlParams.p);
    bobbleheadsFoundStore.set(urlParams.b);
    setImSpecialBook(urlParams.i);
  }
}

currentLvl.listen(() => {
  if(saveAutomatically.get()) {
    saveLocally();
  }
});