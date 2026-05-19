let carrito = [];

let total = 0;

/* AGREGAR PRODUCTOS */

function agregarCarrito(nombre, precio){

carrito.push({
nombre,
precio
});

total += precio;

actualizarCarrito();

/* EFECTO BONITO */

const boton =
event.target;

boton.innerText = "✅ Agregado";

setTimeout(()=>{

boton.innerText = "Agregar";

},1000);

}

/* ACTUALIZAR CARRITO */

function actualizarCarrito(){

const lista =
document.getElementById("lista-carrito");

lista.innerHTML = "";

carrito.forEach((producto,index)=>{

lista.innerHTML += `

<div class="item">

<strong>
${producto.nombre}
</strong>

<p>
$${producto.precio}
</p>

<button onclick="eliminarProducto(${index})">

Eliminar

</button>

</div>

`;

});

document.getElementById("contador").innerText = carrito.length;
innerText = carrito.length;

document.getElementById("total")
.innerText = total.toLocaleString();

}

/* ELIMINAR */

function eliminarProducto(index){

total -= carrito[index].precio;

carrito.splice(index,1);

actualizarCarrito();

}

/* ABRIR CARRITO */

function abrirCarrito(){

document.getElementById("carrito")
.classList.toggle("activo");

}

/* FINALIZAR */

function finalizarCompra(){

if(carrito.length === 0){

alert("⚠️ El carrito está vacío");

return;

}

document.getElementById("popup")
.hidden = false;

}

/* CERRAR POPUP */

function cerrarPopup(){

document.getElementById("popup")
.hidden = true;

}

/* ENVIAR WHATSAPP */

function enviarWhatsapp(){

const nombre =
document.getElementById("nombreCliente")
.value;

const direccion =
document.getElementById("direccionEntrega")
.value;

const nota =
document.getElementById("notaPedido")
.value;

/* VALIDACION */

if(nombre.trim() === ""){

alert("⚠️ Escribe tu nombre");

return;

}

if(direccion.trim() === ""){

alert("⚠️ Escribe la dirección");

return;

}

/* PRODUCTOS */

let productos = "";

carrito.forEach(producto=>{

productos +=
`• ${producto.nombre} - $${producto.precio}\n`;

});

/* MENSAJE */

const mensaje =

`🍬 *PEDIDO GOMITAS ENCHILADAS* 🍬

👤 *Cliente:*
${nombre}

📍 *Dirección:*
${direccion}

📝 *Nota:*
${nota}

🛒 *Productos:*
${productos}

💰 *Total:*
$${total.toLocaleString()}

✅ Pedido realizado correctamente`;

/* NUMERO */

const numero = "573013568036";

/* URL */

const url =

`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

window.open(url,"_blank");

/* MENSAJE FINAL */

alert("🔥 Pedido enviado correctamente");

/* LIMPIAR */

carrito = [];

total = 0;

actualizarCarrito();

cerrarPopup();

}

/* CERRAR CARRITO SI HUNDEN AFUERA */

window.addEventListener("click",(e)=>{

const carritoBox =
document.getElementById("carrito");

const boton =
document.querySelector(".boton-carrito");

if(
!carritoBox.contains(e.target)
&&
!boton.contains(e.target)
){

carritoBox.classList.remove("activo");

}

});