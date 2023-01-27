import {Button, Dialog, Grid, TextField, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useLogout, UserContext} from "../../contexts/UserContext";
import {useNavigate} from "react-router";
import useCheckCPF from "../../functions/useCheckCPF";
import MaskedInput from "react-text-mask";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "notistack";
import axios from "axios";
import {BASE_URL} from "../../API";

export const Header = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const logout = useLogout();
  const [CPF, setCPF] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const resultCheckCPF = useCheckCPF(user.uuid);
  const {enqueueSnackbar} = useSnackbar();
  
  const validarCPF = (): boolean => {
    let cpf = CPF.replace(/\D+/g, '');
    if (cpf === '') return false;
    if (cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999")
      return false;
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
      rev = 0;
    if (rev !== parseInt(cpf.charAt(9)))
      return false;
    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11)
      rev = 0;
    if (rev !== parseInt(cpf.charAt(10)))
      return false;
    return true;
  }
  
  const enviarCPF = () => {
    setLoading(true);
    if (validarCPF()) {
      axios.post(BASE_URL + `escola/setcpf/${user.uuid}`, {cpf: CPF})
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar('error', {variant: "error"});
        })
      ;
    } else {
      setLoading(false);
      enqueueSnackbar('CPF inválido', {variant: "error"});
    }
  }
  
  return (
    <>
      <header className={"header"}>
        <Grid container spacing={2} sx={{alignItems: "center"}}>
          <Grid item xs={12} sm={12} md={4}>
            <div className={"titulos"}>
              <h2 className={"header-titulo-menor"}>Cursos</h2>
              <h1 className={"header-titulo-maior"}>Escola do Legislativo</h1>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <div className={"header-botoes"}>
              {user.uuid ?
                <>
                  {user.nome}
                  <Button
                    onClick={() => navigate("certificado")}
                    variant={"outlined"}
                    sx={{borderRadius: 0}}
                  >
                    Certificados
                  </Button>
                  <Button
                    onClick={logout}
                    variant={"outlined"}
                    sx={{borderRadius: 0}}
                  >
                    Sair
                  </Button>
                </>
                :
                <>
                  <Button
                    onClick={() => {
                      navigate('/cadastro')
                    }}
                    variant={"outlined"}
                    sx={{borderRadius: 0}}
                  >
                    Cadastrar
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/login')
                    }}
                    variant={"outlined"}
                    sx={{borderRadius: 0}}
                  >
                    Entrar
                  </Button>
                </>
              }
            </div>
          </Grid>
        </Grid>
      </header>
      <Dialog
        open={resultCheckCPF.data && !resultCheckCPF.data.data}
        PaperProps={{
          sx: {
            minWidth: "300px",
            padding: "10px"
          }
        }}
      >
        <Typography>
          Atenção!
        </Typography>
        <Typography>
          Você deve informar abaixo seu CPF, para que possa receber certificados dos cursos que concluir.
        </Typography>
        <MaskedInput
          mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
          placeholderChar={"_"}
          onChange={(e) => {
            setCPF(e.target.value)
          }}
          render={(ref, props) => (
            <TextField
              {...props}
              margin={"normal"}
              inputRef={ref}
              fullWidth
              variant={"outlined"}
              label={"CPF"}
              autoFocus
              value={CPF}
            />
          )}
          guide
          keepCharPositions
        />
        <LoadingButton
          loading={loading}
          variant={"outlined"}
          onClick={enviarCPF}
          fullWidth
        >
          Enviar
        </LoadingButton>
      </Dialog>
    </>
  );
}