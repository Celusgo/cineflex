import Filmes from './Filmes';
export default function Home({setId, setFilme}){
    return(
        <>
            <div className="select">
                <h1>Selecione o filme</h1>
            </div>
            <div className="catalogo">
                <Filmes setId = {setId} setFilme = {setFilme}/>
            </div>
        </>
    )
}