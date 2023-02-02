import React, {useContext, useState} from "react";
import {useNavigate} from "react-router";
import {UserContext} from "../../../contexts/UserContext";
import {FaChevronCircleLeft, FaRegEye} from "react-icons/fa";
import {
  Button, CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useCarregarCertificados from "../function/useCarregarCertificados";
import {CertificadoEntity} from "../entity/CertificadoEntity";
import ModalImagem from "../component/ModalImagem";

export const Certificado = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [certificado, setCertificado] = useState<CertificadoEntity>({
    uuid: "",
    cpf: "",
    fim: "",
    ch: "",
    titulo: "",
    inicio: "",
    nome: "",
    ementa: ""
  });
  const {data, isValidating} = useCarregarCertificados(user.uuid);
  
  return (
    <>
      <div className={"app-curso-detalhes"}>
        <div className={"link"} onClick={() => {
          navigate("/")
        }}>
          <FaChevronCircleLeft/>
          <span>Voltar</span>
        </div>
        <Divider/>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  Curso
                </TableCell>
                <TableCell>
                  Opções
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!data && isValidating ?
                <TableRow>
                  <TableCell>
                    <CircularProgress/>
                  </TableCell>
                </TableRow>
                :
                data ? data.data.map((certificado: CertificadoEntity) => (
                    <TableRow key={certificado.uuid}>
                      <TableCell>
                        {certificado.titulo}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={"outlined"}
                          startIcon={<FaRegEye/>}
                          onClick={() => {
                            setCertificado(certificado)
                            setOpen(true);
                          }}
                        >
                          Ver
                        </Button>
                        {/*<Button*/}
                        {/*  sx={{ml: "10px"}}*/}
                        {/*  variant={"outlined"}*/}
                        {/*  startIcon={<FaDownload/>}*/}
                        {/*  onClick={() => {*/}
                        {/*  */}
                        {/*  }}*/}
                        {/*>*/}
                        {/*  Baixar*/}
                        {/*</Button>*/}
                      </TableCell>
                    </TableRow>
                  ))
                  :
                  null
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ModalImagem open={open} certificado={certificado} onClose={() => setOpen(false)}/>
    </>
  );
}

export default Certificado;