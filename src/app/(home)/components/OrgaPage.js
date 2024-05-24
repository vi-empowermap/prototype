import { clikedGoogleAtom, clikedMarkerAtom, closeOrgaAtom, onOrgaFilterActivateAtom, readyAniAtom, setViewAtom } from "@/app/utils/state";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ListBoxIcon from "./ListBoxIcon";
import { angeboteBP, artderorganisationBP, bundeslandBP, socialMediaBP, sprachunterstutzungBP, themenschwerpunktBP, zielgruppeBP } from "../constant/blueprintOptionData";
import useKirbyText from "@/app/utils/hooks/useKirbyText";

const OrgaPage = ({ getData, noLGetData, setTurnOnMap, turnOnMap, panelDatas }) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("organisation");
  const router = useRouter();
  const [orgaInfo, setOrgaInfo] = useState({});
  const setOrgaLocation = useSetRecoilState(clikedGoogleAtom);
  const setSetViewAtom = useSetRecoilState(setViewAtom);
  const setCloseOrgaAtom = useSetRecoilState(closeOrgaAtom);
  const setReady = useSetRecoilState(readyAniAtom);
  const [getClickedMarkerAtom, setClickedMarkerAtom] = useRecoilState(clikedMarkerAtom);
  const [getOrgaFilterActivateAtom, setOrgaFilterActivateAtom] = useRecoilState(onOrgaFilterActivateAtom);
  useEffect(() => {
    if (Boolean(search)) {
      setOrgaFilterActivateAtom({
        ready: false,
        all: false,
        location: false,
        bundes: ""
      })
      setReady(true);
      setTimeout(() => {
        setCloseOrgaAtom(false);
      }, 400);
      setOpen(true);
      // TODO
      const idx = getData.findIndex((value) => String(value.id) === search);
      
      if (idx < 0) {
        const nidx = noLGetData.findIndex((value) => String(value.id) === search);
        if (nidx > -1) {
          setTurnOnMap(false);
          setOrgaInfo(noLGetData[nidx]);
        } else {
          setOpen(false);
          router.push("/");
          setCloseOrgaAtom(true);
        }
      } else {
        
        setOrgaInfo(getData[idx]);
        if ([getData[idx]][0].lokalorga === "true") {
          setTurnOnMap(false);
        } else {
          if (turnOnMap) {
            setClickedMarkerAtom(getData[idx].id);
            setOrgaLocation([getData[idx].location.lat, getData[idx].location.lon]);
            setSetViewAtom({
              id: getData[idx].id,
              pos: [getData[idx].location.lat, getData[idx].location.lon],
              name: getData[idx].name,
              type: "list",
            });
          }
        }
      }
      
    } else {
      setOpen(false);
    }
  }, [search]);

  const onClose = () => {
    setCloseOrgaAtom(true);
    setClickedMarkerAtom(-1);
    router.push("/");
  };

  const onCopyText = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    alert("Copied the Url: " + `${window.location.href}`);
  };
  const onFilterBundesLand = () => {
    setOrgaFilterActivateAtom({
      ready: true,
      all: false,
      location: turnOnMap,
      bundes: bundeslandBP[orgaInfo.bundesland]
    })
    onClose()
  }
  const onFilterAll = () => {
    setOrgaFilterActivateAtom({
      ready: true,
      all: true,
      location: turnOnMap,
      bundes: bundeslandBP[orgaInfo.bundesland],
      themen: orgaInfo.themenschwerpunkt.map((v) => {
        return themenschwerpunktBP[v]
      }),
      tags: [...orgaInfo.categories],
      ziel: orgaInfo.zielgruppe.map((v) => {
        return zielgruppeBP[v]
      }),
      angebote: orgaInfo.angebote.map((v) => {
        return angeboteBP[v]
      }),
      sprache: orgaInfo.sprachunterstutzung.map((v) => {
        return sprachunterstutzungBP[v]
      }),
      art: [artderorganisationBP[orgaInfo.artderorganisation]],
      zeige: orgaInfo.archivoraktiv
    })
    onClose()
  }
  return (
    <div className={`fixed top-0 right-0 bg-white w-full lg:w-2/3 h-screen z-[2400] lg:px-6 lg:pt-6 border-l-2 border-black ${open ? "translate-x-0" : "translate-x-full"} transition-all duration-500 font-jetBrainsMono font-medium`}>
      <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="w-full h-screen lg:h-full lg:border-x-2 lg:border-t-2 border-black lg:rounded-tl-3xl lg:rounded-tr-3xl flex flex-col">
        <nav className="flex gap-4 justify-end p-4 lg:mb-2">
          <div onClick={onCopyText} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>
          </div>
          <div onClick={onClose} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </nav>

        <div className="px-4 flex flex-grow flex-col overflow-y-auto">
          <h1 style={{ color: `${orgaInfo.bgColor}` }} className={`text-4xl lg:text-8xl font-bold mb-8 ${orgaInfo.font}`}>
            {orgaInfo.organame}
          </h1>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-8">
            {orgaInfo.themenschwerpunkt &&
              orgaInfo.themenschwerpunkt.map((val, idx) => {
                return (
                  <div key={idx} className="flex gap-2 items-center">
                    <ListBoxIcon thema={val} />
                    <div className="orga_icon_text">{themenschwerpunktBP[`${val}`]}</div>
                  </div>
                );
              })}
          </div>
          <div className="flex-grow flex flex-col lg:flex-row justify-start lg:justify-between">
            <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="lg:flex-1 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 lg:pr-4 lg:pb-0 pb-4">
              <div className="text-base font-base">{orgaInfo.aboutorga}</div>
              <div className="mt-4">
                <div className="orga_sub_title">{useKirbyText({ text: panelDatas.languagesupporttext })}</div>
                <div className="flex flex-wrap">
                  {orgaInfo.sprachunterstutzung && (
                    <div>
                      {orgaInfo.sprachunterstutzung
                        .map((value, idx) => {
                          return sprachunterstutzungBP[`${value}`];
                        })
                        .join("/")}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="orga_sub_title">{useKirbyText({ text: panelDatas.angebotetext })}</div>
                <div className="flex flex-wrap">
                  {orgaInfo.angebote && (
                    <div>
                      {orgaInfo.angebote
                        .map((value, idx) => {
                          return angeboteBP[`${value}`];
                        })
                        .join(" und ")}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="orga_sub_title">{useKirbyText({ text: panelDatas.tagstext })}</div>
                <div className="flex flex-wrap">{orgaInfo.categories && <div>{orgaInfo.categories.join(", ")}</div>}</div>
              </div>
            </div>
            <div className="lg:flex-1 lg:pt-0 lg:pl-4 pt-4 ">
              <div className={`${turnOnMap ? "block" : "hidden"} mb-4`}>
                <div className="orga_sub_title">{useKirbyText({ text: panelDatas.locationtext })}</div>
                <div>
                  {useKirbyText({ text: panelDatas.bundeslabeltext })}: {String(bundeslandBP[orgaInfo.bundesland]).slice(0, 1).toUpperCase()}
                  {String(bundeslandBP[orgaInfo.bundesland]).slice(1)}
                </div>
                <div>
                  {useKirbyText({ text: panelDatas.stadtlabeltext })}: {String(orgaInfo.city).slice(0, 1).toUpperCase()}
                  {String(orgaInfo.city).slice(1).toLocaleLowerCase()}
                </div>
                <div className="flex flex-wrap mt-4">
                  <div>
                    {String(orgaInfo.street).slice(0, 1).toUpperCase()}
                    {String(orgaInfo.street).trim().slice(1).toLocaleLowerCase()},
                  </div>
                  <div className="ml-1">{String(orgaInfo.zip)}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="orga_sub_title">{useKirbyText({ text: panelDatas.kontakttext })}</div>
                <div>{String(orgaInfo.email)}</div>
                <div>{String(orgaInfo.contactnummber)}</div>
                <a target="_blank" href={String(orgaInfo.website)} style={{ color: `${orgaInfo.bgColor}` }} className="mt-4">website</a>
              </div>
              <div className="mb-4">
                <div className="orga_sub_title">{useKirbyText({ text: panelDatas.socialmediatext })}</div>
                <div>
                  {orgaInfo.social &&
                    orgaInfo.social.map((value, idx) => {
                      return (
                        <div key={idx}>
                          <a target="_blank" href={value.mediasocial} style={{ color: `${orgaInfo.bgColor}` }}>
                            {value.notfound === "false" ? socialMediaBP[`${value.medianame}`] : value.medianamecustom}
                          </a>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:h-28 justify-between flex flex-col lg:flex-row mt-8 gap-4 mb-4 lg:gap-0 lg:mb-0">
            <div className={`${turnOnMap ? "block" : "hidden"} w-full h-fit flex justify-center lg:px-8 overflow-hidden`}>
              <div onClick={() => onFilterBundesLand()} className="flex w-full relative group h-28 ">
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-10 group-hover:-left-6 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border-2 border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-4 group-hover:-left-3 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border-2 border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl rounded-b-2xl lg:rounded-b-none border-2 lg:border-b-0 p-6 text-xl cursor-pointer select-none">
                  Zeige alle Initiativen <span className="font-semibold">in dem selben Bundesland</span>
                </div>
              </div>
            </div>
            <div className={`w-full h-fit flex justify-center lg:px-8 overflow-hidden`}>
              <div onClick={() => onFilterAll()} className="flex w-full relative group h-28">
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-10 group-hover:-left-6 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border-2 border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-4 group-hover:-left-3 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border-2 border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl rounded-b-2xl lg:rounded-b-none border-2 lg:border-b-0 p-6 text-xl cursor-pointer select-none">
                  Zeige alle Initiativen <span className="font-semibold">mit den gleichen Kategorien</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgaPage;
