//Variables
//Simulamos respuesta de una base de datos con los productos.
const productos = [
  {
    id: 1,
    img: "img/6-diseños-alma/diseño-alma1.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.25,
  },
  {
    id: 2,
    img: "img/6-diseños-alma/diseño-alma2.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.0,
  },
  {
    id: 3,
    img: "img/6-diseños-alma/diseño-alma7.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.0,
  },
  {
    id: 4,
    img: "img/6-diseños-alma/diseño-alma7.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.0,
  },
  {
    id: 5,
    img: "img/6-diseños-alma/diseño-alma5.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.0,
  },
  {
    id: 6,
    img: "img/6-diseños-alma/diseño-alma6.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.0,
  },
  {
    id: 7,
    img: "img/6-diseños-alma/diseño-alma3.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.0,
  },
  {
    id: 8,
    img: "img/6-diseños-alma/diseño-alma11.jpg",
    descripcion: "Vasito de Cristal",
    precio: 10.0,
  },
];

// Código a ejecutar después de que el DOM se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  const carritoItems = document.querySelector(".carrito-items");
  const carrito = document.querySelector(".carrito");
  const items = document.querySelector(".contenedor-items");

  //Funciones

  //Función para eliminar un item del carrito.
  function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    actualizarTotalCarrito();
    ocultarCarrito();
  }

  //Función que controla si hay elementos en el carrito. Si no hay, oculto el carrito.
  function ocultarCarrito() {
    if (carritoItems.childElementCount == 0) {
      carrito.style.marginRight = "-100%";
      carrito.style.opacity = "0";
      items.classList.remove("items-width");
    }
  }

  //Funcion que hace visible carrito
  function hacerVisibleCarrito() {
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1";
    items.classList.add("items-width");
  }

  //Cuando se pulsa el boton "+" se aumenta la cantidad del producto seleccionado
  function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;

    let cantidadActual = parseInt(
      selector.querySelector(".carrito-item-cantidad").value
    );
    const id =
      selector.parentElement.querySelector(".carrito-item-id").textContent;
    const itemSeleccionado = productos.find((producto) => producto.id == id);
    const { precio } = itemSeleccionado;

    cantidadActual++;
    selector.querySelector(".carrito-item-cantidad").value = cantidadActual;

    const precioActual = precio * cantidadActual;
    selector.parentElement.querySelector(".carrito-item-precio").textContent =
      precioActual.toFixed(2);

    actualizarTotalCarrito();
  }

  //Cuando se pulsa el boton "-" se reduce la cantidad del producto seleccionado
  function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = parseInt(
      selector.querySelector(".carrito-item-cantidad").value
    );
    const id =
      selector.parentElement.querySelector(".carrito-item-id").textContent;
    const itemSeleccionado = productos.find((producto) => producto.id == id);
    const { precio } = itemSeleccionado;
    cantidadActual--;
    if (cantidadActual >= 1) {
      selector.querySelector(".carrito-item-cantidad").value = cantidadActual;
      const precioActual = precio * cantidadActual;
      selector.parentElement.querySelector(".carrito-item-precio").textContent =
        precioActual.toFixed(2);
      actualizarTotalCarrito();
    }
  }

  //Función que hace scroll hasta el carrito en versión movil.
  function scrollToCart() {
    const carritoElement = document.querySelector("#carrito");
    carritoElement.scrollIntoView({ behavior: "smooth" });
  }

  //Función para comprobar que estamos en versión movil
  function isMobile() {
    return /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
  }

  //Funcion que captura el producto seleccionado.
  function addToCartClicked(event) {
    const buttonClicked = event.target;
    const item = buttonClicked.parentNode;
    const idElement = item.querySelector(".id-item");
    const id = idElement.textContent;
    const productoSeleccionado = productos.find((element) => element.id == id);

    agregarItemAlCarrito(productoSeleccionado);

    hacerVisibleCarrito();

    if (isMobile()) {
      scrollToCart();
    }
  }

  //Funcion que comprueba si un producto ya se ha añadido al carrito
  function checkIfItemExists(id) {
    const idsItemsCarrito = Array.from(
      carritoItems.querySelectorAll(".carrito-item-id")
    );
    const existe = idsItemsCarrito.find((itemId) => itemId.textContent == id);
    return existe;
  }

  //Funcion que agrega la info del producto seleccionado al carrito desde la base de datos
  function agregarItemAlCarrito(productoSeleccionado) {
    const { id, descripcion, precio, img } = productoSeleccionado;

    //Se comprueba que el producto añadido no exista en el carrito
    const itemYaAgregado = checkIfItemExists(id);
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
                <span class="carrito-item-precio">${Number.parseFloat(
                  precio
                ).toFixed(2)} €</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    const item = document.createElement("div");
    item.classList.add("item");
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
    let subTotal = 0;
    let descuento = 0;
    const carritoItems = document.querySelectorAll(".carrito-item");

    carritoItems.forEach((item) => {
      const precioElemento = Number.parseFloat(
        item.querySelector(".carrito-item-precio").textContent
      );
      subTotal += precioElemento;
      descuento += precioElemento * 0.1;
    });

    const gastosEnvio = 1.99;
    const totalConDescuento = subTotal - descuento;

    document.querySelector(".carrito-precio-subtotal").textContent =
      Number.parseFloat(subTotal).toFixed(2) + " €";
    document.querySelector(".carrito-precio-descuento").textContent =
      Number.parseFloat(descuento * -1).toFixed(2) + " €";
    document.querySelector(".carrito-precio-gastos").textContent =
      Number.parseFloat(gastosEnvio).toFixed(2) + " €";
    document.querySelector(".carrito-precio-total").textContent =
      Number.parseFloat(totalConDescuento + gastosEnvio).toFixed(2) + " €";
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

  //Inicio

  renderItems();
  funcionalidadBotonesCarrito();
});
