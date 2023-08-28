class Productos {
  constructor(objeto) {
      this.nombre = objeto.nombre;
      this.precio = objeto.precio;
      this.id = objeto.id;
      this.imagen = objeto.imagen
  }
}

const productosData = [
  {
    nombre: "Shampoo Arcilla",
    precio: 1200,
    id: 1,
    imagen: "../img/cabello/sh-arcilla.jpg"
  },
  {
    nombre: "Shampoo carbon activado",
    precio: 1300,
    id: 2,
    imagen: "../img/cabello/sh-carbon.jpg"
  },
  {
    nombre: "Shampoo avena",
    precio: 1200,
    id: 3,
    imagen: "../img/cabello/sh-avena.jpg"
  },
  {
    nombre: "Shampoo ortiga",
    precio: 1200,
    id: 4,
    imagen: "../img/cabello/sh-ortiga.JPG"
  },
  {
    nombre: "Acondicionador sólido",
    precio: 1400,
    id: 5,
    imagen: "../img/cabello/ac-solido.jpg"
  },
  {
    nombre: "Acondicionador en emulsión",
    precio: 1400,
    id: 6,
    imagen: "../img/cabello/ac-emulsión.jpg"
  },
  {
    nombre: "Jabones de Castilla",
    precio: 1000,
    id: 7,
    imagen: "../img/cuerpo/jabones-1.JPG"
  },
  {
    nombre: "Crema para manos y cuerpo",
    precio: 1200,
    id: 8,
    imagen: "../img/cuerpo/crema-myc.jpg"
  },
  {
    nombre: "Bálsamo labial",
    precio: 800,
    id: 9,
    imagen: "../img/cuerpo/balsamo.jpg"
  },
  {
    nombre: "Roll-on labial",
    precio: 800,
    id: 10,
    imagen: "../img/cuerpo/roll-on.jpg"
  },
  {
    nombre: "Sanitizantes",
    precio: 1000,
    id: 11,
    imagen: "../img/cuerpo/sanitizantes.jpg"
  },
  {
    nombre: "Jaboneras de madera",
    precio: 1200,
    id: 12,
    imagen: "../img/cuerpo/jaboneras.jpg"
  }
];

const Carrito = {
  lista: [],
  total: 0,
};

function AgregarItem(producto) {
  Carrito.lista.push(producto);
  Carrito.total += producto.precio;
  localStorage.setItem("carrito", JSON.stringify(Carrito));
  return Carrito;
}

function EliminarItem(index) {
  if (index >= 0 && index < Carrito.lista.length) {
      const productoEliminado = Carrito.lista.splice(index, 1)[0];
      Carrito.total -= productoEliminado.precio;
      mostrarCarritoEnDOM();
  }
}

function mostrarCarritoEnDOM() {
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = ""; // Limpiar el contenido previo

  if (Carrito.lista.length === 0) {
      carritoContainer.textContent = "El carrito de compras está vacío.";
  } else {
      const ul = document.createElement("ul");

      Carrito.lista.forEach((producto, index) => {
          const li = document.createElement("li");
          li.style.display = "flex"; // Establecer el display flex
          li.style.justifyContent = "space-between"; // Establecer el espacio entre elementos
          li.style.alignItems = "center"; // Alinear elementos verticalmente
          li.style.margin= "10px";

          const imagenMiniatura = document.createElement("img");
          imagenMiniatura.src = producto.imagen;
          imagenMiniatura.width = 60; // Ancho de 100px
          imagenMiniatura.height = 40; // Alto de 50px

          const nombreProducto = document.createElement("span");
          nombreProducto.textContent = producto.nombre;

          const eliminarButton = document.createElement("button");
          eliminarButton.textContent = "Eliminar del carrito";
          eliminarButton.addEventListener("click", () => EliminarItem(index));

          li.appendChild(imagenMiniatura);
          li.appendChild(nombreProducto);
          li.appendChild(eliminarButton);

          ul.appendChild(li);
      });

      const totalElement = document.createElement("p");
      totalElement.textContent = `Total: $${Carrito.total}`;
      carritoContainer.appendChild(ul);
      carritoContainer.appendChild(totalElement);
  }
}

function agregarAlCarrito(producto) {
  AgregarItem(producto);
  mostrarCarritoEnDOM();
}

function vaciarCarrito() {
  Carrito.lista = [];
  Carrito.total = 0;
  localStorage.setItem("carrito", JSON.stringify(Carrito));
  mostrarCarritoEnDOM();
}

window.onload = () => {
  const contenedorItems = document.getElementById("contenedor-items");

  productosData.forEach(productoData => {
      const producto = new Productos(productoData);

      const item = document.createElement("div");
      item.classList.add("item");

      const tituloItem = document.createElement("span");
      tituloItem.classList.add("titulo-item");
      tituloItem.textContent = producto.nombre;

      const imgItem = document.createElement("img");
      imgItem.classList.add("img-item");
      imgItem.src = producto.imagen; // Agrega la propiedad imagen a tus datos de producto
      imgItem.alt = `imágen de ${producto.nombre}`;

      const precioItem = document.createElement("span");
      precioItem.textContent = `Precio: $${producto.precio}`;

      const botonItem = document.createElement("button");
      botonItem.classList.add("boton-item");
      botonItem.textContent = "Agregar al Carrito";
      botonItem.addEventListener("click", () => agregarAlCarrito(producto));

      item.appendChild(tituloItem);
      item.appendChild(imgItem);
      item.appendChild(precioItem);
      item.appendChild(botonItem);

      contenedorItems.appendChild(item);
  });

  const botonVaciarCarrito = document.createElement("button");
  botonVaciarCarrito.textContent = "Vaciar Carrito";
  botonVaciarCarrito.addEventListener("click", vaciarCarrito);

  const vaciarCarritoDiv = document.getElementById("vaciar-carrito");
  vaciarCarritoDiv.appendChild(botonVaciarCarrito);

  mostrarCarritoEnDOM();
};