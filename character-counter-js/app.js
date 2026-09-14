const texto = document.querySelector("#texto");
const caracteres = document.querySelector("#caracteres");
const palabras = document.querySelector("#palabras");
const sinEspacios = document.querySelector("#sinEspacios");
const restantes = document.querySelector("#restantes");


const limite = 290;

function actualizar(){
    caracteres.textContent = texto.value.length;

    const t =texto.value.trim();
    if (t===""){
        palabras.textContent=0;
        
    }else{
        palabras.textContent=t.split(/\s+/).length;
    }

    sinEspacios.textContent = texto.value.replaceAll(" ", "").length;

    restantes.textContent = limite - texto.value.length;

    if(texto.value.length>limite){
        restantes.classList.add("excedido");
        restantes.parentElement.classList.add("excedido");
    }else{
        restantes.classList.remove("excedido");
        restantes.parentElement.classList.remove("excedido");
    }
}

texto.addEventListener("input" , actualizar);
