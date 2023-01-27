import {Faixa} from "../Faixa";
import {useNavigate} from "react-router";
import {useState} from "react";
import { useEffectOnce } from 'usehooks-ts'

type CursoProps = {
  item: {
    uuid: string,
    foto: {
      media: string
    },
    titulo: string,
    prazo: string,
    descricao: string
  }
}

export const Curso = ({item}: CursoProps) => {
  const navigate = useNavigate();
  const [prazo, setPrazo] = useState('');
  const meses = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  
  useEffectOnce(() => {
    let arrayTempo = item.prazo.split("-");
    setPrazo(arrayTempo[2] + '.' + meses[parseInt(arrayTempo[1])] + '.' + arrayTempo[0]);
  });
  
  const handleClick = () => {
    navigate(`detalhes/${item.uuid}`);
  }
  
  return(
    <div className={"curso-item"} onClick={handleClick}>
      <div className={"curso-item-conteudo"}>
        <img src={item.foto.media} alt={item.titulo}/>
        <div className={"curso-item-info"}>
          {prazo &&
              <span className={"app-curso-data"}>Inscrições até: {prazo}</span>
          }
          <span className={"app-curso-titulo"}>{item.titulo}</span>
          <span className={"app-curso-descricao"}>{item.descricao}</span>
          <span className={"app-curso-link"}>Leia mais...</span>
        </div>
      </div>
      <Faixa rounded/>
    </div>
  );
}