import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function Cadeiras({cadeira, assento, setAssento, nome, setNome, cpf, setCpf}){
    const [informacoes, setInformacoes] = useState([]);

	useEffect(() => {
		const assentos = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${cadeira}/seats`);
		assentos.then(resposta =>{
        setInformacoes(resposta.data);
    });
	}, []);

    const { movie = [], day = [], seats = [] } = informacoes;
   

    const enviarDados = {
        ids: assento.map(elemento => elemento.id),
        name: nome,
        cpf: cpf
    }
    
    function enviaDados(){
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/seats/book-many`, enviarDados)
    }

    console.log(assento);

    return(
        <>
            <div className="select-seats">
                <h1>Selecione os assentos</h1>
            </div>
            <div className ="container-assentos">
                {seats.map((lugar, i)=>
                    <div key = {i} onClick={() => lugar.isAvailable? (assento.find(n => n.id === lugar.id)? (setAssento(assento.filter(n => n.id !== lugar.id))): setAssento([...assento, {id: lugar.id, name: lugar.name}])) : alert("Esse assento não está disponível")} className = {lugar.isAvailable? (assento.find(n => n.id === lugar.id) ? "verde": "cinza"): "amarelo"}>
                        {lugar.name}
                    </div>)}
            </div>

            <div className="container-legenda">
                <div className ="legenda">
                    <div className = "legenda-selecionado"></div>
                    <h1>Selecionado</h1>
                </div>
                <div className ="legenda">
                    <div className = "legenda-disponivel"></div>
                    <h1>Disponível</h1>
                </div>
                <div className ="legenda">
                    <div className = "legenda-indisponivel"></div>
                    <h1>Indisponível</h1>
                </div>
            </div>

            <div className = "dados-comprador">
                <h1>Nome do comprador:</h1>
                <input placeholder = {"Digite seu nome..."} value = {nome} onChange={e => setNome(e.target.value)}></input>
                <h1>CPF do comprador:</h1>
                <input placeholder = {"Digite seu CPF (somente números)"} value = {cpf} onChange={e => setCpf(e.target.value)}></input>
            </div>

           <div className="container-confirmacao">
                <Link to="/sucesso">
                    <div className = "botao-confirmacao" onClick={()=>enviaDados()}>
                        Reservar assento(s)
                    </div>
                </Link>
            </div>

            <div className="resumo-inferior">
                <div className="moldura-inferior-cadeiras">
                    <img src={movie.posterURL} alt = {movie.title}/>
                </div>
                
                <div class="resumo-pedido">
                    <h1>{movie.title}</h1>
                    <h1>{day.weekday} - {informacoes.name}</h1>
                </div>
            </div>
        </>
    )
}