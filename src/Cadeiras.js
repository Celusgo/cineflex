import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function Cadeiras({cadeira, assento, setAssento, nome, setNome, cpf, setCpf}){
    console.log(nome);
    console.log(cpf);
    const [informacoes, setInformacoes] = useState([]);

	useEffect(() => {
		const assentos = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${cadeira}/seats`);
		assentos.then(resposta =>{
        setInformacoes(resposta.data);
    });
	}, []);

    const { movie = [], day = [], seats = [] } = informacoes;
    console.log(informacoes)

    let situacao = [];
    let escolhidos = [];
    
    for(let i =0; i < seats.length; i++){
        situacao.push(seats[i].isAvailable)
    }

    

    function teste(e){
        if(situacao[e]===true){
            situacao[e] = "selecionado";
            setAssento(assento => [...assento, seats[e].id]);
            console.log(assento);
            console.log(situacao);
        }else if(situacao[e]==="selecionado"){
            setAssento(assento.filter((n)=> n !== seats[e].id))
            situacao[e] = true;
            console.log(assento);
            console.log(escolhidos);
        }
        else if(situacao[e]===false){
            alert("Este assento já foi escolhido por outra pessoa!")
        }
    }

    return(
        <>
            <div className="select-seats">
                <h1>Selecione os assentos</h1>
            </div>
            <div className ="container-assentos">
                {seats.map((seat, i)=>
                <div onClick = {()=> teste(i)} key = {i} className={situacao[i] === true?"cinza":"amarelo"}>
                    {seat.name}
                </div>
                )}
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
                <input placeholder = {"Digite seu CPF..."} value = {cpf} onChange={e => setCpf(e.target.value)}></input>
            </div>

            <div className="resumo-inferior">
                <div className="moldura-inferior-cadeiras">
                    <img src={movie.posterURL}/>
                </div>
                
                <div class="resumo-pedido">
                    <h1>{movie.title}</h1>
                    <h1>{day.weekday} - {informacoes.name}</h1>
                </div>
            </div>
        </>
    )
}