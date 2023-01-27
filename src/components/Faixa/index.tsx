type FaixaProps = {
  rounded?: boolean
}
export const Faixa = ({rounded}: FaixaProps) => {
  return (
    <div className={rounded ? "app-faixa rounded" : "app-faixa"}>
      <div className={"app-faixa-cor cor1"}/>
      <div className={"app-faixa-cor cor2"}/>
      <div className={"app-faixa-cor cor3"}/>
    </div>
  )
}