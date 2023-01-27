import {useNavigate} from "react-router";
import {FaChevronCircleLeft, FaEyeSlash, FaRegEye} from "react-icons/fa";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import {useCadastro} from "../../contexts/UserContext";
import {useState} from "react";

export const Cadastro = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const cadastrar = useCadastro();
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  
  return (
    <div className={"app-curso-detalhes"}>
      <div className={"link"} onClick={() => {navigate("/")}}>
        <FaChevronCircleLeft/>
        <span>Voltar</span>
      </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className={"app-login-painel"}>
          <span className={"login-titulo"}>Cadastrar no sistema</span>
          
          <TextField
            label={"Seu nome completo"}
            variant={"outlined"}
            fullWidth
            value={nome}
            onChange={(t) => {
              setNome(t.target.value);
            }}
            margin={"normal"}
          />
          
          <TextField
            label={"Seu e-mail"}
            variant={"outlined"}
            fullWidth
            value={email}
            onChange={(t) => {
              setEmail(t.target.value);
            }}
            margin={"normal"}
          />
          
          <TextField
            label={"Seu telefone"}
            variant={"outlined"}
            fullWidth
            value={telefone}
            onChange={(t) => {
              setTelefone(t.target.value);
            }}
            margin={"normal"}
          />
          
          <FormControl
            variant="outlined"
            fullWidth
            margin={"normal"}
          >
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(t) => {
                setPassword(t.target.value);
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && cadastrar(email, password, nome, telefone)
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <FaEyeSlash/> : <FaRegEye/>}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>
          
          <Button
            variant={"outlined"}
            sx={{borderRadius:0,marginTop:"15px"}}
            onClick={() => {cadastrar(email, password, nome, telefone)}}
            fullWidth
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}