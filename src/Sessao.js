import { useEffect, useState } from 'react';
import axios from 'axios';
import CadaSessao from './CadaSessao';


export default function Sessao({id, setCadeira, setData, setHora}){
    
    const [horarios, setHorarios] = useState([]);

    useEffect(()=>{
        const sessao = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${id}/showtimes`);

        sessao.then(response => {
        setHorarios(response.data);
        });
    }, []);

    const { days = [] } = horarios;

    return(
        <>
            <div className="select">
                <h1>Selecione o filme</h1>
            </div>
            <div className="container-sessao">
            {days.map((item, i) => 
            <CadaSessao setCadeira = {setCadeira} setData = {setData} setHora = {setHora} key = {i} weekday = {item.weekday} date = {item.date} showtimes = {item.showtimes}/>
            )}
            </div>
            <div className="resumo-inferior">
                <div className="moldura-inferior">
                    <img src={horarios.posterURL}/>
                </div>
                <h1>{horarios.title}</h1>
            </div>
            
    </>
    )
}