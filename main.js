const openCart = document.getElementById('openCart');
const ventana = document.getElementById('cart__container');
const closeCart = document.getElementById('closeCart');

openCart.addEventListener('click', () => {
    cart__container.classList.add('show')
});
closeCart.addEventListener('click', () => {
    cart__container.classList.remove('show')
});
/* DATABASE */
const productos = [
    {
      id: 1,
      nombre: 'Zapatos Nike Futbol',
      precio: 34,
      imagen:"https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png",
      stock: 10
    },
    {
      id: 2,
      nombre: 'Zapatos Nike Ladron',
      precio: 27,
      imagen:"https://pngimg.com/uploads/running_shoes/running_shoes_PNG5800.png",
      stock: 15
    },
    {
      id: 3,
      nombre: 'Zapatos Nike Brillantico',
      precio: 50,
      imagen:"https://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png",
      stock: 8
    }
  ]
  
  const productosContenedor = document.querySelector('.products__container')
  /* Productos */
  function pintarProductos() {
    let html = ''
    console.log('antes de la compra');
    for(let {id, nombre, imagen, precio} of productos) {
        html += `
        <div class="products__container__card">
        <div class="container__card-img">
            <img src="${imagen}" alt="${nombre}">
            <h2>${nombre}</h2>
        </div>    
        <div class="container__content">
            <div class="content__price">
                <h3>Precio : ${precio}</h3>
            </div>
            <a href="" data-id="${id}">Comprar</a>
        </div> 
        `
    }
    productosContenedor.innerHTML = html
  }
  
  pintarProductos()
  
  /* Carrito */
  let carrito = []
  
  function agregarAlCarrito(id) {
    const cantidad = 1
  
    const productoEncontrado = productos.find(x => x.id === id)
  
    if (productoEncontrado && productoEncontrado.stock > 0) {
      const articuloEncontrado = carrito.find(x => x.id === id)
    
    if (articuloEncontrado) {
      if (verificarUnidades(id, cantidad + articuloEncontrado.cantidad)) {
        articuloEncontrado.cantidad += cantidad
      } else {
        window.alert('supera las unidades disponibles')
      }    
    } else {
      carrito.push({ id, cantidad })
    }
    } else {
      window.alert('Lo sentimos no tenemos unidades disponibles')
    }
  }
  
  function verificarUnidades(id, cantidad) {
    const productoEncontrado = productos.find(x => x.id === id)
  
    return productoEncontrado.stock - cantidad >= 0 
  }
  
  function removerDelCarrito(id) {
    const cantidad = 1
  
    const articuloEncontrado = carrito.find(x => x.id === id)
    
    if (articuloEncontrado.cantidad - cantidad > 0) {
      articuloEncontrado.cantidad -= cantidad
    } else {
      carrito = carrito.filter(x => x.id !== id)
    }
  }
  
  function contarArticulos () {
    let suma = 0
    for (const articulo of carrito) {
      suma += articulo.cantidad
    }
    return suma
  }
  
  
  function total () {
    let suma = 0
  
    for(let articulo of carrito) {
      const productoEncontrado = productos.find(x => x.id === articulo.id)
  
      suma += articulo.cantidad * productoEncontrado.precio
    }
  
    return suma
  }
  
  function comprar() {
    for(let articulo of carrito) {
      const productoEncontrado = productos.find(x => x.id === articulo.id)
  
      productoEncontrado.stock -= articulo.cantidad
    }
  
    window.alert('Gracias por su compra')
    carrito = []
  }
  
