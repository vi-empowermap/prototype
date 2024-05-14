/* Recoil */
import { atom } from "recoil";

export const nameState = atom({
    key: 'nameState', // unique ID (with respect to other atoms/selectors)
    default: 'test', // default value (aka initial value)
  });


/* Click Event to change SetView: in MiniMap, CustomMarker, ItemList */
export const setViewAtom = atom({
  key: "setViewAtom",
  default: {
    pos: [51.1657, 10.4515],
    name: "start" // start, mini, list
  }
});


export const clickedItemsListAtom = atom({
  key: "clickedItemsListAtom",
  default: []
})

export const clikedGoogleAtom = atom({
  key: "clikedGoogle",
  default: []
})

/* current clicked marker ID */
export const clikedMarkerAtom = atom({
  key: "clikedMarkerAtom",
  default: -1
})

/* current Bundesland of MouseOver on MiniMap */
export const currentBundesLand = atom({
  key: "currentBundesLand",
  default: ""
})

/* Animation */
export const readyAniAtom = atom({
  key: "readyAniAtom",
  default: false
})

/* Orgapage Close for map resizing update */
export const closeOrgaAtom = atom({
  key: "closeOrgaAtom",
  default: true
})