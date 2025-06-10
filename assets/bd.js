const baseDeDatos = [
    {
        productos: [
    { nombre: "Queen 2 (2CD Deluxe Edition)", precio: 15000, descuento: 0.5, img: "https://http2.mlstatic.com/D_NQ_NP_909164-MLA84839427549_052025-O.webp" },
    { nombre: "Pablo Honey - Radiohead", precio: 17090, descuento: 0.7, img: "https://i.scdn.co/image/ab67616d0000b273ec548c00d3ac2f10be73366d" },
    { nombre: "The Dark Side of the Moon- Pink Floyd", precio: 18000, descuento: 0.7, img: "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe" },
    { nombre: "Born To Die - Lana del Rey", precio: 20000, descuento: 0.7, img: "https://umusicstore.com.ar/cdn/shop/files/00602547934888-cover-zoom.jpg?v=1690296275" },
    { nombre: "G-Sides - Gorillaz", precio: 17999, descuento: 0.7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCcHFCVSBSkcYhxlJROjSPUN9_EAL57e5xPQ&s" },
    { nombre: "Ring-Ring - Abba", precio: 15990, descuento: 0.7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-ClrO2OHuzJ8SrAGy46GR8lLEC_fqa3IMg&s" },
    { nombre: "Doo-Wops & Hooligans - Bruno Mars", precio: 16999, descuento: 0.7, img: "https://http2.mlstatic.com/D_NQ_NP_746021-MLA74306521496_022024-O.webp" },
    { nombre: "Oops!... I Did It Again - Britney Spears", precio: 15090, descuento: 0.7, img: "https://i.scdn.co/image/ab67616d0000b273c50b7d96737041f4bfd844d6" },
    { nombre: "Illuminate - Shawn Mendes", precio: 15999, descuento: 0.7, img: "https://http2.mlstatic.com/D_NQ_NP_876542-MLU72855844615_112023-O.webp" },
    { nombre: "Ahí Vamos - Gustavo Cerati", precio: 17990, descuento: 0.7, img: "https://i.scdn.co/image/ab67616d0000b273d543f7c7de880da5370922c0" },
    { nombre: "Señales - Callejeros", precio: 16900, descuento: 0.7, img: "https://http2.mlstatic.com/D_NQ_NP_766025-MLU54965116139_042023-O.webp" },
    { nombre: "Raro - El Cuarteto de Nos", precio: 17090, descuento: 0.7, img: "https://i.scdn.co/image/ab67616d0000b2731cf84979a6b7d69db35773ec" }
        ]
    },
];

function mostrarProductos(productos) {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = productos.map(prod => {
        const idSeguro = prod.nombre.replace(/\s+/g, '_').toLowerCase();
        return `
        <div class="producto">
            <img src="${prod.img}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>Precio: $${prod.precio}</p>
            <div class="cantidad-control">
                <button onclick="modificarCantidad('${idSeguro}', -1)">-</button>
                <span id="cantidad-${idSeguro}">1</span>
                <button onclick="modificarCantidad('${idSeguro}', 1)">+</button>
            </div>
            <button onclick='agregarAlCarrito(${JSON.stringify(prod)}, obtenerCantidad("${idSeguro}"))' class="btn-agregar">Añadir al Carrito</button>
        </div>
        `;
    }).join('');
}

function modificarCantidad(idSeguro, delta) {
    const cantidadSpan = document.getElementById(`cantidad-${idSeguro}`);
    let cantidad = parseInt(cantidadSpan.innerText) + delta;
    if (cantidad < 1) cantidad = 1;
    cantidadSpan.innerText = cantidad;
}

function obtenerCantidad(idSeguro) {
    return parseInt(document.getElementById(`cantidad-${idSeguro}`).innerText);
}

let carrito = [];

function abrirCarrito() {
    document.getElementById('modalCarrito').classList.remove('hidden');
}

function cerrarCarrito() {
    document.getElementById('modalCarrito').classList.add('hidden');
}

function agregarAlCarrito(producto, cantidad = 1) {
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const contenidoCarrito = document.getElementById('contenidoCarrito');
    const carritoCount = document.getElementById('countCard');
    let html = '';

    carrito.forEach(item => {
        html += `
        <div class="item-carrito">
                <div class="item-contenido">
                    <span>${item.nombre}</span>
                    <div class="cantidad-y-total">
                        <span>Cant:</span>
                        <button onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
                        <span>Total: $${item.precio * item.cantidad}</span>
                    </div>
                    <button onclick="eliminarProductoDelCarrito('${item.nombre}')" class="btn-eliminar">🗑️</button>
                </div>
            </div>
        `;
    });

    contenidoCarrito.innerHTML = html;

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    document.getElementById('totalCarrito').innerText = total;

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (totalItems > 0) {
        carritoCount.classList.remove('hidden');
        carritoCount.innerText = totalItems;
    } else {
        carritoCount.classList.add('hidden');
    }
}

function BorrarTodoElCarrito() {
    carrito = [];
    actualizarCarrito();
}

function eliminarProductoDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

function cambiarCantidad(nombre, delta) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad += delta;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
        actualizarCarrito();
    }
}

function finalizarCompra() {
    const resumenCompra = carrito.map(item => `
        ${item.nombre} (x${item.cantidad}): $${item.precio * item.cantidad}
    `).join('\n');

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    Swal.fire({
        title: 'Resumen de Compra',
        html: `<pre>${resumenCompra}</pre><br>Total: $${total}`,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Compra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Procesando compra...',
                html: 'Por favor espere un momento.',
                timer: 15000,
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Compra Confirmada',
                        text: 'Su pedido llegará en las próximas 24 horas.'
                    }).then(() => {
                        BorrarTodoElCarrito();
                        cerrarCarrito();
                    });
                }
            });
        }
    });
}

mostrarProductos(baseDeDatos[0].productos);
