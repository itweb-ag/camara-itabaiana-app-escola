import {useNavigate, useParams} from "react-router";
import {API} from "../../API";
import {useContext, useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {FaChevronCircleLeft} from "react-icons/fa";
import {Button, Grid, Typography} from "@mui/material";
import parse from 'html-react-parser';
import {Faixa} from "../../components";
import {UserContext} from "../../contexts/UserContext";
import {LoadingButton} from "@mui/lab";

interface CursoType {
  uuid: string,
  foto: {
    media: string
  },
  titulo: string,
  prazo: string,
  texto: string,
  encerrado: boolean
}

export const Detalhes = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [curso, setCurso] = useState<CursoType>({uuid: "", foto: {media: ""}, titulo: "", prazo: "", texto: "", encerrado: false});
  const [inscrito, setInscrito] = useState(false);
  const navigate = useNavigate();
  const {uuid} = useParams();
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  
  const [prazo, setPrazo] = useState('');
  const meses = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  useEffect(() => {
    let arrayTempo = curso.prazo.split("-");
    setPrazo(arrayTempo[2] + '.' + meses[parseInt(arrayTempo[1])] + '.' + arrayTempo[0]);
  }, [curso]);
  
  const checkInscrito = async () => {
    if (user.uuid) {
      try {
        let response = await API.checkInscrito(user.uuid, `${uuid}`);
        if (!response.error) {
          setInscrito(response.data === true);
        } else {
          enqueueSnackbar(response.error.description, {variant: "error"});
        }
      } catch (e) {
        enqueueSnackbar(`${e}`, {variant: "error"});
      }
    } else {
      setInscrito(false);
    }
  }
  
  const getCurso = async (uuid: string) => {
    try {
      let resposta = await API.getCurso(uuid);
      if (!resposta.error) {
        setCurso(resposta.data);
      } else {
        enqueueSnackbar(resposta.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
  
  useEffect(() => {
    if (uuid) {
      getCurso(uuid);
      checkInscrito();
    }
  }, [uuid]);
  
  const handleInscrever = async () => {
    if (user.uuid) {
      try {
        setLoading(true);
        let response = await API.inscrever(user.uuid, curso.uuid);
        if (!response.error) {
          checkInscrito();
          enqueueSnackbar("Inscrito com sucesso!", {variant: "success"});
          setLoading(false);
        } else {
          enqueueSnackbar(response.error.description, {variant: "error"});
          setLoading(false);
        }
      } catch (e) {
        enqueueSnackbar(`${e}`, {variant: "error"});
        setLoading(false);
      }
    } else {
      enqueueSnackbar("Conecte-se para se inscrever", {variant: "warning"});
      navigate('/login');
    }
  }
  
  return (
    <div className={"app-curso-detalhes"}>
      <div className={"link"} onClick={() => {
        navigate("/")
      }}>
        <FaChevronCircleLeft/>
        <span>Voltar</span>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <div className={"app-curso-painel-inscrever"}>
            <img src={curso.foto.media} alt={curso.titulo}/>
            {prazo &&
              <span className={"app-curso-painel-data"}>Inscrições até: {prazo}</span>
            }
            {!curso.encerrado ?
              inscrito ?
                <Button variant={"outlined"} disabled sx={{borderRadius: 0}}>Inscrito</Button>
                :
                <LoadingButton loading={loading} onClick={handleInscrever} variant={"outlined"}
                               sx={{borderRadius: 0}}>Inscrever</LoadingButton>
              : null}
            <Faixa/>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={9}>
          {curso.titulo ? <Typography fontSize={16} fontWeight={600}>{curso.titulo}</Typography> : null}
          {curso.texto ? parse(curso.texto) : null}
        </Grid>
      </Grid>
    </div>
  );
}