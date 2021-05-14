import { Link } from 'react-router-dom';
export default function Sucesso({ setId, setCadeira, filme, setFilme, hora, setHora, data, setData, assento, setAssento, nome, setNome, cpf, setCpf }){
    return(
        <>
        <div className="sucesso">
            Pedido feito com sucesso!
        </div>

        <div className="container-sucesso">
            <div className="info-sucesso">
                <h1>Filme e sessão</h1>
                <h2>{filme}</h2>
                <h2>{data} {hora}</h2>
            </div>
            <div className="info-sucesso">
                <h1>Ingressos</h1>
                {assento.map((elemento)=>
                <h2>Assento {elemento.id}</h2>
                )}
            </div>
            <div className="info-sucesso">
               <h1>Comprador</h1>
               <h2>Nome: {nome}</h2>
               <h2>CPF: {cpf}</h2> 
            </div>
        </div>
        <div className="container-confirmacao">
                <Link to="/">
                    <div className = "botao-confirmacao" onClick={()=>(setId(""), setCadeira(""), setFilme(""), setHora(""), setData(""), setAssento([]), setNome(""), setCpf(""))}>
                        Voltar pra Home
                    </div>
                </Link>
            </div>
        </>
    )
}