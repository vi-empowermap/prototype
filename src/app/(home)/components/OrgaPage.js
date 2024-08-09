import { clikedGoogleAtom, clikedMarkerAtom, closeOrgaAtom, onOrgaFilterActivateAtom, readyAniAtom, setViewAtom } from "@/app/utils/state";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { angeboteBP, artderorganisationBP, bundeslandBP, socialMediaBP, sprachunterstutzungBP, themenschwerpunktBP, zielgruppeBP } from "../constant/blueprintOptionData";
import useKirbyText from "@/app/utils/hooks/useKirbyText";
import OrgaNav from "./openpage/OrgaNav";
import OrgaHeader from "./openpage/OrgaHeader";
import OrgaIconWrapper from "./openpage/OrgaIconWrapper";

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
  const emailRef = useRef(null);
  const leftContainer = useRef(null);
  useEffect(() => {
    if (Boolean(search)) {
      setOrgaFilterActivateAtom({
        ready: false,
        all: false,
        location: false,
        bundes: "",
      });
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

  const onFilterBundesLand = () => {
    setOrgaFilterActivateAtom({
      ready: true,
      all: false,
      location: turnOnMap,
      bundes: bundeslandBP[orgaInfo.bundesland],
    });
    onClose();
  };
  const onFilterAll = () => {
    setOrgaFilterActivateAtom({
      ready: true,
      all: true,
      location: turnOnMap,
      bundes: bundeslandBP[orgaInfo.bundesland],
      themen: orgaInfo.themenschwerpunkt.map((v) => {
        return themenschwerpunktBP[v];
      }),
      tags: [...orgaInfo.categories],
      ziel: orgaInfo.zielgruppe.map((v) => {
        return zielgruppeBP[v];
      }),
      angebote: orgaInfo.angebote.map((v) => {
        return angeboteBP[v];
      }),
      sprache: orgaInfo.sprachunterstutzung.map((v) => {
        return sprachunterstutzungBP[v];
      }),
      art: [artderorganisationBP[orgaInfo.artderorganisation]],
      zeige: orgaInfo.archivoraktiv,
    });
    onClose();
  };

  useEffect(() => {
    if (leftContainer.current && orgaInfo) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${leftContainer.current.clientWidth}" height="25">
       <text x="0" y="18" fill="${orgaInfo.bgColor}" font-family="JetBrainsMono">${String(orgaInfo.email)}</text>
      </svg>`;
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      if (emailRef.current) {
        emailRef.current.src = url;
      }
    }
  }, [orgaInfo]);

  const clickEmail = () => {
    if (orgaInfo) {
      router.push(`mailto:${String(orgaInfo.email)}`);
    }
  };
  return (
    <div className={`fixed top-0 right-0 bg-white w-full lg:w-2/3 h-screen z-[2400] lg:px-6 lg:pt-6 border-l border-black ${open ? "translate-x-0" : "translate-x-full"} transition-all duration-500 font-jetBrainsMono font-medium`}>
      <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="w-full h-screen lg:h-full lg:border-x lg:border-t border-black lg:rounded-tl-3xl lg:rounded-tr-3xl flex flex-col">
        <OrgaNav onClose={onClose} />

        <div className="px-4 flex flex-grow flex-col overflow-y-auto">
          <OrgaHeader bgColor={orgaInfo.bgColor} font={orgaInfo.font} organame={orgaInfo.organame} imgUrl={orgaInfo.orgaimage} />
          <OrgaIconWrapper themenschwerpunkt={orgaInfo.themenschwerpunkt} />

          <div className="flex-grow flex flex-col lg:flex-row justify-start lg:justify-between">
            <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="lg:flex-1 flex flex-col border-b lg:border-b-0 lg:border-r lg:pr-4 lg:pb-0 pb-4">
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
            <div ref={leftContainer} className="lg:flex-1 lg:pt-0 lg:pl-4 pt-4 ">
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
                {/* <a >{String(orgaInfo.email)}</a> */}
                <img style={{ width: "100%", height: "100%" }} alt="email" className="cursor-pointer" onClick={clickEmail} ref={emailRef} />
                <div>{String(orgaInfo.contactnummber)}</div>
                <a target="_blank" href={String(orgaInfo.website)} style={{ color: `${orgaInfo.bgColor}` }} className="mt-4">
                  website
                </a>
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
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-10 group-hover:-left-6 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-4 group-hover:-left-3 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl rounded-b-2xl lg:rounded-b-none border lg:border-b-0 p-6 text-xl cursor-pointer select-none">
                  Zeige alle Initiativen <span className="font-semibold">in dem selben Bundesland</span>
                </div>
              </div>
            </div>
            <div className={`w-full h-fit flex justify-center lg:px-8 overflow-hidden`}>
              <div onClick={() => onFilterAll()} className="flex w-full relative group h-28">
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-10 group-hover:-left-6 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute hidden lg:block group-hover:top-4 group-hover:-left-3 top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl border border-b-0 transition-all duration-500"></div>
                <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="absolute top-0 left-0 w-full h-full bg-white rounded-tl-2xl rounded-tr-2xl rounded-b-2xl lg:rounded-b-none border lg:border-b-0 p-6 text-xl cursor-pointer select-none">
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
