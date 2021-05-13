import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './css/reset.css';
import './css/styles.css';
import Topo from './Topo';
import Home from './Home';
import Sessao from './Sessao';
import Cadeiras from './Cadeiras';

function App() {
    const [id, setId] = React.useState("");
    const [cadeira, setCadeira] = React.useState("");
    const [filme, setFilme] = React.useState("");
    const [data, setData] = React.useState("");
    const [assento, setAssento] = React.useState([]);
    const [nome, setNome] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    //console.log(id);
    //console.log(data);
    //console.log(filme);
    //console.log(cadeira);



    return (
        <>
            <Topo />
            <BrowserRouter>
                <Switch>
                    <Route path= "/" exact>
                        <Home setId = {setId} setFilme = {setFilme}/>
                    </Route>
                    <Route path = "/sessoes/:idFilme" exact>
                        <Sessao id={id} setData = {setData} setCadeira = {setCadeira}/>
                    </Route>
                    <Route path = "/assentos/:idSessao" exact>
                      <Cadeiras cadeira = {cadeira} id={id} assento = {assento} setAssento = {setAssento} nome = {nome} setNome = {setNome} cpf = {cpf} setCpf = {setCpf}/>
                    </Route>
                </Switch>  
            </BrowserRouter>
        </>
    );
}

ReactDOM.render(<App/>, document.querySelector(".root"));