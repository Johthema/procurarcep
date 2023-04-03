import { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { MdOutlineStreetview } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { FaStreetView } from "react-icons/fa";
// import { LoadScript } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';

//Importação de imagens e estilo
import api from './services/api.js';
import map2 from "../src/map2.png";
import './style.css';

//[[Informações necessarias]]

function App() {


  const [cep, setInput] = useState("");
  const [cepRe, setCep] = useState ({});
  //Google maps
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const defaultProps = {
    center: {
      lat: -3.0779914,
      lng: -59.9861152
    },
    zoom: 12.5
  };
  //Latitude longitude
  

//----------------------------------Escopo das Funções
    async function funcaoAlerta(){
       console.log("O cep passado é: ", cep)

       if(cep === ''){
        alert("O campo cep precisa ser preenchido");
        return;
       }

       //Aqui Utiliza-se o try pois a função irá fazer tentativas
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
  
      <main className="mainPrincipal">
        {/* Titulo do projeto */}
        <div className="container ladoAlado">
          <img src={map2} alt="imagemCentral" className="imagemCentralLogo"/>
          <h1 className="title">Buscador de endereço da região</h1>
        
        {/*Caixa de busca*/}
        <div className="containerInput">
          
          <input type="text" placeholder="Digite seu cep aqui.." value={cep} onChange={(e) => setInput(e.target.value)}/>

          <button className="buttonSearch" onClick={funcaoAlerta}> <GoSearch size={25} color="#ffff"/></button>
        </div>
        {/*Resposta da solicitação*/}

        {Object.keys(cepRe).length > 0 && ( //Verifica se existe dados dentro do cepRe
          <main className="main2">
            <h2>CEP: {cepRe.cep}</h2>
            <span><FaStreetView size={25} color="#000"/> Rua: {cepRe.logradouro} </span>
            <span><MdOutlineStreetview size={25} color="#000"/> Bairro: {cepRe.bairro}</span>
            <span><FaCity size={25} color="#000"/> Cidade: {cepRe.localidade} - {cepRe.uf}</span>
          </main>
      
        )}

        </div>
        <div className="divMapa ladoAlado" style={{ height: '100vh', width: '100%' }}>
      
        
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
         
        />
      </GoogleMapReact>
    
    
        </div>
      </main>
  );
}

export default App;
