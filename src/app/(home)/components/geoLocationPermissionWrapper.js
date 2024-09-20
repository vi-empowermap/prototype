import { geoLocationPermissionAsked, geoLocationPermissionError, setViewAtom } from "@/app/utils/state";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const GeolocationAlert = ({ ready, text, errorMessage }) => {
    const { register, setValue, getValues } = useForm();
    const setSetViewAtom = useSetRecoilState(setViewAtom);
    const [getGeoLocationPermissionAsked, setGeoLocationPermissionAsked] = useRecoilState(geoLocationPermissionAsked)
    const getGeoLocationPermissionError = useRecoilValue(geoLocationPermissionError);
    useEffect(() => {
      // init geo
        setValue("standortbestimmung", getGeoLocationPermissionAsked);
      
    //   const geoPermission = localStorage.getItem("padlas_standortbestimmung");
    //   if (!geoPermission) {
    //     localStorage.setItem("padlas_standortbestimmung", JSON.stringify({ answer: false }));
    //   } else {
    //     const getPermisson = JSON.parse(geoPermission);
    //     setValue("standortbestimmung", getPermisson.answer);
    //   }
    }, [ready]);
  
    const onClickPermission = () => {
      const checked = getValues("standortbestimmung");
      setValue("standortbestimmung", !checked);
      setGeoLocationPermissionAsked(!getGeoLocationPermissionAsked)
    //   localStorage.setItem("padlas_standortbestimmung", JSON.stringify({ answer: !checked }));
      setSetViewAtom({ pos: [51.1657, 10.4515], name: "start" });
    };
  
    return (
      <>
        <div className="flex flex-col gap-1 absolute bottom-12 left-4 text-sm">
          <div onClick={onClickPermission} className="w-fit flex gap-2 cursor-pointer items-center">
            <input onChange={onClickPermission} {...register("standortbestimmung")} defaultChecked={false} type="checkbox" />
            <div>{text}</div>
          </div>
          {getGeoLocationPermissionError && <div className="text-orange-400">{errorMessage}</div>}
        </div>
  
      </>
    );
  };

  export default GeolocationAlert