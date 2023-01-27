import React from 'react';
import './main.min.css';
import {Outlet} from "react-router";
import {Footer, Header} from "./components";
import {createTheme, ThemeProvider} from "@mui/material";
import {ptBR} from "@mui/material/locale";
import {SnackbarProvider} from 'notistack';
import {UserProvider} from "./contexts/UserContext";

function App() {
  const theme = createTheme(
    {
      typography: {
        fontFamily: 'Montserrat, sans-serif',
      },
      palette: {
        primary: {
          main: '#000',
          contrastText: '#fff'
        }
      }
    },
    ptBR
  );
  
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
          <div className={"app"}>
            <Header/>
            <Outlet/>
            <Footer/>
          </div>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
