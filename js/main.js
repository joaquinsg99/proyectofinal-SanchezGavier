//productos
let productos = [];
fetch("./js/productos.json") 
.then(response => response.json())
.then(data => {
  productos = data; 
  cargarProductos(productos);
})

//elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".artista-agregar");
const numerito = document.querySelector("#numerito");


//cargando los productos desde JS
function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML= "";
  
   productosElegidos.forEach(producto => {
       const div = document.createElement("div"); 
       div.classList.add("artista");
       div.innerHTML = `
       <img class="artista-imagen" src="${producto.imagen}" alt="${producto.titulo}">
       <div class="artista-detalles">
           <h3 class="artista-titulo">${producto.titulo} </h3>
           <p class="artista-precio">$${producto.precio}</p>
           <button class="artista-agregar" id="${producto.id}">agregar</button>
       </div>
       `;
       contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
 
};



// agrergando funciones de filtro a los botones de la navbar
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
          const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
          tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;
          const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
        } else {
          tituloPrincipal.innerHTML = "Todos los productos";
          cargarProductos(productos);
        }
    })
});

//botonesAgregar

function actualizarBotonesAgregar() {
 botonesAgregar = document.querySelectorAll(".artista-agregar");

 botonesAgregar.forEach(boton => {
  boton.addEventListener("click", agregaAlCarrito )
 })
};
// array de carrito vacio
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito()
} else {
productosEnCarrito = [];
};




//funcion para agregar al carrito
function agregaAlCarrito(e) {

const idBoton = e.currentTarget.id;

const productoAgregado = productos.find(producto => producto.id === idBoton);
if (productosEnCarrito.some(producto => producto.id === idBoton)) {
const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
productosEnCarrito[index].cantidad++;

} else {
  productoAgregado.cantidad = 1;
  productosEnCarrito.push(productoAgregado); 
} 
actualizarNumerito();

 localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

};
// funcion para actualizar el numero al lado del icono del carito
function actualizarNumerito(){
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerHTML= nuevoNumerito;
};