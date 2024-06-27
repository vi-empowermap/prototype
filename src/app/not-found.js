import NotFoundWrapper from "./components/notfound/NotFoundWrapper";
import { fetchDataOriginAPI } from "./utils/hooks/useFetchData";
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;
const getKirbyPanelDataError = async () => {
  /* KQL Selection BODY */
  const bodyData = {
    query: "page('error')",
    select: {
      content:{
        select: {
          // notfound & loading page text
          etitle: true,
          esubtitle: true,
          etext: true,
          ebutton: true,
          loadingtext: true,

        }
      }
    },
  };


  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });

  return data;
};
const NotFoundPage = async () => {
  const panelData = await getKirbyPanelDataError()
 
  return (
    <NotFoundWrapper panelData={panelData} />
  );
};

export default NotFoundPage;
