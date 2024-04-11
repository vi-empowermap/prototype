import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const OrgaPage = ({getData}) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("organisation");
  const router = useRouter();
  const [orgaInfo, setOrgaInfo] = useState({})

  useEffect(() => {

    if (Boolean(search)) {
      setOpen(true);
      const idx = getData.findIndex((value) => String(value.id) === search)
      setOrgaInfo(getData[idx])
    //   console.log(f)
    }else {
      setOpen(false)
    }
  }, [search]);

  const onClose = () => {
    router.push("/")
  }

  const onCopyText = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    alert("Copied the Url: " + `${window.location.href}`);
  }
  return (
    <div className={`fixed top-0 right-0 bg-white w-2/3 h-screen z-[1200] p-6 border-l-2 border-black ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="w-full h-full border-2 border-black rounded-3xl">
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
        <div className="px-6">
            <h1 className="text-4xl font-bold">{orgaInfo.organame}</h1>
        </div>
      </div>
    </div>
  );
};

export default OrgaPage;
