// obtengo el modal
const modalCarrito = document.getElementById("miCarrito");
const cartIconContainer = document.createElement("div");
//obtengo el botón para cerrarlo
const btnCerrarCarrito = document.getElementById("botonCerrarCarrito");

// Obtengo el botón que abre el modal
const botonCarrito = document.getElementById("miBotonAbrirModal");
//Obtengo la tabla de detalles del carrito
const detalleCarrito = document.getElementById("modal-table");
const detalleBody = document.getElementById("detallesTbody");
const footerCarrito = document.getElementsByClassName("myModal-footer")[0];

btnCerrarCarrito.addEventListener("click", () => {
  modalCarrito.style.display = "none";
});

// Cuando el usuario hace clic fuera del model, se cierra también
window.onclick = function (event) {
  if (event.target == modalCarrito) {
    modalCarrito.style.display = "none";
  }
};
function noHayProductos() {
    detalleBody.innerHTML = ""; //limpio para que no me repita el mensaje
    let fila = document.createElement("tr");
    fila.id = "celdaMensajeCarritoVacio";
    fila.innerHTML = `<td class="text-center" colspan="6"><p class="text-danger fs-3 fw-bold">Carrito vacío</p></td>`;
    detalleBody.appendChild(fila);
    esconderFooter();
}
function hayProductos() {
    /* let footerCarrito=document.getElementsByClassName('modal-footer')[0]; */
    footerCarrito.style.display = "flex";
}
function quitarMensajeCarritoVacio(child) {
    detalleBody.removeChild(child);
}
function esconderFooter() {
    footerCarrito.style.display = "none";
}

/* function para recuperar el carrito de compras */
function recuperarCarrito() {
    let leerLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    //contadorCarrito.innerText="0";
    //    console.log(contadorCarrito);

    if (leerLocalStorage) {
        leerLocalStorage.forEach((cd) => {
        //agregarAlCarrito(cd.id)
        agregarAlCarritoDesdeLocal(cd.id, cd.cantidad);
        //agregarAlCarrito(cd.id, cd.cantidad);
        });
    }
}

function agregarAlCarritoDesdeLocal(idCd, cantidad) {
    console.log(idCd);
    console.log(cdsDisqueria);
    let cdComprar = cdsDisqueria.find((elemento) => elemento.id == idCd);
    console.log(cdComprar);
    cdComprar.cantidad = cantidad;
    carritoDeCompras.push(cdComprar);
    actualizarCarritoDeCompras();
    agregarHtmlCarrito(cdComprar);
    }

/* funcion para agregar desde el index */
function agregarAlCarritoDesdeIndex(idCd) {
    let cdRepetido = buscarRepetido(idCd);
    let inputCantidad = 1;
    if (cdRepetido) {
        let { precio, stock, id } = cdRepetido; //desestructurando el obj Cd

        if (inputCantidad > 0 && inputCantidad <= stock) {
        cdRepetido.cantidad += inputCantidad;

        //document.getElementById(`cantidad${id}`).innerHTML = `<td id="cantidad${id}">${cdRepetido.cantidad}</td>`
        document.getElementById(`input${id}`).value = cdRepetido.cantidad;
        document.getElementById(
            `subtotal${id}`
        ).innerHTML = `<td id="subtotal${id}">${
            cdRepetido.cantidad * precio
        }</td>`;
        actualizarCarritoDeCompras();

        Toastify({
            text: "CD agregado al carrito",
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}, // Callback after click
        }).showToast();
        } else {
        Swal.fire({
            title: "Error!",
            text: "Cantidad de compra no válida o superior al stock. Favor de verificar la cantidad ingresada",
            icon: "error",
            confirmButtonText: "OK",
        });
        }

        localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    } else {
        let cdComprar = cdsDisqueria.find((elemento) => elemento.id == idCd);
        let { stock, id } = cdComprar; //desestructurando el obj Cd

        if (inputCantidad > 0 && inputCantidad <= stock) {
        cdComprar.cantidad = inputCantidad;
        carritoDeCompras.push(cdComprar);
        actualizarCarritoDeCompras();
        agregarHtmlCarrito(cdComprar);

        Toastify({
            text: "CD agregado al carrito",
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}, // Callback after click
        }).showToast();
        } else {
        Swal.fire({
            title: "Error!",
            text: "Cantidad de compra no válida o superior al stock. Favor de verificar la cantidad ingresada",
            icon: "error",
            confirmButtonText: "OK",
        });
        }
    }
}

