import {createContext, ReactNode, useContext, useState} from "react";
import {useNavigate} from "react-router";
import {API} from "../../API";
import {useSnackbar} from "notistack";

type UserType = {
  uuid: string,
  nome: string
}

type UserContextType = {
  user: UserType,
  setUser: Function
}
const UserContext = createContext<UserContextType>(null!);

type UserProviderType = {
  children: ReactNode
}

const UserProvider = ({children}: UserProviderType) => {
  const [user, setUser] = useState<UserType>({uuid:'',nome:''});

  const value:UserContextType = {user, setUser};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

const useLogin = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar();
  
  return async (email: string, senha:string) => {
    try {
      let response = await API.login(email, senha);
      if (!response.error) {
        setUser(response.data);
        enqueueSnackbar("Login efetuado!", {variant: "success"});
        navigate("/");
      } else {
        enqueueSnackbar(response.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
}

const useCadastro = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar();
  
  return async (email: string, senha:string, nome: string, telefone?: string) => {
    try {
      let response = await API.cadastrar(email, senha, nome, telefone);
      if (!response.error) {
        setUser(response.data);
        enqueueSnackbar("Cadastro efetuado!", {variant: "success"});
        navigate('/login');
      } else {
        enqueueSnackbar(response.error.description, {variant: "error"});
      }
    } catch (e) {
      enqueueSnackbar(`${e}`, {variant: "error"});
    }
  }
}

const useLogout = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  return () => {
    setUser({uuid: '', nome: ''});
    navigate('/');
  };
}

export {UserContext, UserProvider, useLogin, useLogout, useCadastro};