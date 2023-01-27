import useSWR from "swr";
import axios from "axios";
import {BASE_URL} from "../API";

const useCheckCPF = (user_uuid: string) => {
  const fetcherGET =  (url: string) => (axios.get(BASE_URL + url).then((res:any) => res.data));
  
  return useSWR(`escola/checkcpf/${user_uuid}`, fetcherGET, {refreshInterval: 5000});
}

export default useCheckCPF;