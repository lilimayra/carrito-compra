//Simulamos respuesta de una base de datos con los productos.
const productos = [
  {
    id: 1,
    img: "img/6-diseños-alma/diseño-alma1.jpg",
    descripcion: "Vasito de Cristal1",
    precio: 11.25,
  },
  {
    id: 2,
    img: "img/6-diseños-alma/diseño-alma2.jpg",
    descripcion: "Vasito de Cristal2",
    precio: 8.75,
  },
  {
    id: 3,
    img: "img/6-diseños-alma/diseño-alma3.jpg",
    descripcion: "Vasito de Cristal3",
    precio: 9.5,
  },
  {
    id: 4,
    img: "img/6-diseños-alma/diseño-alma4.jpg",
    descripcion: "Vasito de Cristal4",
    precio: 10.0,
  },
  {
    id: 5,
    img: "img/6-diseños-alma/diseño-alma5.jpg",
    descripcion: "Vasito de Cristal5",
    precio: 10.0,
  },
  {
    id: 6,
    img: "img/6-diseños-alma/diseño-alma6.jpg",
    descripcion: "Vasito de Cristal6",
    precio: 10.0,
  },
  {
    id: 7,
    img: "img/6-diseños-alma/diseño-alma7.jpg",
    descripcion: "Vasito de Cristal7",
    precio: 10.0,
  },
  {
    id: 8,
    img: "img/6-diseños-alma/diseño-alma8.jpg",
    descripcion: "Vasito de Cristal8",
    precio: 10.0,
  },
];

