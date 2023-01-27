import React, {createRef, useRef} from "react";
import {Dialog, IconButton, Tooltip, Typography} from "@mui/material";
import {CertificadoEntity} from "../entity/CertificadoEntity";
import ImgCertificado from "../../../assets/img/certificado.png";
import {FaDownload, FaTimes} from "react-icons/fa";
import html2canvas from "html2canvas";

type Argumentos = {
  certificado: CertificadoEntity
  open: boolean
  onClose(): void
}
export const ModalImagem = ({certificado, open, onClose}: Argumentos) => {
  const refCert = createRef<HTMLDivElement>();
  const downloadCert = () => {
    if (refCert.current) {
      html2canvas(refCert.current, {
        windowWidth: 1920,
        windowHeight: 1080,
        x: 5,
        y: 50,
        width: 1080,
        height: 650
      }).then(canvas => {
        let link = document.createElement("a");
        link.download = `Certificado ${certificado.titulo}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  }
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          padding: "5px",
          maxWidth: "100%"
        },
        ref: refCert
      }}
    >
      <div style={{display: "flex", justifyContent: "end"}}>
        <Tooltip title={"Baixar"}>
          <IconButton onClick={downloadCert}>
            <FaDownload size={30}/>
          </IconButton>
        </Tooltip>
        <Tooltip title={"Fechar"}>
          <IconButton onClick={onClose}>
            <FaTimes size={30}/>
          </IconButton>
        </Tooltip>
      </div>
      <img src={ImgCertificado} alt={"Imagem"} style={{zIndex: 1, width: "1080px", height: "650px"}}/>
      <div
        style={{position: "absolute", top: "260px", left: "160px", width: "780px", textAlign: "center", zIndex: "2"}}>
        <Typography fontSize={18}>
          Certificamos que, para os devidos fins, o(a) Sr(a)
        </Typography>
        <Typography fontSize={30} fontWeight={600} sx={{mt: "10px", mb: "10px"}}>
          {certificado.nome}
        </Typography>
        <Typography fontSize={18}>
          inscrito(a) sob o número de CPF <b>{certificado.cpf}</b>, concluiu o curso "<b>{certificado.titulo}</b>". No
          período de {certificado.inicio} a {certificado.fim}, com carga horária de <b>{certificado.ch}</b> horas.
        </Typography>
      </div>
      <div
        style={{position: "absolute", top: "540px", left: "160px", width: "780px", textAlign: "center", zIndex: "2"}}>
        <Typography fontSize={18}>
          Assinatura
        </Typography>
      </div>
      
      <div
        style={{position: "absolute", top: "620px", left: "160px", width: "780px", textAlign: "center", zIndex: "2"}}>
        <Typography fontSize={12}>
          Este certificado pode ser validado através do link:
        </Typography>
        <Typography fontSize={12} fontWeight={600}>
          {window.location.protocol + '://' + window.location.host + window.location.pathname + 'validarcertificado/' + certificado.uuid}
        </Typography>
      </div>
    </Dialog>
  );
}

export default ModalImagem;