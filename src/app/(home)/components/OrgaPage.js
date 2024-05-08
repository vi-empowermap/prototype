import { clikedGoogleAtom, setViewAtom } from "@/app/utils/state";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ListBoxIcon from "./ListBoxIcon";
import { angeboteBP, socialMediaBP, sprachunterstutzungBP, themenschwerpunktBP } from "../constant/blueprintOptionData";

const OrgaPage = ({ getData, turnOnMap }) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("organisation");
  const router = useRouter();
  const [orgaInfo, setOrgaInfo] = useState({});
  const setOrgaLocation = useSetRecoilState(clikedGoogleAtom);
  const setSetViewAtom = useSetRecoilState(setViewAtom);

  useEffect(() => {
    if (Boolean(search)) {
      setOpen(true);
      const idx = getData.findIndex((value) => String(value.id) === search);
      console.log(getData[idx]);
      setOrgaInfo(getData[idx]);
      if (turnOnMap) {
        setOrgaLocation([getData[idx].location.lat, getData[idx].location.lon]);
        setSetViewAtom({
          id: getData[idx].id,
          pos: [getData[idx].location.lat, getData[idx].location.lon],
          name: getData[idx].name,
          type: "list",
        });
      }
    } else {
      setOpen(false);
    }
  }, [search]);

  const onClose = () => {
    router.push("/");
  };

  const onCopyText = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    alert("Copied the Url: " + `${window.location.href}`);
  };
  return (
    <div className={`fixed top-0 right-0 bg-white w-full lg:w-2/3 h-screen z-[1400] px-6 pt-6 border-l-2 border-black ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="w-full h-full border-x-2 border-t-2 border-black rounded-tl-3xl rounded-tr-3xl">
        <nav className="flex gap-4 justify-end p-4 mb-4">
          <div onClick={onCopyText} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>
          </div>
          <div onClick={onClose} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </nav>
        <div className="px-6 flex h-full flex-col">
          <h1 style={{ color: `${orgaInfo.bgColor}` }} className={`text-4xl font-bold mb-8`}>
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
          <div className="flex-grow flex justify-between border-r">
            <div style={{ borderColor: `${orgaInfo.bgColor}` }} className="flex-1 flex flex-col border-r-2 pr-4">
              <div className="text-base font-base">{orgaInfo.aboutorga}</div>
              <div className="mt-4">
                <div className="orga_sub_title">Sprachunterstützung:</div>
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
                <div className="orga_sub_title">Angebote:</div>
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
                <div className="orga_sub_title">Tags:</div>
                <div className="flex flex-wrap">{orgaInfo.categories && <div>{orgaInfo.categories.join(", ")}</div>}</div>
              </div>
            </div>
            <div className="flex-1 pl-4">
              <div>
                <div className="orga_sub_title">Location</div>
                <div>
                  Bundesland: {String(orgaInfo.bundesland).slice(0, 1).toUpperCase()}
                  {String(orgaInfo.bundesland).slice(1)}
                </div>
                <div>
                  Stadt: {String(orgaInfo.city).slice(0, 1).toUpperCase()}
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
              <div className="mt-4">
                <div className="orga_sub_title">Kontakt</div>
                <div>{String(orgaInfo.email)}</div>
                <div>{String(orgaInfo.contactnummber)}</div>
                <div className="mt-4">{String(orgaInfo.website)}</div>
              </div>
              <div className="mt-4">
                <div className="orga_sub_title">Social Media</div>
                <div>
                  {orgaInfo.social &&
                    orgaInfo.social.map((value, idx) => {
                      return (
                        <div key={idx}>
                          <a target="_blank" href={value.mediasocial}>
                            {value.notfound === "false" ? socialMediaBP[`${value.medianame}`] : value.medianamecustom}
                          </a>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-48 justify-between flex bg-blue-200 mt-8">
            <div className="flex-1">ds</div>
            <div className="flex-1">as</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgaPage;
