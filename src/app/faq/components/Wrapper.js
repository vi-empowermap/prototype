"use client";
import MenuNav from "@/app/components/MenuNav";
import { useEffect, useState } from "react";
import OpenIcon from "/public/assets/icons/open.svg"
const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData,
}) => {
  const [openedQuestionIdx, setOpenedQuestionIdx] = useState(-1);
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="w-screen min-h-[100svh] lg:min-h-screen h-full bg-white relative pt-[44px] lg:pt-[86px] font-jetBrainsMonoLight">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="flex justify-center max-w-screen-2xl m-auto">
        <div className="w-full h-fit px-4 lg:px-6 py-10 flex flex-col gap-10 lg:gap-20">
          <div className="w-full h-fit">
            <div className="text-2xl font-medium mb-4">{data.faq_title}</div>
            <div className="flex flex-col gap-2">
              {data["faq_list"].map((v, idx) => {
                return <FaqQuestionWrapper key={idx} title={v.faq_title} answer={v.faq_answer} setOpenedQuestionIdx={setOpenedQuestionIdx} openedQuestionIdx={openedQuestionIdx} idx={idx} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqQuestionWrapper = ({ title, answer, setOpenedQuestionIdx, idx, openedQuestionIdx }) => {
  const openQuestion = () => {
    if (openedQuestionIdx === idx) {
      setOpenedQuestionIdx(-1);
    } else {
      setOpenedQuestionIdx(idx);
    }
  };
  return (
    <div className="w-full h-fit border border-black rounded-xl overflow-hidden">
      <div onClick={openQuestion} className="cursor-pointer text-xl lg:text-2xl p-4 flex justify-between">
        <div>{title}</div>
        <div className={`${idx === openedQuestionIdx ? "rotate-0" : "rotate-180"}`}><OpenIcon style={{ strokeWidth: "30px", stroke: "#000", width: "px", height: "32px" }}  /></div>
      </div>
      {idx === openedQuestionIdx && <div className="pt-4 lg:columns-2 gap-10 bg-neutral-100 p-4 ">{answer}</div>}
    </div>
  );
};

export default Wrapper;
