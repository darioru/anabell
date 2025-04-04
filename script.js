// Base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Camiseta Básica Hombre",
        precio: 19.99,
        categoria: "hombre",
        imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        nombre: "Vestido Floral Mujer",
        precio: 39.99,
        categoria: "mujer",
        imagen: "https://images.unsplash.com/photo-1539008835657-9e8e9680e956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        nombre: "Jeans Slim Fit Hombre",
        precio: 49.99,
        categoria: "hombre",
        imagen: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        nombre: "Blusa Mujer",
        precio: 29.99,
        categoria: "mujer",
        imagen: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        nombre: "Conjunto Niña",
        precio: 34.99,
        categoria: "niños",
        imagen: "https://images.unsplash.com/photo-1599447339981-0f3a508dea71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        nombre: "Sudadera con Capucha",
        precio: 45.99,
        categoria: "hombre",
        imagen: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        nombre: "Falda Mujer",
        precio: 27.99,
        categoria: "mujer",
        imagen: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        nombre: "Conjunto Niño",
        precio: 32.99,
        categoria: "niños",
        imagen: "https://images.unsplash.com/photo-1603072387863-1a3b3589a9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

// Ofertas (productos con descuento)
const ofertas = [
    {
        id: 101,
        nombre: "Chaqueta de Cuero Hombre",
        precio: 89.99,
        precioAnterior: 129.99,
        imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 102,
        nombre: "Vestido de Noche Mujer",
        precio: 59.99,
        precioAnterior: 89.99,
        imagen: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 103,
        nombre: "Abrigo Invierno Niña",
        precio: 49.99,
        precioAnterior: 69.99,
        imagen: "https://images.unsplash.com/photo-1596704017256-17961c9a9f0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

// Variables globales
let carrito = [];
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorOfertas = document.querySelector('.contenedor-ofertas');
const carritoIcono = document.querySelector('.carrito-icono');
const contadorCarrito = document.querySelector('.contador-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const carritoItems = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const btnFinalizarCompra = document.getElementById('finalizar-compra');
const cerrarModal = document.querySelector('.cerrar-modal');
const filtros = document.querySelectorAll('.btn-filtro');

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    mostrarOfertas(ofertas);
    
    // Cargar carrito desde localStorage si existe
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarContadorCarrito();
    }
});

