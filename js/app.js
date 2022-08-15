//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', (() => {
        articulosCarrito = []; //Resetear el arreglo

        limpiarHTML(); //Eliminamos todo el html
    }))
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    //Sin el e.target.classList se crearia una funcion burbuja. Ejecutandose en momentos no deseados.
    //('agregar-carrito') es la clase que contiene el boton de compra
    if (e.target.classList.contains('agregar-carrito')){

        //Convierte en variable e.target.""
        const cursoSeleccionado = e.target.parentElement.parentElement

        //Manda a llamar a la funcion de leer datos dentro de agregar a curso
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    console.log('desde eliminarCurso')
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y monstrar su HTML
    }
}

//Funcion para leer el contenido del Html al que le dimos click
function leerDatosCurso(curso){
    console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    //Actualizar la cantidad
    if(existe){
        //Actualizamos la cantidad
        //.map va a iterar sobre todos los elementos del carrito
        const cursos = articulosCarrito.map(curso => {
            if ( curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else{
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agregar elementos al arreglo de carrito 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito)
    carritoHTML()
}

//Muestra el carrito de compras en el HTML
//ForEach es la forma de iterar mas sencilla para este caso
//Se creara una variable. En este Row llama al elemento tr, que corresponde a una etiqueta de tablas
//Se usara como templade string a innerHTML para generarlo en las tablas. Respetando las etiquetas de una tabla.
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML()
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        //Agrega el HTML del carrito en el tbody
        //Con appendChild agrega el contenido de row como hijo de la etiqueta
        contenedorCarrito.appendChild(row)
    })
}

//Elimina los cursos del tbody
//Sin esta funcion agregariamos los elementos pero al mismo tiempo se repetirian junto a los demas agregados
//contenedorCarrito.innerHTML='' o while(contenedorCarrito.firstChild) funciona como limpiador de HTML y permita que se añada de forma ordenada
function limpiarHTML(){
    //forma "lenta"
    //contenedorCarrito.innerHTML=''

    //Forma recomendada
    //While se ejecuta siempre y cuando  se cumpla la condicion
    //En este caso la condicion es que tenga un hijo dentro de su contenido.
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}