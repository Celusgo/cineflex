import { Link } from 'react-router-dom';
import React from 'react';

export default function CadaSessao ({ date, weekday, showtimes, setCadeira, setData }){

    return(
        <div className="hora-sessao">
            <p>{weekday} - {date}</p>
            <div className="container-horarios">
                {showtimes.map((horario, i) =>
                <Link to={`/assentos/${horario.id}`}>
                     <div className="botao-horario" key = {i} onClick={() => (setCadeira(horario.id), setData(horario.name))}>
                         {horario.name}
                    </div>
                </Link>)}
            </div>
        </div>
    )
}