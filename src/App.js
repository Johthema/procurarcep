import { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { MdOutlineStreetview } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { FaStreetView } from "react-icons/fa";
import api from './services/api.js';
import './style.css';

//[[Informações necessarias]]
//Api para buscar cep: https://viacep.com.br/ws/69060101/json/

function App() {


  const [cep, setInput] = useState("");

// eslint-disable-next-line no-unused-vars
  const [cepRe, setCep] = useState ({})
//----------------------------------Escopo das Funções
    async function funcaoAlerta(){
       console.log("O cep passado é: ", cep)

       if(cep === ''){
        alert("O campo cep precisa ser preenchido");
        return;
       }

       //Utiliza-se o try pois a função irá fazer tentativas
       try{
      
        //const response = await api.get(`${cep}/json`);
        const response = await api.get(`${cep}`);
        console.log(response.data)
        setCep(response.data)
        setInput(""); //Reseta o campo

        if(response.data.erro === true){
          alert("Cep não encontrado!")
          
        }
       }
       //E caso dê algum erro o catch se responsabiliza do que será feito 
       catch{
        alert("ops! Erro ao buscar cep.");
        setInput(""); //Reseta o campo
       }

    }
    



//----------------------------------Corpo da pagina componente principal
  return (
  
      <main>
        {/* Titulo do projeto */}
        <div className="container">
          <h1 className="title">Buscador de CEP da região de Manaus</h1>
        
        {/*Caixa de busca*/}
        <div className="containerInput">
          
          <input type="text" placeholder="Digite seu cep aqui.." value={cep} onChange={(e) => setInput(e.target.value)}/>

          <button className="buttonSearch" onClick={funcaoAlerta}> <GoSearch size={25} color="#ffff"/></button>
        </div>
        {/*Resposta da solicitação*/}

        {Object.keys(cepRe).length > 0 && ( //Verifica se existe dados dentro do cepRe
          <main className="main">
            <h2>CEP: {cepRe.cep}</h2>
            <span><FaStreetView size={25} color="#000"/> Rua: {cepRe.logradouro} </span>
            <span><MdOutlineStreetview size={25} color="#000"/> Bairro: {cepRe.bairro}</span>
            <span><FaCity size={25} color="#000"/> Cidade: {cepRe.localidade} - {cepRe.uf}</span>
          </main>
      
        )}

        </div>
      </main>
  );
}

export default App;
