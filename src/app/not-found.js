import NotFoundWrapper from "./components/notfound/NotFoundWrapper";
import { fetchDataOriginAPI } from "./utils/hooks/useFetchData";
const authEmail = process.env.KB_USER;
const authPassword = process.env.KB_PASS;
const kirbyOriginAPI = process.env.KB_API_ORIGIN;

const getKirbyErrorMessage = async () => {
  const bodyData = {
    query: "page('home')",
    select: {
      id: true,
      notfound_errormessage_title: true,
      notfound_errormessage: true,
      notfound_button: true
    },
  };

  /* KQL Fetch and get Data */
  const kirbyApiDraft = `${kirbyOriginAPI}`;
  const data = await fetchDataOriginAPI({ url: kirbyApiDraft, userInfo: { authEmail, authPassword }, method: "POST", bodyData });
  
 

  return data

}
const NotFoundPage = async () => {
  const getErrerMessage = await getKirbyErrorMessage()

  return (
    <NotFoundWrapper getErrerMessage={getErrerMessage.result} />
  );
};

export default NotFoundPage;
