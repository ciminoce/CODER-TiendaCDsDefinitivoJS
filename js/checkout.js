let cdsDisqueria=[];
let carritoDeCompras=[];
/* Contenedores */

/* const contenedorCarrito = document.getElementsByClassName('modal-body')[0];

/* Cosas del carrito */
/* const contadorCarrito = document.getElementById('contadorCarrito'); */ 
//let totalCarrito = 0;

const detalle=document.getElementById('detallesTbody'); 
const footer=document.getElementsByClassName('footer')[0];
const totalCarrito=document.getElementById('totalCarrito');
footer.classList.add('footerAlFinal')

/* funcion para agregar al html del carrito */
function mostrarCarrito(){
    carritoDeCompras.forEach(item=>{
    

        console.log(item);

        let {nombre, imagen, precio, stock, id}=item;//desestructurando el obj Cd
        let fila=document.createElement('tr');
        fila.id=`row${id}`;
        fila.innerHTML=`<td><img src="${imagen}" alt="${nombre}" width="40%"/></td>
                        <td>${nombre}</td>
                        <td>${precio}</td>
                        <td>
                            <input id="input${id}" type="number" value="${item.cantidad}" min="1" max="${stock}" style="width:3rem" >
                        </td>
                        <td id="subtotal${id}">${item.cantidad*precio}</td>
                        <td ><button id="btnEliminar${id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button></td>`;
                        
        /* let filaMensaje=document.getElementById('celdaMensajeCarritoVacio')
        filaMensaje && quitarMensajeCarritoVacio(filaMensaje); //Quito el mensaje de carrito vacío */
        detalle.appendChild(fila);
        let inputDelCarrito=document.getElementById(`input${id}`);
        inputDelCarrito.addEventListener('focus',()=>{
            valorAnterior=inputDelCarrito.value;
        });
        inputDelCarrito.addEventListener('change',()=>{
            item.cantidad=parseInt(inputDelCarrito.value);//tomo el valor del input del carrito

            document.getElementById(`subtotal${id}`).innerHTML = `<td id="subtotal${id}">${item.cantidad*precio}</td>`;//actualizo el sub
            //valorAnterior<inputDelCarrito.value?actualizarStock(item,true,1):actualizarStock(item,false,1);
            totalCarrito=totalizarCarrito();
            document.getElementById(`totalFinal`).innerHTML=`<td id="totalFinal"><strong>${totalCarrito}</strong> </td> <td></td>`;

            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
        }) 
    
        /*Agrego escucha del evento click al boton */
        let botonEliminar = document.getElementById(`btnEliminar${id}`);//obtengo el boton
        
        /* Agrego escucha del evento click al boton */
        botonEliminar.addEventListener('click',()=>{
            Swal.fire({
                title: 'Está seguro?',
                text: "No podrá deshacer el cambio!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText:'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borralo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    
                        let contenedor=document.getElementById('detallesTbody');//ubico al contenedor padre
                        let row=document.getElementById(`row${id}`);//al hijo
                        contenedor.removeChild(row); //quito el hijo
                        //actualizarStock(item,false,item.cantidad);//Actualizo el stock
                        carritoDeCompras = carritoDeCompras.filter(item => item.id != id);//actualizo el array carrito
                        console.log(carritoDeCompras);//ver el carrito
                        totalCarrito=totalizarCarrito();
                        document.getElementById(`totalFinal`).innerHTML=`<td id="totalFinal"><strong>${totalCarrito}</strong> </td> <td></td>`;
                        carritoDeCompras.length==0 && noHayProductos()
                        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));    
                    }
                    
                    

                    Swal.fire(
                    'Borrado!',
                    'Producto quitado del carrito.',
                    'success'
                    );
                }
            );
            
        });

    });
    totalCarrito=totalizarCarrito();
    let fila=document.createElement('tr');
        fila.id=`rowTotal`;
        fila.innerHTML=`<td></td>
                        <td></td>
                        <td></td>
                        <td><strong><span>Total: $</span></strong></td>
                        <td id="totalFinal"><strong>${totalCarrito}</strong> </td> <td></td>`;
    detalle.appendChild(fila);

    
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
}
/* fin funcion  */



/* funcion que retorna el total del carrito */
function totalizarCarrito(){
    totalCarrito=carritoDeCompras.reduce((acc,cd)=> acc + (cd.precio * cd.cantidad), 0);
    let fila=document.createElement('tr');
        fila.id=`rowTotal`;
        fila.innerHTML=`<td></td>
                        <td></td>
                        <td></td>
                        <td><strong><span>Total: $</span></strong></td>
                        <td id="totalFinal"><strong>${totalCarrito}</strong> </td> <td></td>`;
    detalle.appendChild(fila);
    //contadorCarrito.innerText = carritoDeCompras.reduce((acc,cd)=> acc +cd.cantidad , 0);
    
}


/* function noHayProductos(){
    detalleCarrito.innerHTML="";//limpio para que no me repita el mensaje
    let fila=document.createElement('tr');
    fila.id="celdaMensajeCarritoVacio";
    fila.innerHTML=`<td class="text-center" colspan="6"><p class="text-danger fs-3 fw-bold">Carrito vacío</p></td>`
    detalleCarrito.appendChild(fila);
    
    manejarBotonFinalizar(false);
} */
function manejarBotonFinalizar(valorLogico){
    valorLogico?document.getElementById(`btnFinalizar`).removeAttribute('disabled'):
    document.getElementById('btnFinalizar').setAttribute('disabled',true);
}
async function cargarArrayCds() {
    const URL = "/js/datosCds.json";
    
        
    let respuesta = await fetch(URL);
    let datos = await respuesta.json();
    
    datos.forEach((elemento) => cdsDisqueria.push(elemento));
    //llamo a las funciones dentro de la función que me trae los datos
    console.log(cdsDisqueria);
    cdsDestacados=cdsDisqueria.filter(cd=>cd.esDestacado=='true');
    
    console.log(cdsDisqueria.length);
    
    recuperarCarrito(); //Recupero el carrito del localStorage
    showCartIcon();
    //totalizarCarrito();
    //mostrarCarrito();
    //return array;
}
/* Comienzo */
cargarArrayCds();

