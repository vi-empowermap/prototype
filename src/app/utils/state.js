/* Recoil */
import { atom } from "recoil";

export const nameState = atom({
    key: 'nameState', // unique ID (with respect to other atoms/selectors)
    default: 'test', // default value (aka initial value)
  });


export const setViewAtom = atom({
  key: "setViewAtom",
  default: {
    pos: [52.5200, 13.4050],
    name: "berlin"
  }
});


export const clickedItemsListAtom = atom({
  key: "clickedItemsListAtom",
  default: [1,4,5]
})



/* Animation */
export const readyAniAtom = atom({
  key: "readyAniAtom",
  default: false
})