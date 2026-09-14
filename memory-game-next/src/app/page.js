"use client";

import { useEffect, useState } from "react";

export default function Home() {

const [tablero, setTablero] = useState(crearTablero);
const [evaluando, setEvaluando] = useState(false);
const [movimiento, setMovimiento] = useState(0);
const [tiempo, setTiempo] = useState(0);
const [jugando, setJugando] = useState(false);
const [victoria, setVictoria] = useState (false);
const [jugadores, setJugadores] = useState([
  { id: 1, nombre: "Jugador 1", pares: 0 },
  { id: 2, nombre: "Jugador 2", pares: 0 },
]);
const [jugadorActual, setJugadorActual] = useState(0);
const [ganador, setGanador] = useState(null);
const [cantidadJugadores, setCantidadJugadores] = useState(2);


function crearTablero () {
  const valores = [1, 2, 3, 4, 5, 6, 7, 8];
  const duplicarValores = [...valores, ...valores];


  function mezclar (array) {
    for (let i=array.length - 1 ; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fichasMezcladas= mezclar (duplicarValores);

  const fichasObjetos = fichasMezcladas.map((numero, indice) => ({id: indice, valor: numero, dadaVuelta:false, encontrada:false})); 

  return fichasObjetos;

};

function crearJugadores(cantidad) {
  return Array.from({ length: cantidad }, (_, indice) => ({
    id: indice + 1,
    nombre: `Jugador ${indice + 1}`,
    pares: 0,
  }));
}


function manejarClick(id){
  setJugando(true);
  setTablero((tableroActual) => {
    return tableroActual.map((ficha) => {
      if (ficha.id === id) {
        return {
        ...ficha,
        dadaVuelta:true
        };
      }
      return ficha;
    })
  })
};

useEffect (()=> {
  const fichasDadaVuelta = tablero.filter((ficha) => ficha.dadaVuelta && !ficha.encontrada)

  
  if (fichasDadaVuelta.length === 2) {
    setEvaluando(true);
    
    if(fichasDadaVuelta[0].valor=== fichasDadaVuelta[1].valor){
      sumarPar();
      setEvaluando(false);
      setMovimiento((actual) => actual +1);
      setTablero((actual)=> {
        return actual.map((ficha)=> {
          if(ficha.id === fichasDadaVuelta[0].id || ficha.id === fichasDadaVuelta[1].id )
            {
            return {...ficha, encontrada:true}
            }
          return ficha;
        })
      });

    } else {
      setTimeout(() => {
          setEvaluando(false);

          setMovimiento((actual) => actual +1);

          setTablero((actual)=> {
            return actual.map ((ficha)=> {
              if (ficha.id === fichasDadaVuelta[0].id || ficha.id === fichasDadaVuelta[1].id) {
                return {...ficha, dadaVuelta:false}
              }
              return ficha
            })
          })
        cambiarTurno();
    }, 1000);
    }
    
  }

  if (jugando && tablero.every((ficha) => ficha.encontrada)) {
  setJugando(false);

  const ganadorFinal = determinarGanador();

  setGanador(ganadorFinal);
  setVictoria(true);
}

}, [tablero]);

useEffect (() => {
      if(!jugando) {
        return
      };

      const intervalo = setInterval(() => {
        setTiempo ((actual)=> actual + 1);
      }, 1000);

      return () => {
        clearInterval(intervalo);
      };

}, [jugando]);

  function nuevaPartida() {
    setTablero(crearTablero);
    setTiempo(0);
    setMovimiento(0);
    setJugando(false);
    setVictoria(false);
    setGanador(null);
    setJugadorActual(0);
    setJugadores(crearJugadores(cantidadJugadores));
  };

  function cambiarTurno() {
  setJugadorActual((actual) => {
    return (actual + 1) % jugadores.length;
  });
}

function sumarPar() {
  setJugadores((jugadoresActuales) => {
    return jugadoresActuales.map((jugador, indice) => {
      if (indice === jugadorActual) {
        return {
          ...jugador,
          pares: jugador.pares + 1,
        };
      }

      return jugador;
    });
  });
};

function determinarGanador() {
  const ganador = jugadores.reduce((mejor, jugador) => {
    if (jugador.pares > mejor.pares) {
      return jugador;
    }

    return mejor;
  });

  const hayEmpate = jugadores.filter(
    (jugador) => jugador.pares === ganador.pares
  ).length > 1;

  if (hayEmpate) {
    return null;
  }

  return ganador;
}


  return (
    <main className="min-h-screen max-w-4xl  mx-auto p-4 bg-slate-900 text-white flex flex-col gap-6">
      
      <header className="flex items-center justify-between px-2 sm:px-6 py-2">
        
        <h1 className="text-2xl font-bold md:text-3xl">Memory</h1>
        
        <button 
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium"
            onClick={nuevaPartida}
            >
              Nueva partida
        </button>

      </header>

      <div className="flex flex-col justify-between">
        <p className="text-center text-lg font-semibold">
            Turno de: {jugadores[jugadorActual].nombre}
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 m-2">
            {jugadores.map((jugador) => (
              <div key={jugador.id}>
                {jugador.nombre}: {jugador.pares} pares
              </div>
              ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          
          <p>Elegir la cantidad de Jugadores:</p>

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((cantidad) => (
          <button
              key={cantidad}
              onClick={() => {
              setCantidadJugadores(cantidad);
              setJugadores(crearJugadores(cantidad));
              setJugadorActual(0);
              }}
            disabled={jugando}
            className={`px-3 py-1 rounded-lg ${cantidadJugadores === cantidad ? "bg-indigo-600": "bg-slate-700"} ${jugando ? "opacity-50 cursor-not-allowed" : "cursor-pointer" }`}>
            {cantidad}
          </button>
          ))}

          </div>
          
          <p> Cantidad de Jugadores: {cantidadJugadores} </p>

        </div>
      </div>

      <section className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 justify-items-center"
      >
        {tablero.map((fichas) => (
          <button key= {fichas.id}
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90 ${fichas.encontrada ? "bg-green-500" : "bg-slate-700"}`}
          onClick={ ()=> {if (!fichas.encontrada && !fichas.dadaVuelta && !evaluando){ manejarClick(fichas.id)} }}
          >
            {fichas.encontrada || fichas.dadaVuelta ? fichas.valor : ""}

          </button>
        ))}

      </section>

      <footer className="flex gap-3 sm:gap-4 justify-center">
        
        <div className="bg-slate-800 rounded-lg p-4 flex-1 text-center">
          <p className="text-xs text-slate-400"> Tiempo: </p>
          <p className="text-xl font-semibold">
            {Math.floor(tiempo / 60)}:{(tiempo % 60).toString().padStart(2, "0")}
            </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 flex-1 text-center">
          <p className="text-xs text-slate-400"> Movimientos: </p>
          <p className="text-xl font-semibold">{movimiento}</p>
        </div>

      </footer>

        {victoria && (
          <div className="fixed inset-0 bg-black/70 flex flex-col  items-center justify-center">
            <h2 className="text-3xl font-bold">
              ¡Lo lograste! 🎉
            </h2>
              {ganador ? (
                <p className="mt-2 text-xl">
                  Ganador: {ganador.nombre} 🏆
                </p>
                ) : (
                <p className="mt-2 text-xl">
                  ¡Empate! 🤝
                </p>
                )}

            <p className=" font-semibold m-2">Tiempo: {Math.floor(tiempo / 60)}:{(tiempo % 60).toString().padStart(2, "0")} </p>

            <p className="m-2" >Movimientos: {movimiento}</p>
            <button
                onClick={nuevaPartida}
                className="mt-6 bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg font-medium cursor-pointer">
                  Jugar de nuevo
            </button>
        </div>
)}

    </main>
  );
}