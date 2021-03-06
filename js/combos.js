/* funcion para llenar los combos */
/* funcion para obtener los distintos intérpretes */
let cdsFiltrado=[];
/* let filtradoInterprete=false;
let filtradoEstilo=false; */
function obtenerInterpretes(arrayCds){
    //Busco los nombres de los intérpretes únicamente
    console.log(arrayCds);
    let allInterpretes=[];
    allInterpretes=arrayCds.reduce((allInterpretes, claseCd)=>{
        allInterpretes.push(claseCd.interprete);
        return Array.from(new Set(allInterpretes));
    },[]);
    return allInterpretes;
}

/* funcion para obtener los distintos intérpretes */
function obtenerEstilos(arrayCds){
  //Busco los nombres de los estilos únicamente
    let allEstilos=[];
    allEstilos=arrayCds.reduce((allEstilos,claseCd)=>{
        allEstilos.push(claseCd.estilo);
        return Array.from(new Set(allEstilos));
    },[]);

    return allEstilos;
}

function llenarCombos(arrayCds){
/* Combos */
    const comboEstilos=document.getElementById('estiloBusqueda');
    const comboInterpretes=document.getElementById('interpreteBusqueda')
    /* Lleno combo de estilos */
    
    let arrayEstilos=obtenerEstilos(arrayCds);
    let opciones=`<option value="" disabled selected>Seleccione Estilo</option>
                        <option value="Todos">Todos</option>`;
    arrayEstilos.sort();
    arrayEstilos.forEach(estilo=>{
        opciones+= `<option value="${estilo}">${estilo}</option>`;
    })
    
    comboEstilos.innerHTML = opciones;
    /*fin llenado de opciones del combo */

    /* eventos del combo de estilos */
    
    comboEstilos.addEventListener('change',()=>{
        comboInterpretes.value= "";//vuelve al combo al elemento por defecto
        comboOrden.value="";
        if (comboEstilos.value=='Todos') {
            mostrarCdsDisqueria(cdsDisqueria);
        } else {
            cdsFiltrado=filtrarPorEstilo(cdsDisqueria,comboEstilos.value);
            
            mostrarCdsDisqueria(cdsFiltrado);    
        }

    })
 /* fin de eventos del combo estilos */

  /* Lleno combo de interpretes */
    opciones=`<option value="" disabled selected>Seleccione Intérprete</option>
            <option value="Todos">Todos</option>`;
    //let comboInterpretes=document.getElementById('interpreteBusqueda');
    let arrayInterpretes=obtenerInterpretes(arrayCds);

    arrayInterpretes.sort();//Ordeno el array antes de cargar los elementos al combo
    arrayInterpretes.forEach(interprete => {
        opciones+=`<option value="${interprete}">${interprete}</option>`;
    });
    comboInterpretes.innerHTML = opciones;
    /* fin del llenodo del combo de interpretes */

    /* eventos del combo de interpretes */
    comboInterpretes.addEventListener('change',()=>{
        comboEstilos.value= "";//vuelve al combo al elemento por defecto
        comboOrden.value="";//vuelve el combo del orden al elemento por defecto

        if(comboInterpretes.value=='Todos'){
            mostrarCdsDisqueria(cdsDisqueria);
        }else{
            cdsFiltrado=filtrarPorInterprete(cdsDisqueria,comboInterpretes.value);
        
            mostrarCdsDisqueria(cdsFiltrado);
        }
        
    })
/* ************************************ */
/* Llenado del combo de orde de listado */
    let comboOrden=document.getElementById('ordenListado');
    opciones=`<option value="" disabled selected>Seleccione Orden</option>`;
    ordenListado.forEach(orden => {
        opciones+= `<option value="${orden}">${orden}</option>`;
    });
    comboOrden.innerHTML=opciones;
    comboOrden.addEventListener('change',()=>{
        
        let selected = parseInt(comboOrden.selectedIndex);
        switch (selected) {
            case 0:
                break;
            case 1:
                if(cdsFiltrado.length==0){
                    
                    mostrarCdsDisqueria(cdsDisqueria.sort(SortArrayAZ));
                }else{
                    /* mostrarListaCds(cds.filter(elemento=>elemento.interprete==comboInterpretes.value).sort(SortArrayAZ)); */
                    mostrarCdsDisqueria(cdsFiltrado.sort(SortArrayAZ));
                }
                    
                break;
            case 2:
                if(cdsFiltrado.length==0){
                    
                    mostrarCdsDisqueria(cdsDisqueria.sort(SortArrayZA));
                }else{
                    /* mostrarListaCds(cds.filter(elemento=>elemento.interprete==comboInterpretes.value).sort(SortArrayZA)); */
                    mostrarCdsDisqueria(cdsFiltrado.sort(SortArrayZA));
                }
                break;
            case 3:
                if(cdsFiltrado.length==0){
                    
                    mostrarCdsDisqueria(cds.sort(SortArrayPrecioAsc));
                }else{
                    mostrarCdsDisqueria(cdsDisqueria.filter(elemento=>elemento.interprete==comboInterpretes.value).sort(SortArrayPrecioAsc));
                }
                break;
            case 4:
                if(cdsFiltrado.length==0){
                    
                    mostrarCdsDisqueria(cdsDisqueria.sort(SortArrayPrecioDesc));
                }else{
                    mostrarCdsDisqueria(cdsDisqueria.filter(elemento=>elemento.interprete==comboInterpretes.value).sort(SortArrayPrecioDesc));
                }
                break;
            default:
                break;
        }
    })
}
/* inicializar */
function inicializar(){
    cdsFiltrado=[];
    filtradoEstilo=false;
    filtradoInterprete=false;
}

/* Funciones para filtrar el array */
function filtrarPorInterprete(array, interprete){
    return array.filter(elemento=>elemento.interprete==interprete);
}

function filtrarPorEstilo(array, estilo){
    return array.filter(elemento=>elemento.estilo==estilo);
}

/* Funciones para el ordenamiento de los elementos del array */
function SortArrayAZ(x,y){
    if (x.nombre<y.nombre){return -1;}
    if(x.nombre>y.nombre){return 1;}
    return 0;
}
function SortArrayZA(x, y){
    if (x.nombre > y.nombre) {return -1;}
    if (x.nombre < y.nombre) {return 1;}
    return 0;
}
function SortArrayPrecioDesc(x,y){
    if (x.precio > y.precio) {return -1;}
    if (x.precio < y.precio) {return 1;}
    return 0;
}
function SortArrayPrecioAsc(x,y){
    if (x.precio < y.precio) {return -1;}
    if (x.precio < y.precio) {return 1;}
    return 0;
}
