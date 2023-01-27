import useSWR from "swr";
import axios from "axios";
import {BASE_URL} from "../../../API";

const useCarregarCertificados = (user_uuid: string) => {
  const fetcherGET =  (url: string) => (axios.get(BASE_URL + url).then((res:any) => res.data));
  
  return useSWR(`escola/certificado/${user_uuid}`, fetcherGET);
}

export default useCarregarCertificados;