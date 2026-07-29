
// ===== PARTE A: array de valores simples =====
console.log("--- PARTE A ---");
const categorias =["terror", "comedia", "suspenso", "accion"];
// mostrar el array completo y su cantidad de elementos
console.log(`Cantidad de categorias: ${categorias.length}`);

// mostrar el primer elemento y el último (a partir de .length)
console.log(`Primer categoria: ${categorias[0]}`);
console.log(`Ultima categoria: ${categorias[categorias.length -1]}`);

//  incorporar un elemento con .push()
categorias.push("drama");
console.log(`Cantidad de categorias: ${categorias.length}`);

//  eliminar el último con .pop() y guardar el valor devuelto
let eliminado = categorias.pop();
console.log(`categoria eliminada: ${eliminado}`);


// ===== PARTE B: objeto =====
console.log("--- PARTE B ---");
let usuario = {
nombre: "Juan Perez",
edad: 22,
ciudad: "Posadas",
temaFavorito: "peliculas"
};
//  construir y mostrar una frase con las propiedades del objeto
console.log(`NOMBRE: ${usuario.nombre} - EDAD ${usuario.años} - CIUDAD: ${usuario.ciudad} - TEMA FAVORITO: ${usuario.temaFavorito}`);

//  modificar una propiedad existente
usuario.temaFavorito = "series";
console.log(`Tema favorito actualizado: ${usuario.temaFavorito}`);
//  incorporar una propiedad nueva
usuario.provincia = "Misiones";
console.log(usuario);


// ===== PARTE C: array de objetos =====
console.log("--- PARTE C ---");
let catalogo = [
{ titulo: "Matrix", categoria: "accion", puntaje: 8, visto: false },
{ titulo: "Scarface", categoria: "accion", puntaje: 8, visto: true },
{ titulo: "Toy Story", categoria: "infantil", puntaje: 6, visto: true },
{ titulo: "Scary Movie", categoria: "comedia", puntaje: 9, visto: false }
// Completar hasta alcanzar un mínimo de cuatro elementos
];
//  acceso por índice
console.log(`Titulo del primer elemento: ${catalogo[0].titulo}. Puntaje del tercer elemento: ${catalogo[2].puntaje}`);

//  línea descriptiva del segundo elemento
let estado = catalogo[1].visto ? "visto" : "pendiente";
console.log(`${catalogo[1].titulo} - ${catalogo[1].categoria} - ${catalogo[1].puntaje}/10 - ${estado}`);

// modificar un puntaje
catalogo[2].puntaje = 8;
console.log(`puntaje elemento 3 actualizado: ${catalogo[2].puntaje} `);

//  incorporar un quinto elemento con .push()
catalogo.push({ titulo: "Toy Story 2", categoria: "infantil", puntaje: 2, visto: true },);
console.log(`Cantidad de elementos ${catalogo.length}`);

// ===== PARTE D: destructuring =====
console.log("--- PARTE D ---");
//  destructuring de objeto sobre catalogo[0]
let {titulo, categoria, puntaje, visto} = catalogo[0];
let estadoD = visto ? "visto" : "pendiente";
console.log(` ${titulo} - ${categoria} - ${puntaje} - ${estadoD}`);

//  destructuring de objeto sobre usuario
let {nombre, ciudad} = usuario;
console.log(`Nombre: ${nombre} - Ciudad: ${ciudad}`);

//  destructuring de array para primero y segundo
let [primero, segundo] = catalogo;
console.log(`Primero: ${primero.titulo}`);
console.log(`Segundo: ${segundo.titulo}`);

// ===== PARTE E: complementaria =====

// Extraer la propiedad titulo mediante renombrado en el destructuring.
let { titulo: tituloDestacado } = catalogo[2];
console.log(`Titulo destacado: ${tituloDestacado}`);

// Extraer una propiedad inexistente del objeto
let { profesion = "sin datos" } = usuario;
console.log(`Profesion: ${profesion}`);

// Intercambiar el contenido de dos variables
let manzanas = 20;
let bananas = 10;
console.log(`Valores originales: manzanas: ${manzanas} - bananas: ${bananas}`);
[manzanas, bananas]=[bananas, manzanas] ;
console.log(`Valores intercambiados: manzanas: ${manzanas} - bananas: ${bananas}`);


