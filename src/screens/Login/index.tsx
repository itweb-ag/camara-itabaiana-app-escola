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
import {useLogin} from "../../contexts/UserContext";
import {useState} from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const login = useLogin();
  
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
          <span className={"login-titulo"}>Entrar no sistema</span>
          
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
                e.key === "Enter" && login(email, password)
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
          
          <span onClick={() => navigate('/cadastro')} className={"link-cadastrar"}>Não possui uma conta? Cadastrar</span>
          
          <Button
            variant={"outlined"}
            sx={{borderRadius:0,marginTop:"15px"}}
            onClick={() => {login(email, password)}}
            fullWidth
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}