// Código a ejecutar después de que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  const carritoItems = document.querySelector(".carrito-items");
  const carrito = document.querySelector(".carrito");
  const items = document.querySelector(".contenedor-items");

  //Función para eliminar un item del carrito.
  function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente función controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
  }

  //Función que controla si hay elementos en el carrito. Si no hay, oculto el carrito.
  function ocultarCarrito() {
    if (carritoItems.childElementCount == 0) {
      carrito.style.marginRight = "-100%";
      carrito.style.opacity = "0";

      items.style.width = "100%";
    }
  }

  //Aumento en uno la cantidad del elemento seleccionado
  function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = selector.querySelector(".carrito-item-cantidad").value;
    cantidadActual++;
    selector.querySelector(".carrito-item-cantidad").value = cantidadActual;
    actualizarTotalCarrito();
  }

  //Resto en uno la cantidad del elemento seleccionado
  function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = selector.querySelector(".carrito-item-cantidad").value;
    cantidadActual--;
    if (cantidadActual >= 1) {
      selector.querySelector(".carrito-item-cantidad").value = cantidadActual;
      actualizarTotalCarrito();
    }
  }

  //Funcion que hace visible carrito
  function hacerVisibleCarrito() {
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1";

    items.style.width = "60%";
  }

  //Funcion que controla el boton clickado de agragar al carrito.
  function addToCartClicked(event) {
    const buttonClicked = event.target;
    const item = buttonClicked.parentNode;
    const idElement = item.querySelector(".id-item");
    const id = idElement.textContent;
    const productoSeleccionado = productos.find((element) => element.id == id);
    agregarItemAlCarrito(productoSeleccionado);
    hacerVisibleCarrito();
  }

  //Funcion que agrega un items al carrito
  function agregarItemAlCarrito({ id, descripcion, precio, img }) {
    const item = document.createElement("div");
    item.classList.add("item");

    //Controlamos que el items que se intenta añadir no se encuentre ya en el carrito.

    const idsItemsCarrito = Array.from(
      carritoItems.querySelectorAll(".carrito-item-id")
    );
    const itemYaAgregado = idsItemsCarrito.find(
      (itemId) => itemId.textContent == id
    );
    if (itemYaAgregado) {
      alert("El producto ya se encuentra en el carrito");
      return;
    }

    const itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${img}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-id" style="display:none">${id}</span>
                <span class="carrito-item-titulo">${descripcion}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    item.innerHTML = itemCarritoContenido;
    carritoItems.append(item);

    //Agregamos funcionalidad, eliminar al nuevo Item
    item
      .querySelector(".btn-eliminar")
      .addEventListener("click", eliminarItemCarrito);

    //Agregamos funcionalidad de restar al nuevo Item.
    item
      .querySelector(".restar-cantidad")
      .addEventListener("click", restarCantidad);

    //Agregamos funcionalidad de sumar al nuevo Item.
    item
      .querySelector(".sumar-cantidad")
      .addEventListener("click", sumarCantidad);

    //Actualizamos el total
    actualizarTotalCarrito();
  }

  function pagarClicked() {
    alert("Gracias por la compra");

    // Elimino todos los elementos del carrito utilizando el método innerHTML
    carritoItems.innerHTML = "";

    // Actualizo el total del carrito
    actualizarTotalCarrito();

    // Oculto el carrito
    ocultarCarrito();
  }

  //Actualizamos el total del carrito
  function actualizarTotalCarrito() {
    const carritoItems = document.querySelectorAll(".carrito-item");

    let total = 0;

    carritoItems.forEach((item) => {
      const precioElemento = item.querySelector(
        ".carrito-item-precio"
      ).textContent;
      const precio = Number.parseFloat(precioElemento).toFixed(2);

      const cantidadItem = item.querySelector(".carrito-item-cantidad");
      const cantidad = cantidadItem.value;
      total += precio * cantidad;
    });

    document.querySelector(".carrito-precio-total").textContent =
      Number.parseFloat(total).toFixed(2) + " €";
  }

  //Funcion para renderizar los productos de la base de datos.
  function renderItems() {
    const DOMitems = document.querySelector("#items");

    productos.forEach((producto) => {
      //Estructura Ficha
      const nodoItem = document.createElement("div");
      nodoItem.classList.add("item");

      //Imagen
      const nodoImagen = document.createElement("img");
      nodoImagen.classList.add("img-item");
      nodoImagen.src = producto.img;
      nodoImagen.alt = "producto";

      //Descripcion
      const nodoDescripcion = document.createElement("h3");
      nodoDescripcion.classList.add("titulo-item");
      nodoDescripcion.textContent = producto.descripcion;

      //id
      const nodoId = document.createElement("h5");
      nodoId.classList.add("id-item");
      nodoId.textContent = producto.id;

      //Precio
      const nodoPrecio = document.createElement("p");
      nodoPrecio.classList.add("precio-item");
      nodoPrecio.textContent = Number.parseFloat(producto.precio).toFixed(2);

      //Boton
      const nodoBoton = document.createElement("button");
      nodoBoton.classList.add("boton-item");
      nodoBoton.textContent = "Agregar al carrito";
      nodoBoton.dataset.identidad = producto.id;
      nodoBoton.addEventListener("click", addToCartClicked);

      //Insertar en el Dom
      nodoItem.appendChild(nodoImagen);
      nodoItem.appendChild(nodoId);
      nodoItem.appendChild(nodoDescripcion);
      nodoItem.appendChild(nodoPrecio);
      nodoItem.appendChild(nodoBoton);
      DOMitems.appendChild(nodoItem);
    });
  }

  //Funcionalidad Botones Carrito
  function funcionalidadBotonesCarrito() {
    // Funcionalidad botones eliminar
    const eliminarItemBtnList = document.querySelectorAll(".btn-eliminar");
    eliminarItemBtnList.forEach((btn) => {
      btn.addEventListener("click", eliminarItemCarrito);
    });

    // Funcionalidad botones sumar
    const sumarItemBtnList = document.querySelectorAll(".sumar-cantidad");
    sumarItemBtnList.forEach((btn) => {
      btn.addEventListener("click", sumarCantidad);
    });

    // Funcionalidad botones restar
    const restarItemBtnList = document.querySelectorAll(".restar-cantidad");
    restarItemBtnList.forEach((btn) => {
      btn.addEventListener("click", restarCantidad);
    });

    // Funcionalidad boton pagar
    document
      .querySelector(".btn-pagar")
      .addEventListener("click", pagarClicked);
  }

  renderItems();
  funcionalidadBotonesCarrito();
});