// Mostrar productos en la página
function mostrarProductos(productosMostrar) {
    contenedorProductos.innerHTML = '';
    
    productosMostrar.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.dataset.categoria = producto.categoria;
        
        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-info">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <span class="producto-precio">$${producto.precio.toFixed(2)}</span>
                <button class="producto-agregar" data-id="${producto.id}">Agregar al Carrito</button>
            </div>
        `;
        
        contenedorProductos.appendChild(divProducto);
    });
    
    // Agregar event listeners a los botones de agregar
    document.querySelectorAll('.producto-agregar').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });
}

// Mostrar ofertas en la página
function mostrarOfertas(ofertasMostrar) {
    contenedorOfertas.innerHTML = '';
    
    ofertasMostrar.forEach(oferta => {
        const divOferta = document.createElement('div');
        divOferta.classList.add('oferta');
        
        divOferta.innerHTML = `
            <img src="${oferta.imagen}" alt="${oferta.nombre}" class="oferta-imagen">
            <div class="oferta-info">
                <h3>${oferta.nombre}</h3>
                <div class="oferta-precio">
                    <span class="precio-actual">$${oferta.precio.toFixed(2)}</span>
                    <span class="precio-anterior">$${oferta.precioAnterior.toFixed(2)}</span>
                </div>
                <button class="producto-agregar" data-id="${oferta.id}" data-oferta="true">Agregar al Carrito</button>
            </div>
        `;
        
        contenedorOfertas.appendChild(divOferta);
    });
    
    // Agregar event listeners a los botones de agregar ofertas
    document.querySelectorAll('.contenedor-ofertas .producto-agregar').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });
}

// Filtrar productos por categoría
filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        // Remover clase active de todos los filtros
        filtros.forEach(f => f.classList.remove('active'));
        // Agregar clase active al filtro clickeado
        filtro.classList.add('active');
        
        const categoria = filtro.dataset.categoria;
        
        if (categoria === 'todos') {
            mostrarProductos(productos);
        } else {
            const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
            mostrarProductos(productosFiltrados);
        }
    });
});

// Agregar producto al carrito
function agregarAlCarrito(e) {
    const id = parseInt(e.target.dataset.id);
    const esOferta = e.target.dataset.oferta === 'true';
    
    // Buscar producto en productos u ofertas
    let producto;
    if (esOferta) {
        producto = ofertas.find(item => item.id === id);
    } else {
        producto = productos.find(item => item.id === id);
    }
    
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === id && item.esOferta === esOferta);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1,
            esOferta
        });
    }
    
    actualizarContadorCarrito();
    guardarCarritoEnLocalStorage();
    
    // Mostrar feedback al usuario
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
    }).showToast();
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Abrir modal del carrito
carritoIcono.addEventListener('click', () => {
    mostrarCarrito();
    modalCarrito.style.display = 'flex';
});

// Cerrar modal del carrito
cerrarModal.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target === modalCarrito) {
        modalCarrito.style.display = 'none';
    }
});

// Mostrar contenido del carrito
function mostrarCarrito() {
    carritoItems.innerHTML = '';
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>Tu carrito está vacío</p>';
        carritoTotal.textContent = '$0';
        return;
    }
    
    carrito.forEach(item => {
        const divItem = document.createElement('div');
        divItem.classList.add('carrito-item');
        
        divItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
            <span class="carrito-item-titulo">${item.nombre}</span>
            <div class="carrito-item-cantidad">
                <button class="disminuir" data-id="${item.id}" data-oferta="${item.esOferta}">-</button>
                <span>${item.cantidad}</span>
                <button class="aumentar" data-id="${item.id}" data-oferta="${item.esOferta}">+</button>
            </div>
            <span class="carrito-item-precio">$${(item.precio * item.cantidad).toFixed(2)}</span>
            <span class="carrito-item-eliminar" data-id="${item.id}" data-oferta="${item.esOferta}"><i class="fas fa-trash"></i></span>
        `;
        
        carritoItems.appendChild(divItem);
    });
    
    // Calcular total
    const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
    carritoTotal.textContent = `$${total.toFixed(2)}`;
    
    // Agregar event listeners a los botones de cantidad y eliminar
    document.querySelectorAll('.disminuir').forEach(btn => {
        btn.addEventListener('click', disminuirCantidad);
    });
    
    document.querySelectorAll('.aumentar').forEach(btn => {
        btn.addEventListener('click', aumentarCantidad);
    });
    
    document.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
        btn.addEventListener('click', eliminarDelCarrito);
    });
}

// Disminuir cantidad de un item en el carrito
function disminuirCantidad(e) {
    const id = parseInt(e.target.dataset.id);
    const esOferta = e.target.dataset.oferta === 'true';
    
    const itemIndex = carrito.findIndex(item => item.id === id && item.esOferta === esOferta);
    
    if (itemIndex !== -1) {
        if (carrito[itemIndex].cantidad > 1) {
            carrito[itemIndex].cantidad--;
        } else {
            carrito.splice(itemIndex, 1);
        }
        
        actualizarContadorCarrito();
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }
}

// Aumentar cantidad de un item en el carrito
function aumentarCantidad(e) {
    const id = parseInt(e.target.dataset.id);
    const esOferta = e.target.dataset.oferta === 'true';
    
    const itemIndex = carrito.findIndex(item => item.id === id && item.esOferta === esOferta);
    
    if (itemIndex !== -1) {
        carrito[itemIndex].cantidad++;
        
        actualizarContadorCarrito();
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }
}

// Eliminar item del carrito
function eliminarDelCarrito(e) {
    const id = parseInt(e.target.closest('.carrito-item-eliminar').dataset.id);
    const esOferta = e.target.closest('.carrito-item-eliminar').dataset.oferta === 'true';
    
    const itemIndex = carrito.findIndex(item => item.id === id && item.esOferta === esOferta);
    
    if (itemIndex !== -1) {
        carrito.splice(itemIndex, 1);
        
        actualizarContadorCarrito();
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
    }
}

// Finalizar compra
btnFinalizarCompra.addEventListener('click', () => {
    if (carrito.length === 0) return;
    
    // Simular proceso de compra
    Swal.fire({
        title: '¡Compra exitosa!',
        text: `Gracias por tu compra de $${carritoTotal.textContent.substring(1)}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Vaciar carrito
        carrito = [];
        actualizarContadorCarrito();
        guardarCarritoEnLocalStorage();
        mostrarCarrito();
        modalCarrito.style.display = 'none';
    });
});

// Nota: Para que Toastify y SweetAlert funcionen, debes agregar estos CDNs en el HTML
// Agrega estos en el <head> de tu HTML:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
// <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>