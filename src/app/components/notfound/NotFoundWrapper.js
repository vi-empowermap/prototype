"use client"
import Link from "next/link";

const NotFoundWrapper = ({getErrerMessage}) => {
    return (
        <div className="w-screen h-screen overflow-hidden bg-white flex justify-center items-center font-jetBrainsMono px-4 py-4">
      <div className="w-full h-full border border-black flex justify-center items-center px-4 py-2 rounded-xl">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bespokeStencil text-8xl mb-10">404</div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-jetBrainsMonoExtraBold text-xl">{getErrerMessage["notfound_errormessage_title"]}</div>
            <div>{getErrerMessage["notfound_errormessage"]}</div>
          </div>
          <Link href={"/"} className="mt-8 border border-black px-4 py-2 text-2xl hover:bg-black hover:text-white transition-all cursor-pointer uppercase">{getErrerMessage["notfound_button"]}</Link>
        </div>
      </div>
    </div>
    )
}

export default NotFoundWrapper;