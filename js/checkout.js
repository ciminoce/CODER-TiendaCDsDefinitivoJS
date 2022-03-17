let cdsDisqueria=[];
let carritoDeCompras=[];

const detalle=document.getElementById('detallesTbody'); 
const footer=document.getElementsByClassName('footer')[0];
const totalCarrito=document.getElementById('totalCarrito');


footer.classList.add('footerAlFinal')




function manejarBotonFinalizar(valorLogico){
    valorLogico?document.getElementById(`btnFinalizar`).removeAttribute('disabled'):
    document.getElementById('btnFinalizar').setAttribute('disabled',true);
}

function cambiarColorBackgroundIcono(){
    const botonesEliminar = document.querySelectorAll('.boton-eliminar')
    
    botonesEliminar.forEach(btn => {
        btn.classList.add('boton-eliminar__checkout');
    })
}

async function cargarArrayCds() {
    const URL = "/js/datosCds.json";
    
        
    let respuesta = await fetch(URL);
    let datos = await respuesta.json();
    
    datos.forEach((elemento) => cdsDisqueria.push(elemento));
            
    recuperarCarrito(); //Recupero el carrito del localStorage
    showCartIcon();
    cambiarColorBackgroundIcono();
 
}
/* Comienzo */
cargarArrayCds();





