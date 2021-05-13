import { Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function Cadeiras({cadeira}){

    const [informacoes, setInformacoes] = useState([]);

	useEffect(() => {
		const assentos = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${cadeira}/seats`);
		assentos.then(resposta =>{
        console.log(resposta.data);
        setInformacoes(resposta.data);
    });
	}, []);

    const { movie = [], day = [], seats = [] } = informacoes;
    console.log(seats);

    let situacao = [];
    
    for(let i =0; i < seats.length; i++){
        situacao.push(seats[i].isAvailable)
    }

    console.log(situacao);
    
    function teste(e){
        if(situacao[e]===true){
            alert("Olá")
            situacao[e] = 'selecionado'
            console.log(situacao);
        }else if(situacao[e]===false){
            alert("Tchau")
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