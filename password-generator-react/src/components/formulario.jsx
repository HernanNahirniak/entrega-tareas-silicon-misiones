import {RotateCcw} from "lucide-react"

function Formulario ({longitud, minusculas, mayusculas, numeros, simbolos, setLongitud, setMinusculas, setMayusculas, setNumeros, setSimbolos, generarPassword}) {

    function calcularFortaleza () {
        let texto = "";
        let puntos = 0;
        let long = parseInt(longitud)

        if (minusculas) puntos++;
        if (mayusculas) puntos++
        if (numeros) puntos++;
        if (simbolos) puntos++;
        if (long >= 12) puntos++;

        switch (puntos) {
            case 0:
            case 1:
                texto = "Muy débil";
                break;
            case 2:
                texto = "Débil";
                break;
            case 3: 
                texto = "Media";
                break
            case 4:
            case 5: 
                texto = "Fuerte"
                break            
        }

        return {texto: texto, puntos: puntos}
    };


    const fortaleza = calcularFortaleza();
    const porcentaje = (fortaleza.puntos / 5) * 100;
    let colorBarrita = "";

    if (fortaleza.texto === "Muy débil") colorBarrita = "bg-red-400";
    if (fortaleza.texto === "Débil") colorBarrita = "bg-orange-400";
    if (fortaleza.texto === "Media") colorBarrita = "bg-yellow-400";
    if (fortaleza.texto === "Fuerte") colorBarrita = "bg-green-400";


    return (
        <form className="bg-[#1e2435]  rounded-xl p-4">

            <div className="flex justify-between mb-2 ">
                <label className="text-lg uppercase tracking-widest font-semibold"> Longitud</label>
                <p className="text-lg text-white bg-amber-200/50 border-amber-100 rounded-sm p-2">
                        {longitud}
                </p>
            </div>

            <div>
                <input 
                    type = "range" 
                    min = "1"
                    max = "20"
                    value={longitud}
                    onChange={(e) => setLongitud (e.target.value)}
                    className="w-full h-1 accent-amber-100 cursor-pointer mb-4 appearance-none bg-amber-200 rounded-xs "
                    />
            </div>

            <div  className="bg-[#1e2435] grid grid-cols-2 gap-4 mt-2 leading-tight ">
                <label htmlFor="minusculas"
                    className= {`rounded-sm p-3 flex items-center gap-3 cursor-pointer border
                        ${minusculas? "bg-gray-700 border-amber-100 " : "bg-[#1e2435] border-white "}`}   
                >
                    <input 
                        type="checkbox" 
                        name="minusculas"
                        id="minusculas"
                        checked= {minusculas}
                        onChange={()=> setMinusculas(!minusculas)}
                        className="peer sr-only"
                    />

                    <span className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center font-bold ${minusculas? "bg-amber-200/40 border-amber-100 text-white" : "bg-[#1e2435] border-white text-gray-200"}`}>
                            {minusculas && "✓"}
                    </span>
                    
                    <div className="flex flex-col text-gray-300">
                        <span>Minúsculas</span>
                        <span >a-z</span>
                    </div>
                    
                    
                </label>    

                <label htmlFor="mayusculas"
                    className= {`rounded-sm p-3 flex items-center gap-3 cursor-pointer border
                        ${mayusculas? "bg-gray-700 border-amber-100 " : "bg-[#1e2435] border-white "}`}   
                >
                    <input 
                        type="checkbox" 
                        name="mayusculas"
                        id="mayusculas"
                        checked= {mayusculas}
                        onChange={()=> setMayusculas(!mayusculas)}
                        className="peer sr-only"
                    />

                    <span className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center font-bold ${mayusculas? "bg-amber-200/40 border-amber-100 text-white" : "bg-[#1e2435] border-white text-gray-200"}`}>
                            {mayusculas && "✓"}
                    </span>
                    
                    <div className="flex flex-col text-gray-300">
                        <span>Mayúsculas</span>
                        <span className=" uppercase ">a-z</span>
                    </div>
                    
                    
                </label>  

                 <label htmlFor="numeros"
                    className= {`rounded-sm p-3 flex items-center gap-3 cursor-pointer border
                        ${numeros? "bg-gray-700 border-amber-100 " : "bg-[#1e2435] border-white "}`}   
                >
                    <input 
                        type="checkbox" 
                        name="numeros"
                        id="numeros"
                        checked= {numeros}
                        onChange={()=> setNumeros(!numeros)}
                        className="peer sr-only"
                    />

                    <span className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center font-bold ${numeros? "bg-amber-200/40 border-amber-100 text-white" : "bg-[#1e2435] border-white text-gray-200"}`}>
                            {numeros && "✓"}
                    </span>
                    
                    <div className="flex flex-col text-gray-300">
                        <span>Numeros</span>
                        <span >0-9</span>
                    </div>
                    
                </label> 

                <label htmlFor="simbolos"
                    className= {`rounded-sm p-3 flex items-center gap-3 cursor-pointer border
                        ${simbolos? "bg-gray-700 border-amber-100 " : "bg-[#1e2435] border-white "}`}   
                >
                    <input 
                        type="checkbox" 
                        name="simbolos"
                        id="simbolos"
                        checked= {simbolos}
                        onChange={()=> setSimbolos(!simbolos)}
                        className="peer sr-only"
                    />

                    <span className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center font-bold ${simbolos? "bg-amber-200/40 border-amber-100 text-white" : "bg-[#1e2435] border-white text-gray-200"}`}>
                            {simbolos && "✓"}
                    </span>
                    
                    <div className="flex flex-col text-gray-300">
                        <span>Simbolos</span>
                        <span>#$%!</span>
                    </div>
                    
                </label> 

            </div>

            <button 
                type="button"
                className="w-full flex bg-gray-700 text-amber-200 font-bold text-center rounded-sm p-2  gap-2 cursor-pointer tracking-wider justify-center mt-3 hover:bg-amber-300/40 hover:text-black "
                onClick={generarPassword}
                aria-label="Generar contraseña">
                        <RotateCcw/> Generar

            </button>

            <div className="flex justify-between gap-2 mt-4 items-center">
                <label htmlFor="fortaleza"> Fortaleza </label>
                    <div className="flex gap-2 flex-1 items-center">
                        <div className={`h-2 rounded flex-1 ${fortaleza.puntos >= 1 ? "bg-red-600": "bg-gray-700"}`}></div>
                        <div className={`h-2 rounded flex-1 ${fortaleza.puntos >= 2 ? "bg-orange-400": "bg-gray-700"}`}></div>
                        <div className={`h-2 rounded flex-1 ${fortaleza.puntos >= 3 ? "bg-yellow-400 ": "bg-gray-700"}`}></div>
                        <div className={`h-2 rounded flex-1 ${fortaleza.puntos >= 4 ? "bg-green-400": "bg-gray-700"}`}></div>
            </div> 

            </div>




        </form>
    )

}

export default Formulario