function agregarAlCarrito(idCd) {
    let cdRepetido = buscarRepetido(idCd);
    let inputCantidad = 0;
    console.log(carritoDeCompras);

    if (cdRepetido) {
        let { precio, stock, id } = cdRepetido; //desestructurando el obj Cd

        //inputCantidad=parseInt(document.getElementById(`inputCantidad${id}`).value);
        inputCantidad = parseInt(
        document.querySelector(`[data-id='inputCantidad${id}']`).value
        );

        if (inputCantidad > 0 && inputCantidad <= stock) {
        cdRepetido.cantidad += inputCantidad;

        //document.getElementById(`cantidad${id}`).innerHTML = `<td id="cantidad${id}">${cdRepetido.cantidad}</td>`
        document.getElementById(`input${id}`).value = cdRepetido.cantidad;
        document.getElementById(
            `subtotal${id}`
        ).innerHTML = `<td id="subtotal${id}">${
            cdRepetido.cantidad * precio
        }</td>`;
        actualizarCarritoDeCompras();
        showCartIcon();

        Toastify({
            text: "CD agregado al carrito",
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}, // Callback after click
        }).showToast();
        } else {
        Swal.fire({
            title: "Error!",
            text: "Cantidad de compra no válida o superior al stock. Favor de verificar la cantidad ingresada",
            icon: "error",
            confirmButtonText: "OK",
        });
        }
        document.getElementById(`inputCantidad${id}`).value = 1;
        localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    } else {
        let cdComprar = cdsDisqueria.find((elemento) => elemento.id == idCd);
        let { stock, id } = cdComprar; //desestructurando el obj Cd
        console.log(id);
        //inputCantidad=parseInt(document.getElementById(`inputCantidad${id}`).value);
        inputCantidad = parseInt(
        document.querySelector(`[data-id='inputCantidad${id}']`).value
        );

        if (inputCantidad > 0 && inputCantidad <= stock) {
            cdComprar.cantidad = inputCantidad;
            carritoDeCompras.push(cdComprar);
            actualizarCarritoDeCompras();
            agregarHtmlCarrito(cdComprar);
            showCartIcon();
            Toastify({
                text: "CD agregado al carrito",
                duration: 1500,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: false,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function () {}, // Callback after click
            }).showToast();
            } else {
            Swal.fire({
                title: "Error!",
                text: "Cantidad de compra no válida o superior al stock. Favor de verificar la cantidad ingresada",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        /* document.getElementById(`inputCantidad${id}`).value = 1; */
    }
}

/* fin funcion para agregar al carrito */

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
    });
