import { clickedItemsListAtom, onOrgaFilterAtom, onSearchFilterAtom } from "@/app/utils/state";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { angeboteBP, artderorganisationBP, sprachunterstutzungBP, themenschwerpunktBP, zielgruppeBP } from "../constant/blueprintOptionData";

const Filtern = ({ turnOnMap, getData, setData, categories, placeholdertext }) => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm();
  const [openFilter, setOpenFilter] = useState(false);
  const filterContainer = useRef(null);
  const [fHeight, setFHeight] = useState(0);
  const [getOrgaFilter, setOrgaFilter] = useRecoilState(onOrgaFilterAtom);
  const [getOnSearchFilter, setOnSearchFilter] = useRecoilState(onSearchFilterAtom);

  /* Filter */
  const [selectThemen, setSelectThmen] = useState([]);
  const [selectTags, setSelectTags] = useState([]);
  const [selectZielGroup, setSelectZielGroup] = useState([]);
  const [selectAngebote, setSelectAngebote] = useState([]);
  const [selectSprache, setSelectSprache] = useState([]);
  const [selectArt, setSelectArt] = useState([]);
  const [selectZeige, setSelectZeige] = useState([]);

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
      if (filterContainer.current) {
        setFHeight(filterContainer.current.clientHeight * 2);
      }
    } else {
      setOpenFilter(false);
    }
  };
  const resetFilter = () => {
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
  }
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
    setOrgaFilter(true);
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
        if (data[i].zielgruppe === v) {
          return true;
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

      if (okThemen && okTags && okZiel && okAngebote && okSprache && okArt && okZeige) {
        data[i].filterVisible = true;
      } else {
        data[i].filterVisible = false;
      }
    }
    setData(data);
  };
  /* Reset */
  useEffect(() => {
    //reset
    resetFilter();
  }, [turnOnMap]);

  useEffect(() => {
    if (getOnSearchFilter) {
      //reset
    }
  }, [getOnSearchFilter]);
  return (
    <div ref={filterContainer} className="lg:flex-1 aspect-square lg:aspect-auto h-full w-full flex items-center lg:px-4 border-l-2 border-black lg:border-l-0 relative hover:bg-black hover:text-white transition-all z-[1300]">
      {
        <div onClick={onClick} className="hidden lg:flex gap-2 cursor-pointer w-full h-full items-center">
          <span>{placeholdertext}</span>
          <span className={`${!getOrgaFilter ? "rotate-0" : "rotate-180"} transition-transform duration-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
      }
      {openFilter && (
        <div
          style={{ maxHeight: `calc(100vh - ${fHeight}px)` }}
          className="absolute top-full left-full -translate-x-full lg:translate-x-0 lg:left-[-2px] text-black w-screen lg:w-[calc(100%+2px)] bg-white h-fit overflow-y-scroll border-b-2 border-l-0 lg:border-l-2 border-black border-t-2 border-r-0 no-scrollbar"
        >
          <div className="sticky flex items-center gap-4 top-0 left-0 border-b-2 last:border-b-0 border-black py-2 mb-2 pr-8 bg-white px-2">
            <div onClick={onSearch} className="cursor-pointer border-2 border-black px-2 py-1">
              Search
            </div>
            <div onClick={onResetAll} className="cursor-pointer border-2 border-black px-2 py-1">
              Clear All
            </div>
            <div onClick={onSelectAll} className="cursor-pointer border-2 border-black px-2 py-1">
              Select All
            </div>
          </div>
          <div className="border-b last:border-b-0 border-neutral-400 py-2 mb-2 pr-8 px-2">
            <div className="mb-4">
              <div>Nach Themenschwerpunkt</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {[...Object.values(themenschwerpunktBP).sort()].map((value, idx) => {
                  const ok = selectThemen.some((v) => v === value);
                  return (
                    <div key={idx} onClick={() => onClickFilterItem({ category: "themen", value: value })} className={`border-2 border-black px-2 py-1 transition-all cursor-pointer ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <div>Nach Tags</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {[...categories.sort()].map((value, idx) => {
                  const ok = selectTags.some((v) => v === value);
                  return (
                    <div key={idx} onClick={() => onClickFilterItem({ category: "tags", value: value })} className={`border-2 border-black px-2 py-1 transition-all cursor-pointer ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-b last:border-b-0 border-neutral-400 py-2 mb-2 pr-8 px-2">
            <div className="mb-4">
              <div>Zielgruppe</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {[...Object.values(zielgruppeBP).sort()].map((value, idx) => {
                  const ok = selectZielGroup.some((v) => v === value);
                  return (
                    <div key={idx} onClick={() => onClickFilterItem({ category: "ziel", value: value })} className={`border-2 border-black px-2 py-1 transition-all cursor-pointer ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <div>Angebote</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {[...Object.values(angeboteBP).sort()].map((value, idx) => {
                  const ok = selectAngebote.some((v) => v === value);
                  return (
                    <div key={idx} onClick={() => onClickFilterItem({ category: "angebote", value: value })} className={`border-2 border-black px-2 py-1 transition-all cursor-pointer ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-b last:border-b-0 border-neutral-400 py-2 mb-2 pr-8 px-2">
            <div className="mb-4">
              <div>Sprache</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {[...Object.values(sprachunterstutzungBP).sort()].map((value, idx) => {
                  const ok = selectSprache.some((v) => v === value);
                  return (
                    <div key={idx} onClick={() => onClickFilterItem({ category: "sprache", value: value })} className={`border-2 border-black px-2 py-1 transition-all cursor-pointer ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <div>Art der Organisation</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {[...Object.values(artderorganisationBP).sort()].map((value, idx) => {
                  const ok = selectArt.some((v) => v === value);
                  return (
                    <div key={idx} onClick={() => onClickFilterItem({ category: "art", value: value })} className={`border-2 border-black px-2 py-1 transition-all cursor-pointer ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-b last:border-b-0 border-neutral-400 py-2 mb-2 pr-8 px-2">
            <div className="mb-4">
              <div>Zeige</div>
              <div className="text-sm flex gap-4 flex-wrap mt-4">
                {[...["archiv", "aktive"]].map((value, idx) => {
                  const ok = selectZeige.some((v) => v === value);
                  return (
                    <div key={idx} onClick={() => onClickFilterItem({ category: "zeige", value: value })} className={`border-2 border-black px-2 py-1 transition-all cursor-pointer ${ok ? "bg-black text-white" : "bg-white text-black"}`}>
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtern;
