import {Link} from "react-router-dom";

export const Footer = () => {
  return (
    <div className={"app-footer"}>
      <Link to={'/sobre'}>Sobre</Link>
      <Link to={'/contato'}>Contato</Link>
    </div>
  );
}