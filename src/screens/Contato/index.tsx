import {useNavigate} from "react-router";
import {FaChevronCircleLeft} from "react-icons/fa";
import {Button, Grid, TextField} from "@mui/material";
import {createRef, useState} from "react";
import {API} from "../../API";
import {useEffectOnce} from "usehooks-ts";
import {useSnackbar} from "notistack";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";

type TextoType = {
  titulo: string,
  texto: string
}

const recaptchaRef = createRef<any>();

export const Contato = () => {
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [contato, setContato] = useState<TextoType>({titulo:'',texto:''});
  
  const getContato = async () => {
    try {
      let resposta = await API.getContato();
      if (!resposta.error) {
        setContato(resposta.data);
      } else {
        enqueueSnackbar(resposta.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
  
  useEffectOnce(() => {
    getContato();
  });
  
  const send = async () => {
    try {
      let response = await API.sendContato(nome, email, assunto, mensagem);
      if (!response.error) {
        enqueueSnackbar('Enviado!', {variant: "success"});
      } else {
        enqueueSnackbar(response.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
  
  return (
    <div className={"app-curso-detalhes"}>
      <div className={"link"} onClick={() => {navigate("/")}}>
        <FaChevronCircleLeft/>
        <span>Voltar</span>
      </div>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} lg={8}>
          <div style={{display:"flex",flexDirection:"column"}}>
            <h4>{contato.titulo}</h4>
            {parse(contato.texto)}
          </div>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <TextField
            label={"Nome"}
            variant={"outlined"}
            fullWidth
            value={nome}
            onChange={(t) => {
              setNome(t.target.value);
            }}
            margin={"normal"}
          />
          
          <TextField
            label={"E-mail"}
            variant={"outlined"}
            fullWidth
            value={email}
            onChange={(t) => {
              setEmail(t.target.value);
            }}
            margin={"normal"}
          />
          
          <TextField
            label={"Assunto"}
            variant={"outlined"}
            fullWidth
            value={assunto}
            onChange={(t) => {
              setAssunto(t.target.value);
            }}
            margin={"normal"}
          />
          
          <TextField
            label={"Mensagem"}
            variant={"outlined"}
            fullWidth
            value={mensagem}
            onChange={(t) => {
              setMensagem(t.target.value);
            }}
            margin={"normal"}
          />
          
          <Button
            variant={"outlined"}
            sx={{borderRadius:0,marginTop:"15px"}}
            onClick={()=>{recaptchaRef.current.execute()}}
            fullWidth
          >
            Enviar
          </Button>
          <ReCAPTCHA
            sitekey="6LeUveAUAAAAAOKCkEgsmaTnHvMZqce_t3N7g7od"
            ref={recaptchaRef}
            size={"invisible"}
            onChange={send}
          />
        </Grid>
      </Grid>
    </div>
  );
}