import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Filmes({setId, setFilme}){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies');

        requisicao.then(response => {
            setFilmes(response.data);
        });
    }, []);

    return (
      filmes.map((elemento)=>
        <Link to ={`/sessoes/${elemento.id}`}>
            <div onClick={()=>(setId(elemento.id), setFilme(elemento.title))} className="filme" key={elemento.id}>
                <img src = {elemento.posterURL} alt={elemento.title}/>
            </div>
        </Link>
        )
    )
}