import { useState } from 'react'
import './App.css'
import { CopyCheck, CopyPlus } from 'lucide-react';
import Formulario from './components/formulario';

function App() {

  const [longitud, setLongitud] = useState(10);
  const [minusculas, setMinusculas] = useState(true);
  const [mayusculas, setMayusculas] = useState(true);
  const [numeros, setNumeros] = useState(true);
  const [simbolos, setSimbolos] = useState(true);
  const[password, setPassword] = useState("");
  const [copiado, setCopiado] = useState(false);

  function generarPassword () {
    
    let permitidos = "";

    if (minusculas) {
      permitidos += "abcdefghijklmnopqrstuvwxyz";
    };

    if (mayusculas) {
      permitidos += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    };

    if (numeros) {
      permitidos += "0123456789";
    };

    if (simbolos) {
      permitidos += "!@#$%^&*";
    };

    let long = parseInt(longitud);

    let resultado= "";

    for (let i = 0; i < long; i++){
      resultado += permitidos[Math.floor(Math.random() * permitidos.length)]
    }

    if (permitidos== "") {
      return
    } else {
         setPassword(resultado);
    }

   
  }; 


  function copiarPassword () {
    if (password ==="") {
      return
    } else {
      navigator.clipboard.writeText(password)
      setCopiado(true)
      setTimeout (() => setCopiado (false), 3000);
    }
  }

  return (
    
    <main className='bg-[#232b3d] text-white min-h-screen w-full flex flex-col items-center justify-center'>

      <h1 className= "text-3xl tracking-wider uppercase p-3 font-bold mb-2 text-gray-300" > 
          Generador de contraseñas
      </h1>
      <section className='bg-[#1e2435] relative max-x-lg flex flex-col gap-4 rounded-xl p-4'>
        
        <div className='flex flex-row items-center justify-center gap-4'>

          <input 
            type="text"
            name='texto'
            id='texto'
            value={password}
            readOnly
            placeholder='P8DSFeasd%2$0#'
            className='min-w-0 flex-1 rounded-lg bg-[#1b2132] px-4 text-left text-xl outline-none text-gray-200' />

            <button 
              aria-label='Copiar'
              className= {`flex shrink-0 items-center justify-center rounded-lg text-lg cursor-pointer border p-3 gap-2 ${copiado? "bg-amber-200/30 border-amber-300" : "bg-[#1b2132] border-white/30"}`}
              onClick = {copiarPassword}
            >
                {copiado ? (
                  <>
                    Copiado <CopyCheck/>
                  </>
                ) : (
                  <>
                    Copiar <CopyPlus/>
                  </>
                )}
            </button>
        </div>
                <Formulario
                  longitud = {longitud} setLongitud = {setLongitud}
                  minusculas= {minusculas} setMinusculas= {setMinusculas}
                  mayusculas= {mayusculas} setMayusculas= {setMayusculas}
                  numeros = {numeros} setNumeros = {setNumeros}
                  simbolos = {simbolos} setSimbolos = {setSimbolos}
                  generarPassword = {generarPassword}
                />
      </section>
    </main>
  )
}

export default App
