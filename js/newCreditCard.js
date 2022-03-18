const tarjeta = document.querySelector('#tarjeta'),
btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
formulario = document.querySelector('#formulario-tarjeta'),
numeroTarjeta = document.querySelector('#tarjeta .numero'),
nombreTarjeta = document.querySelector('#tarjeta .nombre'),
logoMarca = document.querySelector('#logo-marca'),
firma = document.querySelector('#tarjeta .firma p'),
mesExpiracion = document.querySelector('#tarjeta .mes'),
yearExpiracion = document.querySelector('#tarjeta .year');
ccv = document.querySelector('#tarjeta .ccv');

const btnConfirmarPago=document.getElementById('btnConfirmarPago');
const btnCancelarPago=document.getElementById('btnCancelarPago');

btnConfirmarPago.addEventListener('click',()=>{
	Swal.fire({
		icon: 'success',
		title: 'Do you want to save the changes?',
		showDenyButton: false,
		showCancelButton: false,
		confirmButtonText: 'OK',
		denyButtonText: `Don't save`,
	  }).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
			localStorage.removeItem('carrito');
			window.close();
			window.open("index.html");
		} else if (result.isDenied) {
		  Swal.fire('Changes are not saved', '', 'info')
		}
	  })
	/* 
    /* Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pago efectuado',
        showConfirmButton: true,
        timer: 5000,
    }) */
    
})
btnCancelarPago.addEventListener('click',()=>{
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Pago cancelado',
        showConfirmButton: false,
        timer: 2000,
    })
    //localStorage.removeItem('carrito');
    window.close();
    window.open("index.html");
})
function checkAllFields(){
    if (numeroTarjeta.value!="" && nombreTarjeta.value!=""
        && mesExpiracion.value!="" && yearExpiracion.value!="") {
        console.log('todos llenos');
        btnConfirmarPago.removeAttribute('disabled');
    }
    else{
        console.log('algo falta');
        btnConfirmarPago.setAttribute('disabled','true');
    }
}

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
    checkAllFields();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'John Doe';
	}

	mostrarFrente();
    checkAllFields();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
    checkAllFields();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
    checkAllFields();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
    checkAllFields();
});