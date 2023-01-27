import {useNavigate} from "react-router";
import {FaChevronCircleLeft} from "react-icons/fa";
import {API} from "../../API";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {useEffectOnce} from "usehooks-ts";
import parse from "html-react-parser";

type TextoType = {
  titulo: string,
  texto: string
}

export const Sobre = () => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [sobre, setSobre] = useState<TextoType>({titulo:'',texto:''});
  
  const getSobre = async () => {
    try {
      let resposta = await API.getSobre();
      if (!resposta.error) {
        setSobre(resposta.data);
      } else {
        enqueueSnackbar(resposta.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
  
  useEffectOnce(() => {
    getSobre();
  });
  
  return (
    <div className={"app-curso-detalhes"}>
      <div className={"link"} onClick={() => {navigate("/")}}>
        <FaChevronCircleLeft/>
        <span>Voltar</span>
      </div>
      <div style={{display:"flex",flexDirection:"column"}}>
        <h4>{sobre.titulo}</h4>
        {parse(sobre.texto)}
      </div>
    </div>
  );
}