import { onFilterMobileOpenAtom, onOrgaFilterActivateAtom, onOrgaFilterAtom, onSearchFilterAtom, onSearchMobileOpenAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { angeboteBP, artderorganisationBP, bundeslandBP, sprachunterstutzungBP, themenschwerpunktBP, zielgruppeBP } from "../constant/blueprintOptionData";
import DynamicMiniMap from "./minimap";
import FilterItemBox from "./filter_items/FilterItemBox";
import OpenIcon from "/public/assets/icons/open.svg"
import { ICON_SIZE, ICON_STROKE_SIZE } from "../constant/iconSize";
const Filtern = ({ onTurOnMap, turnOnMap, getData, setData, categories, placeholdertext, panelTexts }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const filterContainer = useRef(null);
  const [fHeight, setFHeight] = useState(0);
  const [getOrgaFilter, setOrgaFilter] = useRecoilState(onOrgaFilterAtom);
  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom);
  const [foundList, setFoundList] = useState(0);
  const [getOrgaFilterActivateAtom, setOrgaFilterActivateAtom] = useRecoilState(onOrgaFilterActivateAtom);
  /* Filter */
  const [selectBundesland, setSelectBundesland] = useState([]);
  const [selectThemen, setSelectThmen] = useState([]);
  const [selectTags, setSelectTags] = useState([]);
  const [selectZielGroup, setSelectZielGroup] = useState([]);
  const [selectAngebote, setSelectAngebote] = useState([]);
  const [selectSprache, setSelectSprache] = useState([]);
  const [selectArt, setSelectArt] = useState([]);
  const [selectZeige, setSelectZeige] = useState([]);

  const selectBundeslandRef = useRef([]);
  const selectThemenRef = useRef([]);
  const selectTagsRef = useRef([]);
  const selectZielGroupRef = useRef([]);
  const selectAngeboteRef = useRef([]);
  const selectSpracheRef = useRef([]);
  const selectArtRef = useRef([]);
  const selectZeigeRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState({
    okBundes: false,
    okThemen: false,
    okTags: false,
    okZiel: false,
    okAngebote: false,
    okSprache: false,
    okArt: false,
    okZeige: false,
  });
  const activeFilterRef = useRef({
    okBundes: false,
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

  useEffect(() => {
    
  },[ ])
  /* Note 
  1. click event
  2. Search Function
  3. reset all
  */
  /* Click Filter Item */
  const onClickFilterItem = ({ category, value }) => {
    if (category === "bundes") {
      const exist = selectBundesland.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectBundesland([...selectBundesland.filter((v) => v !== value)]);
        selectBundeslandRef.current = [...selectBundesland.filter((v) => v !== value)];
      } else {
        setSelectBundesland([...selectBundesland, value]);
        selectBundeslandRef.current = [...selectBundesland, value];
      }
    }
    if (category === "themen") {
      const exist = selectThemen.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectThmen([...selectThemen.filter((v) => v !== value)]);
        selectThemenRef.current = [...selectThemen.filter((v) => v !== value)];
      } else {
        setSelectThmen([...selectThemen, value]);
        selectThemenRef.current = [...selectThemen, value];
      }
    }
    if (category === "tags") {
      const exist = selectTags.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectTags([...selectTags.filter((v) => v !== value)]);
        selectTagsRef.current = [...selectTags.filter((v) => v !== value)];
      } else {
        setSelectTags([...selectTags, value]);
        selectTagsRef.current = [...selectTags, value];
      }
    }
    if (category === "ziel") {
      const exist = selectZielGroup.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectZielGroup([...selectZielGroup.filter((v) => v !== value)]);
        selectZielGroupRef.current = [...selectZielGroup.filter((v) => v !== value)];
      } else {
        setSelectZielGroup([...selectZielGroup, value]);
        selectZielGroupRef.current = [...selectZielGroup, value];
      }
    }
    if (category === "angebote") {
      const exist = selectAngebote.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectAngebote([...selectAngebote.filter((v) => v !== value)]);
        selectAngeboteRef.current = [...selectAngebote.filter((v) => v !== value)];
      } else {
        setSelectAngebote([...selectAngebote, value]);
        selectAngeboteRef.current = [...selectAngebote, value];
      }
    }
    if (category === "sprache") {
      const exist = selectSprache.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectSprache([...selectSprache.filter((v) => v !== value)]);
        selectSpracheRef.current = [...selectSprache.filter((v) => v !== value)];
      } else {
        setSelectSprache([...selectSprache, value]);
        selectSpracheRef.current = [...selectSprache, value];
      }
    }
    if (category === "art") {
      const exist = selectArt.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectArt([...selectArt.filter((v) => v !== value)]);
        selectArtRef.current = [...selectArt.filter((v) => v !== value)];
      } else {
        setSelectArt([...selectArt, value]);
        selectArtRef.current = [...selectArt, value];
      }
    }
    if (category === "zeige") {
      const exist = selectZeige.findIndex((v) => v === value);
      if (exist >= 0) {
        setSelectZeige([...selectZeige.filter((v) => v !== value)]);
        selectZeigeRef.current = [...selectZeige.filter((v) => v !== value)];
      } else {
        setSelectZeige([...selectZeige, value]);
        selectZeigeRef.current = [...selectZeige, value];
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
    setActiveFilter({
      okBundes: false,
      okThemen: false,
      okTags: false,
      okZiel: false,
      okAngebote: false,
      okSprache: false,
      okArt: false,
      okZeige: false,
    });
    activeFilterRef.current = {
      okBundes: false,
      okThemen: false,
      okTags: false,
      okZiel: false,
      okAngebote: false,
      okSprache: false,
      okArt: false,
      okZeige: false,
    };
    onResetAll();
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
    setSelectBundesland([]);
    setSelectThmen([]);
    setSelectTags([]);
    setSelectZielGroup([]);
    setSelectAngebote([]);
    setSelectSprache([]);
    setSelectArt([]);
    setSelectZeige([]);
    selectBundeslandRef.current = [];
    selectThemenRef.current = [];
    selectTagsRef.current = [];
    selectZielGroupRef.current = [];
    selectAngeboteRef.current = [];
    selectSpracheRef.current = [];
    selectArtRef.current = [];
    selectZeigeRef.current = [];
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
      const okBundes = selectBundeslandRef.current.some((v) => {
        if (String(bundeslandBP[String(data[i].bundesland)]).toLocaleLowerCase() === String(v).toLocaleLowerCase()) {
          return true;
        }
      });
      const okThemen = selectThemenRef.current.some((v) => {
        for (let j = 0; j < data[i].themenschwerpunkt.length; j++) {
          if (themenschwerpunktBP[data[i].themenschwerpunkt[j]] === v) {
            return true;
          }
        }
      });
      const okTags = selectTagsRef.current.some((v, idx) => {
        for (let j = 0; j < data[i].categories.length; j++) {
          if (data[i].categories[j] === v) {
            return true;
          }
        }
      });
      const okZiel = selectZielGroupRef.current.some((v) => {
        for (let j = 0; j < data[i].zielgruppe.length; j++) {
          if (zielgruppeBP[data[i].zielgruppe[j]] === v) {
            return true;
          }
        }
      });
      const okAngebote = selectAngeboteRef.current.some((v) => {
        for (let j = 0; j < data[i].angebote.length; j++) {
          if (angeboteBP[data[i].angebote[j]] === v) {
            return true;
          }
        }
      });
      const okSprache = selectSpracheRef.current.some((v) => {
        for (let j = 0; j < data[i].sprachunterstutzung.length; j++) {
          if (sprachunterstutzungBP[data[i].sprachunterstutzung[j]] === v) {
            return true;
          }
        }
      });
      const okArt = selectArtRef.current.some((v) => {
        if (artderorganisationBP[data[i].artderorganisation] === v) {
          return true;
        }
      });
      const okZeige = selectZeigeRef.current.some((v) => {
        if (data[i].archivoraktiv === v) {
          return true;
        }
      });

      // if (activeFilter["okThemen"] ? okThemen : false) {
      if (
        (activeFilterRef.current["okBundes"] ? okBundes : true) &&
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
    if (getOrgaFilterActivateAtom.ready) {
      console.log(getOrgaFilterActivateAtom.location)
      setActiveFilter({
        okBundes: getOrgaFilterActivateAtom.location ? true : false,
        okThemen: getOrgaFilterActivateAtom.all,
        okTags: getOrgaFilterActivateAtom.all,
        okZiel: getOrgaFilterActivateAtom.all,
        okAngebote: getOrgaFilterActivateAtom.all,
        okSprache: getOrgaFilterActivateAtom.all,
        okArt: getOrgaFilterActivateAtom.all,
        okZeige: getOrgaFilterActivateAtom.all,
      });
      activeFilterRef.current = {
        okBundes: getOrgaFilterActivateAtom.location ? true : false,
        okThemen: getOrgaFilterActivateAtom.all,
        okTags: getOrgaFilterActivateAtom.all,
        okZiel: getOrgaFilterActivateAtom.all,
        okAngebote: getOrgaFilterActivateAtom.all,
        okSprache: getOrgaFilterActivateAtom.all,
        okArt: getOrgaFilterActivateAtom.all,
        okZeige: getOrgaFilterActivateAtom.all,
      };
      if (!getOrgaFilterActivateAtom.all) {
        
        setSelectBundesland([getOrgaFilterActivateAtom.bundes]);
        selectBundeslandRef.current = [getOrgaFilterActivateAtom.bundes];
      } else {
        setSelectBundesland([getOrgaFilterActivateAtom.bundes]);
        selectBundeslandRef.current = [getOrgaFilterActivateAtom.bundes];
        setSelectThmen([...getOrgaFilterActivateAtom.themen]);
        selectThemenRef.current = [...getOrgaFilterActivateAtom.themen];
        setSelectTags([...getOrgaFilterActivateAtom.tags]);
        selectTagsRef.current = [...getOrgaFilterActivateAtom.tags];
        setSelectZielGroup([...getOrgaFilterActivateAtom.ziel]);
        selectZielGroupRef.current = [...getOrgaFilterActivateAtom.ziel];
        setSelectAngebote([...getOrgaFilterActivateAtom.angebote]);
        selectAngeboteRef.current = [...getOrgaFilterActivateAtom.angebote];
        setSelectSprache([...getOrgaFilterActivateAtom.sprache]);
        selectSpracheRef.current = [...getOrgaFilterActivateAtom.sprache];
        setSelectArt([...getOrgaFilterActivateAtom.art]);
        selectArtRef.current = [...getOrgaFilterActivateAtom.art];
        setSelectZeige([getOrgaFilterActivateAtom.zeige]);
        selectZeigeRef.current = [getOrgaFilterActivateAtom.zeige];
      }
      onSearch();
    }
  }, [getOrgaFilterActivateAtom.ready]);

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
  const onResetSection = (setSection, setRef) => {
    setSection([]);
    setRef.current = [];
  };
  return (
    <div ref={filterContainer} className="lg:flex-1 aspect-square lg:aspect-auto h-full w-full flex items-center border-l border-black lg:border-l-0 relative transition-all z-[1900] lg:z-[1300] select-none font-jetBrainsMono font-medium">
      <div className="hidden lg:flex gap-2 w-full h-full items-center">
        <div onClick={onClick} className="lg:flex gap-2 cursor-pointer w-full h-full items-center stroke-black hover:stroke-white hover:bg-black hover:text-white px-4">
          <span className="font-jetBrainsMono font-medium">{placeholdertext}</span>
          <span className={`${!openFilter ? "rotate-0" : "rotate-180"} transition-transform duration-500`}>
            <OpenIcon style={{strokeWidth: ICON_STROKE_SIZE,width: ICON_SIZE, height: ICON_SIZE}} />
          </span>
        </div>
        {getOrgaFilter && (
          <div className="px-8">
            <div className="bg-black text-white w-fit min-w-10 aspect-square flex items-center justify-center rounded-full">{foundList}</div>
          </div>
        )}
        {getOrgaFilter && (
          <button onClick={resetFilter} className={`cursor-pointer px-10 h-full flex items-center hover:bg-black hover:text-white transition-all border-l border-black`}>
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
          className="absolute top-full left-full -translate-x-full lg:translate-x-0 lg:left-[-3px] text-black w-screen lg:w-[calc(100%+3px)] bg-neutral-100 h-fit overflow-y-scroll border-b border-l-0 lg:border-l border-black border-t border-r-0 no-scrollbar"
        >
          <div className="filter_item_box lg:hidden">
            {turnOnMap && (
              <div className="filter_sub_item_box_wrapper">
                <div className="filter_item_box_title border-t-0 border-b px-2 h-10">Mini Map</div>
                <div id="leaflet_minimap_container2" className="h-[calc(3vw+310px)] w-full flex justify-center">
                  <DynamicMiniMap setOpenFilter={setOpenFilter} />
                </div>
              </div>
            )}
            <div className="filter_sub_item_box_wrapper">
              <div className={`filter_item_box_title ${!turnOnMap && "border-t-0"} border-b px-2 h-10`}>Ohne Verortung</div>
              <div className="filter_sub_item_box">
                <div onClick={onTurOnMap} className={`filter_item ${turnOnMap ? "bg-black text-white" : "bg-white text-black"}`}>
                  Ort
                </div>
              </div>
            </div>
          </div>
          <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectBundesland} //
            setRef={selectBundeslandRef} //
            keyName={"okBundes"} // 
            arrayData={Object.values(bundeslandBP)} // 
            titleName={panelTexts.fbundesland} // 
            turnOnMap={turnOnMap}
            locationBox={true} // 
            categoryName={"bundes"} // 
            onClickFilterItem={onClickFilterItem}
            selectList={selectBundesland} //
            top={true}
           />
        
          <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectThmen}
            setRef={selectThemenRef}
            keyName={"okThemen"}
            arrayData={Object.values(themenschwerpunktBP)}
            titleName={panelTexts.fthemenschwerpunkt}
            turnOnMap={turnOnMap}
            locationBox={false}
            categoryName={"themen"}
            onClickFilterItem={onClickFilterItem}
            selectList={selectThemen}
            sTop={true}
           />
        
          <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectTags} //
            setRef={selectTagsRef} //
            keyName={"okTags"} // 
            arrayData={categories} // 
            titleName={panelTexts.ftag} // 
            turnOnMap={turnOnMap}
            locationBox={false} // 
            categoryName={"tags"} // 
            onClickFilterItem={onClickFilterItem}
            selectList={selectTags} //
            top={false}
           />
         
          <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectZielGroup} //
            setRef={selectZielGroupRef} //
            keyName={"okZiel"} // 
            arrayData={Object.values(zielgruppeBP)} // 
            titleName={panelTexts.fzielgroup} // 
            turnOnMap={turnOnMap}
            locationBox={false} // 
            categoryName={"ziel"} // 
            onClickFilterItem={onClickFilterItem}
            selectList={selectZielGroup} //
            top={false}
           />
         
         <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectAngebote} //
            setRef={selectAngeboteRef} //
            keyName={"okAngebote"} // 
            arrayData={Object.values(angeboteBP)} // 
            titleName={panelTexts.fangebote} // 
            turnOnMap={turnOnMap}
            locationBox={false} // 
            categoryName={"angebote"} // 
            onClickFilterItem={onClickFilterItem}
            selectList={selectAngebote} //
            top={false}
           />
         <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectSprache} //
            setRef={selectSpracheRef} //
            keyName={"okSprache"} // 
            arrayData={Object.values(sprachunterstutzungBP)} // 
            titleName={panelTexts.fsprache} // 
            turnOnMap={turnOnMap}
            locationBox={false} // 
            categoryName={"sprache"} // 
            onClickFilterItem={onClickFilterItem}
            selectList={selectSprache} //
            top={false}
           />
         <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectArt} //
            setRef={selectArtRef} //
            keyName={"okArt"} // 
            arrayData={Object.values(artderorganisationBP)} // 
            titleName={panelTexts.fartderorganisation} // 
            turnOnMap={turnOnMap}
            locationBox={false} // 
            categoryName={"art"} // 
            onClickFilterItem={onClickFilterItem}
            selectList={selectArt} //
            top={false}
           />
         <FilterItemBox
            activeFilter={activeFilter}
            onActiveFilter={onActiveFilter}
            onResetSection={onResetSection}
            setSection={setSelectZeige} //
            setRef={selectZeigeRef} //
            keyName={"okZeige"} // 
            arrayData={["archiv", "aktive"]} // 
            titleName={panelTexts.fzeige} // 
            turnOnMap={turnOnMap}
            locationBox={false} // 
            categoryName={"zeige"} // 
            onClickFilterItem={onClickFilterItem}
            selectList={selectZeige} //
            top={false}
           />
          
          
          <div className="sticky bottom-0 flex items-center border-b last:border-b-0 border-black z-[2000]">
            <div onClick={onSearch} className="cursor-pointer hover:bg-black bg-white py-2 hover:text-white transition-all flex-1 flex items-center justify-center border-t border-black">
            {panelTexts.fsearch}
            </div>
            {/* <div onClick={onResetAll} className="cursor-pointer border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all">
              Clear All
            </div> */}
            {/* <div onClick={onSelectAll} className="cursor-pointer border-2 border-black px-2 py-1 hover:bg-black hover:text-white transition-all">
              Select All
            </div> */}
            <div onClick={resetFilter} className="lg:hidden cursor-pointer border-t border-l border-black py-2 hover:bg-black hover:text-white transition-all flex-1 flex justify-center items-center bg-white">
            {panelTexts.freset}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtern;