/* funcion para agregar al html del carrito */
function agregarHtmlCarrito(cd) {
  /*my new way */
    let valorAnterior = 0;
    let { nombre, imagen, precio, id } = cd; //desestructurando el obj Cd
    let fila = document.createElement("tr");
    fila.id = `row${id}`;
    fila.innerHTML = `<td ><img src="${imagen}" alt="${nombre}" width="20%"/></td>
                        <td >${nombre}</td>
                        <td >${precio}</td>
                        <td>
                            <input id="input${id}" type="number" value="${
        cd.cantidad
    }" min="1" max="${cd.stock}" style="width:3rem" >
                        </td>
                        <td  id="subtotal${id}">${cd.cantidad * precio}</td>
                        <td ><button id="btnEliminar${id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button></td>`;

    let filaMensaje = document.getElementById("celdaMensajeCarritoVacio");
    filaMensaje && quitarMensajeCarritoVacio(filaMensaje); //Quito el mensaje de carrito vacío
    detalleBody.appendChild(fila);

    let inputDelCarrito = document.getElementById(`input${id}`);
    inputDelCarrito.addEventListener("focus", () => {
        valorAnterior = inputDelCarrito.value;
    });
    inputDelCarrito.addEventListener("change", () => {
        cd.cantidad = parseInt(inputDelCarrito.value); //tomo el valor del input del carrito

        document.getElementById(
        `subtotal${id}`
        ).innerHTML = `<td id="subtotal${id}">${cd.cantidad * precio}</td>`; //actualizo el sub

        actualizarCarritoDeCompras();
        showCartIcon();
        localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    });

    let botonEliminar = document.getElementById(`btnEliminar${id}`); //obtengo el boton

    /* Agrego escucha del evento click al boton */
    botonEliminar.addEventListener("click", () => {
        swalWithBootstrapButtons
        .fire({
            title: "Está seguro?",
            text: "No podrá deshacer el cambio!!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, borralo!",
            cancelButtonText: "No, cancelá!",
            reverseButtons: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
            let contenedor = document.getElementById("detallesTbody"); //ubico al contenedor padre
            let row = document.getElementById(`row${id}`); //al hijo
            contenedor.removeChild(row); //quito el hijo

            carritoDeCompras = carritoDeCompras.filter((item) => item.id != id); //actualizo el array carrito

            carritoDeCompras.length == 0 && noHayProductos();
            actualizarCarritoDeCompras(); //
            showCartIcon();
            localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
            swalWithBootstrapButtons.fire(
                "Borrado!",
                "Item quitado del carrito.",
                "success"
            );
            } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "Todo sigue igual!!! :)",
                "error"
            );
            }
        });
    });

    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}
/* fin funcion agregar al html del carrito */

/* function para agregar la funcionalidad a los botones */
function detectarBotonesIndex(cdsDisqueria) {
    const botones = document.querySelectorAll(".botonAzul");

    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
        // console.log(btn.dataset.id)
        agregarAlCarritoDesdeIndex(parseInt(btn.dataset.id), 1);
        showCartIcon();
        });
    });
}

function detectarBotonesDisqueria(cdsDisqueria) {
    const botones = document.querySelectorAll(".botonAzul");

    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
        // console.log(btn.dataset.id)
        agregarAlCarrito(parseInt(btn.dataset.id));
        showCartIcon();
        });
    });
}

/*funcion para buscar repetido en carrito */
function buscarRepetido(id) {
    return carritoDeCompras.find((elemento) => elemento.id == id);
}

/* funcion para actualizar carrito */
function actualizarCarritoDeCompras() {
    cantidadProductos = carritoDeCompras.reduce(
        (acc, cd) => acc + cd.cantidad,0);
    //contadorCarrito.innerText = carritoDeCompras.reduce((acc,cd)=> acc +cd.cantidad , 0);
    totalCarrito.innerText = carritoDeCompras.reduce((acc, cd) => acc + cd.precio * cd.cantidad,0);
}

/* fin funcion para actualizar carrito */
function showCartIcon() {
    // The cart only will show if cart´s length is higher than 0
    if (carritoDeCompras.length > 0) {
        cartIconContainer.innerHTML = `<a><i class="fa-solid fa-basket-shopping"></i>
            <div class="indicador-carrito">${cantidadProductos}</div></a>`;
        cartIconContainer.classList.add("fadeIn");

        document.body.append(cartIconContainer);
        cartIconContainer.classList.add("xxx");
    } else {
        // Hidden modal cart & cart icon
        cartIconContainer.classList.remove("fadeIn");
        //modalCart.classList.add("hidden");
    }
}
cartIconContainer.addEventListener("click", () => {
    modalCarrito.style.display = "block";
    carritoDeCompras.length == 0 ? noHayProductos() : hayProductos(); //cuando no hay productos
});
