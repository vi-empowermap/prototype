"use client"
import Lottie from "lottie-react";
import Link from "next/link";
import compassAni from "/public/assets/lotti/Animation - 1716970279471.json"

const NotFoundWrapper = ({panelData: {
  result: { content: panelDatas },
},}) => {
    return (
        <div className="w-screen h-screen overflow-hidden bg-white flex justify-center items-center font-jetBrainsMono px-4 py-4">
      <div className="w-full h-full border border-black flex justify-center items-center px-4 py-2 rounded-xl">
        <div className="flex flex-col justify-center items-center">
            <div className="w-44 aspect-square">
                <Lottie animationData={compassAni} />
            </div>
          <div className="font-bespokeStencil text-8xl mb-10">{panelDatas.etitle}</div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-jetBrainsMonoExtraBold text-xl">{panelDatas.esubtitle}</div>
            <div>{panelDatas.etext}</div>
          </div>
          <Link href={"/"} className="mt-8 border border-black px-4 py-2 text-2xl hover:bg-black hover:text-white transition-all cursor-pointer">{panelDatas.ebutton}</Link>
        </div>
      </div>
    </div>
    )
}

export default NotFoundWrapper;