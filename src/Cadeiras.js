import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function Cadeiras({cadeira, setAssento}){

    const [informacoes, setInformacoes] = useState([]);

	useEffect(() => {
		const assentos = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${cadeira}/seats`);
		assentos.then(resposta =>{
        setInformacoes(resposta.data);
    });
	}, []);

    const { movie = [], day = [], seats = [] } = informacoes;

    let situacao = [];
    let escolhidos = [];
    
    for(let i =0; i < seats.length; i++){
        situacao.push(seats[i].isAvailable)
    }

    
    function teste(e){
        if(situacao[e]===true){
            situacao[e] = "selecionado";
            escolhidos.push(seats[e].id);
            escolhidos = [...new Set(escolhidos)];
            console.log(escolhidos);
            console.log(situacao);
        }else if(situacao[e]==="selecionado"){
            escolhidos = escolhidos.filter((n)=> n !== seats[e].id)
            situacao[e] = true;
            console.log(situacao);
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
            <div className="state">
                <div>
                    <div className = "selected">

                    </div>
                    <p>Selecionado</p>
                </div>
                <div>
                    <div className = "available">

                    </div>
                    <p>Disponível</p>
                </div>
                <div>
                    <div className = "unavailable">

                    </div>
                    <p>Indisponível</p>
                </div>
            </div>
        </>
    )
}