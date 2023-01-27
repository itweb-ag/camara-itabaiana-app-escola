import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MemoryRouter, Route, Routes} from "react-router";
import {Cadastro, Contato, Detalhes, Inicio, Login, Sobre} from "./screens";
import Certificado from "./modules/certificado/screen/Certificado";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MemoryRouter>
    <Routes>
      <Route path={"/"} element={<App/>}>
        <Route index element={<Inicio/>}/>
        <Route path={"detalhes/:uuid"} element={<Detalhes/>}/>
        <Route path={"login"} element={<Login/>}/>
        <Route path={"cadastro"} element={<Cadastro/>}/>
        <Route path={"sobre"} element={<Sobre/>}/>
        <Route path={"contato"} element={<Contato/>}/>
        <Route path={"certificado"} element={<Certificado/>}/>
      </Route>
    </Routes>
  </MemoryRouter>
);