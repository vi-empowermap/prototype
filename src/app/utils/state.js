/* Recoil */
import { atom } from "recoil";


export const geoLocationPermissionError = atom({
  key: "geoLocationPermission",
  default: false
})
export const nameState = atom({
    key: 'nameState', // unique ID (with respect to other atoms/selectors)
    default: 'test', // default value (aka initial value)
  });


/* Click Event to change SetView: in MiniMap, CustomMarker, ItemList */
export const setViewAtom = atom({
  key: "setViewAtom",
  default: {
    pos: [51.1657, 10.4515],
    name: "start", // start, mini, list
    type: "start"
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


/* Filter */
export const onSearchFilterAtom = atom({
  key: "onSearchFilterAtom",
  default: false
})
export const onOrgaFilterAtom = atom({
  key: "onOrgaFilterAtom",
  default: false
})

/* Filter & Search Mobile Open Button */
export const onSearchMobileOpenAtom = atom({
  key: "onSearchMobileOpenAtom",
  default: false
})
export const onFilterMobileOpenAtom = atom({
  key: "onFilterMobileOpenAtom",
  default: false
})
export const highLightWordAtom = atom({
  key: "highLightWordAtom",
  default: []
})

/* Orga Filter */
export const onOrgaFilterActivateAtom = atom({
  key: "onOrgaFilterActivateAtom",
  default: {
    ready: false,
    all: false,
    location: false,
    bundes: ""
  }

})


