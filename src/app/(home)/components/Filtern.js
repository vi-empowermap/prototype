import { clickedItemsListAtom, onFilterMobileOpenAtom, onOrgaFilterAtom, onSearchFilterAtom, onSearchMobileOpenAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { angeboteBP, artderorganisationBP, sprachunterstutzungBP, themenschwerpunktBP, zielgruppeBP } from "../constant/blueprintOptionData";
import FilterAddBtn from "./filter_items/FilterAddBtn";
import SectionResetBtn from "./filter_items/SectionResetBtn";
import DynamicMiniMap from "./minimap";

const Filtern = ({onTurOnMap, turnOnMap, getData, setData, categories, placeholdertext }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const filterContainer = useRef(null);
  const [fHeight, setFHeight] = useState(0);
  const [getOrgaFilter, setOrgaFilter] = useRecoilState(onOrgaFilterAtom);
  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom);
  const [foundList, setFoundList] = useState(0);
  /* Filter */
  const [selectThemen, setSelectThmen] = useState([]);
  const [selectTags, setSelectTags] = useState([]);
  const [selectZielGroup, setSelectZielGroup] = useState([]);
  const [selectAngebote, setSelectAngebote] = useState([]);
  const [selectSprache, setSelectSprache] = useState([]);
  const [selectArt, setSelectArt] = useState([]);
  const [selectZeige, setSelectZeige] = useState([]);
  const [activeFilter, setActiveFilter] = useState({
    okThemen: false,
    okTags: false,
    okZiel: false,
    okAngebote: false,
    okSprache: false,
    okArt: false,
    okZeige: false,
  });
  const activeFilterRef = useRef({
    okThemen: false,
    okTags: false,
    okZiel: false,
    okAngebote: false,
    okSprache: false,
    okArt: false,
    okZeige: false,
  });
  /* Mobile */
  const [onFilterMobileOpen, setOnFilterMobileOpen] = useRecoilState(onFilterMobileOpenAtom);
  const [onSearchMobileOpen, setOnSearchMobileOpen] = useRecoilState(onSearchMobileOpenAtom);

  /* Note 
  1. click event
  2. Search Function
  3. reset all
  */
  /* Click Filter Item */
  const onClickFilterItem = ({ category, value }) => {
    if (category === "themen") {
      const exist = selectThemen.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectThmen([...selectThemen.filter((v) => v !== value)]);
      } else {
        setSelectThmen([...selectThemen, value]);
      }
    }
    if (category === "tags") {
      const exist = selectTags.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectTags([...selectTags.filter((v) => v !== value)]);
      } else {
        setSelectTags([...selectTags, value]);
      }
    }
    if (category === "ziel") {
      const exist = selectZielGroup.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectZielGroup([...selectZielGroup.filter((v) => v !== value)]);
      } else {
        setSelectZielGroup([...selectZielGroup, value]);
      }
    }
    if (category === "angebote") {
      const exist = selectAngebote.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectAngebote([...selectAngebote.filter((v) => v !== value)]);
      } else {
        setSelectAngebote([...selectAngebote, value]);
      }
    }
    if (category === "sprache") {
      const exist = selectSprache.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectSprache([...selectSprache.filter((v) => v !== value)]);
      } else {
        setSelectSprache([...selectSprache, value]);
      }
    }
    if (category === "art") {
      const exist = selectArt.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectArt([...selectArt.filter((v) => v !== value)]);
      } else {
        setSelectArt([...selectArt, value]);
      }
    }
    if (category === "zeige") {
      const exist = selectZeige.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectZeige([...selectZeige.filter((v) => v !== value)]);
      } else {
        setSelectZeige([...selectZeige, value]);
      }
    }
  };

  /* Open Filter */
  const onClick = () => {
    if (!openFilter) {
      setOpenFilter(true);
      setOnFilterMobileOpen(true);
      if (filterContainer.current) {
        setFHeight(filterContainer.current.clientHeight * 2);
      }
    } else {
      setOpenFilter(false);
      setOnFilterMobileOpen(false);
    }
  };
  const resetFilter = () => {
    const data = [...getData];
    for (let i = 0; i < data.length; i++) {
      data[i].filterVisible = true;
    }
    setData(data);
    setOpenFilter(false);
    setOnFilterMobileOpen(false);
    setOrgaFilter(false);
  };
  const onSelectAll = () => {
    setSelectThmen([...Object.values(themenschwerpunktBP)]);
    setSelectTags([...categories.sort()]);
    setSelectZielGroup([...Object.values(zielgruppeBP)]);
    setSelectAngebote([...Object.values(angeboteBP)]);
    setSelectSprache([...Object.values(sprachunterstutzungBP)]);
    setSelectArt([...Object.values(artderorganisationBP)]);
    setSelectZeige([...["archiv", "aktive"]]);
  };
  const onResetAll = () => {
    setSelectThmen([]);
    setSelectTags([]);
    setSelectZielGroup([]);
    setSelectAngebote([]);
    setSelectSprache([]);
    setSelectArt([]);
    setSelectZeige([]);
  };

  /* Search */
  const onSearch = () => {
    setOpenFilter(false);
    setOnFilterMobileOpen(false);
    setOrgaFilter(true);
    let count = 0;
    const data = [...getData];
    for (let i = 0; i < data.length; i++) {
      data[i].filterVisible = true;
    }
    for (let i = 0; i < data.length; i++) {
      const okThemen = selectThemen.some((v) => {
        for (let j = 0; j < data[i].themenschwerpunkt.length; j++) {
          if (themenschwerpunktBP[data[i].themenschwerpunkt[j]] === v) {
            return true;
          }
        }
      });
      const okTags = selectTags.some((v, idx) => {
        for (let j = 0; j < data[i].categories.length; j++) {
          if (data[i].categories[j] === v) {
            return true;
          }
        }
      });
      const okZiel = selectZielGroup.some((v) => {
        for (let j = 0; j < data[i].zielgruppe.length; j++) {
          if (zielgruppeBP[data[i].zielgruppe[j]] === v) {
            return true;
          }
        }
      });
      const okAngebote = selectAngebote.some((v) => {
        for (let j = 0; j < data[i].angebote.length; j++) {
          if (angeboteBP[data[i].angebote[j]] === v) {
            return true;
          }
        }
      });
      const okSprache = selectSprache.some((v) => {
        for (let j = 0; j < data[i].sprachunterstutzung.length; j++) {
          if (sprachunterstutzungBP[data[i].sprachunterstutzung[j]] === v) {
            return true;
          }
        }
      });
      const okArt = selectArt.some((v) => {
        if (artderorganisationBP[data[i].artderorganisation] === v) {
          return true;
        }
      });
      const okZeige = selectZeige.some((v) => {
        if (data[i].archivoraktiv === v) {
          return true;
        }
      });

      // if (activeFilter["okThemen"] ? okThemen : false) {
      if (
        (activeFilterRef.current["okThemen"] ? okThemen : true) &&
        (activeFilterRef.current["okTags"] ? okTags : true) &&
        (activeFilterRef.current["okZiel"] ? okZiel : true) &&
        (activeFilterRef.current["okAngebote"] ? okAngebote : true) &&
        (activeFilterRef.current["okSprache"] ? okSprache : true) &&
        (activeFilterRef.current["okArt"] ? okArt : true) &&
        (activeFilterRef.current["okZeige"] ? okZeige : true)
      ) {
        data[i].filterVisible = true;
        count += 1;
      } else {
        data[i].filterVisible = false;
      }
    }
    setFoundList(count);
    setData(data);
  };
  /* Reset */
  useEffect(() => {
    //reset

    resetFilter();
    onResetAll();
  }, [turnOnMap]);

  useEffect(() => {
    if (getOnSearchFilter) {
      //reset
      onResetAll();
      setOpenFilter(false);
      setOnFilterMobileOpen(false);
      setOrgaFilter(false);
    }
  }, [getOnSearchFilter]);

  /* Close Mobile if search clicked */
  useEffect(() => {
    if (onSearchMobileOpen) {
      setOpenFilter(false);
      setOnFilterMobileOpen(false);
    }
  }, [onSearchMobileOpen]);
  const onActiveFilter = (keyName) => {
    setActiveFilter((prev) => ({
      ...prev,
      [keyName]: !prev[keyName],
    }));
    activeFilterRef.current = {
      ...activeFilterRef.current,
      [keyName]: !activeFilterRef.current[keyName],
    };
  };
  const onResetSection = (setSection) => {
    setSection([]);
  };
  return (
    <div ref={filterContainer} className="lg:flex-1 aspect-square lg:aspect-auto h-full w-full flex items-center border-l-2 border-black lg:border-l-0 relative transition-all z-[1900] lg:z-[1300]">
      <div className="hidden lg:flex gap-2 w-full h-full items-center">
        <div onClick={onClick} className="lg:flex gap-2 cursor-pointer w-full h-full items-center hover:bg-black hover:text-white px-4">
          <span>{placeholdertext}</span>
          <span className={`${!openFilter ? "rotate-0" : "rotate-180"} transition-transform duration-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
        {getOrgaFilter && (
          <div className="px-8">
            <div className="bg-black text-white w-fit min-w-10 aspect-square flex items-center justify-center rounded-full">{foundList}</div>
          </div>
        )}
        {getOrgaFilter && (
          <button onClick={resetFilter} className={`cursor-pointer px-10 h-full flex items-center hover:bg-black hover:text-white transition-all border-l-2 border-black`}>
            reset
          </button>
        )}
      </div>
      <div onClick={onClick} className={`relative flex-1 flex h-full lg:hidden justify-center items-center cursor-pointer active:bg-black active:text-white ${openFilter ? "bg-black text-white" : "bg-white text-black"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        {getOrgaFilter && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <span className="translate-x-1/2 -translate-y-1/2 bg-black text-white min-w-5 min-h-5 text-xs flex justify-center items-center border border-white rounded-full">{String(foundList).length > 5 ? String(foundList).slice(0, 5) : String(foundList)}</span>
          </div>
        )}
      </div>

      {openFilter && (
        <div
          style={{ maxHeight: `calc(100vh - ${fHeight}px)` }}
          className="absolute top-full left-full -translate-x-full lg:translate-x-0 lg:left-[-2px] text-black w-screen lg:w-[calc(100%+2px)] bg-neutral-200 h-fit overflow-y-scroll border-b-2 border-l-0 lg:border-l-2 border-black border-t-2 border-r-0 no-scrollbar"
        >
          <div className="sticky flex items-center gap-4 top-0 left-0 border-b-2 last:border-b-0 border-black py-2 mb-2 pr-8 bg-white px-2 z-[2000]">
            <div onClick={onSearch} className="cursor-pointer border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all">
              Search
            </div>
            {/* <div onClick={onResetAll} className="cursor-pointer border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all">
              Clear All
            </div> */}
            {/* <div onClick={onSelectAll} className="cursor-pointer border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all">
              Select All
            </div> */}
            <div onClick={resetFilter} className="lg:hidden cursor-pointer border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all">
              Reset
            </div>
          </div>

          <div className="filter_item_box lg:hidden">
            {turnOnMap && <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">Mini Map</div>
              <div id="leaflet_minimap_container2" className="h-[calc(3vw+310px)] w-full flex justify-center">
                <DynamicMiniMap />
              </div>
            </div>}
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">Ohne Verortung</div>
              <div className="filter_sub_item_box">
                <div onClick={onTurOnMap} className={`filter_item ${turnOnMap ? "bg-black text-white" : "bg-white text-black"}`}>Ort</div>
              </div>
            </div>
          </div>
          <div className="filter_item_box">
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">
                <div>Nach Themenschwerpunkt</div>
                <div className="flex gap-4 text-xs">
                  <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={"okThemen"} />
                  <SectionResetBtn onResetSection={onResetSection} setSection={setSelectThmen} />
                </div>
              </div>
              {activeFilter["okThemen"] && (
                <div className="filter_sub_item_box">
                  {[...Object.values(themenschwerpunktBP).sort()].map((value, idx) => {
                    const ok = selectThemen.some((v) => v === value);
                    return (
                      <div key={idx} onClick={() => onClickFilterItem({ category: "themen", value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">
                <div>Nach Tags</div>
                <div className="flex gap-4 text-xs">
                  <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={"okTags"} />
                  <SectionResetBtn onResetSection={onResetSection} setSection={setSelectTags} />
                </div>
              </div>
              {activeFilter["okTags"] && (
                <div className="filter_sub_item_box">
                  {[...categories.sort()].map((value, idx) => {
                    const ok = selectTags.some((v) => v === value);
                    return (
                      <div key={idx} onClick={() => onClickFilterItem({ category: "tags", value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="filter_item_box">
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">
                <div>Zielgruppe</div>
                <div className="flex gap-4 text-xs">
                  <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={"okZiel"} />
                  <SectionResetBtn onResetSection={onResetSection} setSection={setSelectZielGroup} />
                </div>
              </div>
              {activeFilter["okZiel"] && (
                <div className="filter_sub_item_box">
                  {[...Object.values(zielgruppeBP).sort()].map((value, idx) => {
                    const ok = selectZielGroup.some((v) => v === value);
                    return (
                      <div key={idx} onClick={() => onClickFilterItem({ category: "ziel", value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">
                <div>Angebote</div>
                <div className="flex gap-4 text-xs">
                  <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={"okAngebote"} />
                  <SectionResetBtn onResetSection={onResetSection} setSection={setSelectAngebote} />
                </div>
              </div>
              {activeFilter["okAngebote"] && (
                <div className="filter_sub_item_box">
                  {[...Object.values(angeboteBP).sort()].map((value, idx) => {
                    const ok = selectAngebote.some((v) => v === value);
                    return (
                      <div key={idx} onClick={() => onClickFilterItem({ category: "angebote", value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="filter_item_box">
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">
                <div>Sprache</div>
                <div className="flex gap-4 text-xs">
                  <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={"okSprache"} />
                  <SectionResetBtn onResetSection={onResetSection} setSection={setSelectSprache} />
                </div>
              </div>
              {activeFilter["okSprache"] && (
                <div className="filter_sub_item_box">
                  {[...Object.values(sprachunterstutzungBP).sort()].map((value, idx) => {
                    const ok = selectSprache.some((v) => v === value);
                    return (
                      <div key={idx} onClick={() => onClickFilterItem({ category: "sprache", value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">
                <div>Art der Organisation</div>
                <div className="flex gap-4 text-xs">
                  <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={"okArt"} />
                  <SectionResetBtn onResetSection={onResetSection} setSection={setSelectArt} />
                </div>
              </div>
              {activeFilter["okArt"] && (
                <div className="filter_sub_item_box">
                  {[...Object.values(artderorganisationBP).sort()].map((value, idx) => {
                    const ok = selectArt.some((v) => v === value);
                    return (
                      <div key={idx} onClick={() => onClickFilterItem({ category: "art", value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="filter_item_box">
            <div className="filter_sub_item_box_wrapper">
              <div className="filter_item_box_title">
                <div>Zeige</div>
                <div className="flex gap-4 text-xs">
                  <FilterAddBtn onActiveFilter={onActiveFilter} activeFilter={activeFilter} keyName={"okZeige"} />
                  <SectionResetBtn onResetSection={onResetSection} setSection={setSelectZeige} />
                </div>
              </div>
              {activeFilter["okZeige"] && (
                <div className="filter_sub_item_box">
                  {[...["archiv", "aktive"]].map((value, idx) => {
                    const ok = selectZeige.some((v) => v === value);
                    return (
                      <div key={idx} onClick={() => onClickFilterItem({ category: "zeige", value: value })} className={`filter_item ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                        {value}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtern;
