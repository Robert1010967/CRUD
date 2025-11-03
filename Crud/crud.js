//Roberto Gomez
//24.10.25 
function limpiar() {
  document.getElementById("item").value = "";
  document.getElementById("precio").value = "";
}

// Crear tabla (simulado con localStorage)
document.getElementById("crear").addEventListener("click", function () {
  if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify([]));
    alert("Tabla simulada creada con localStorage");
  } else {
    alert("La tabla ya existe");
  }
});

// Insertar registro
document.getElementById("Insertar").addEventListener("click", function () {
  const item = document.getElementById("item").value;
  const precio = document.getElementById("precio").value;
  if (!item || !precio) return alert("Completa todos los campos");

  let productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const nuevoID = productos.length ? productos[productos.length - 1].id + 1 : 1;

  productos.push({ id: nuevoID, item, precio: parseFloat(precio) });
  localStorage.setItem("productos", JSON.stringify(productos));

  alert("Registro insertado correctamente");
  limpiar();
  listar();
});

// Listar registros
function listar() {
  const productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const tbody = document.querySelector("#lista-de-productos tbody");
  tbody.innerHTML = "";

  productos.forEach(producto => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.item}</td>
      <td>$${producto.precio.toFixed(2)}</td>
    `;
    tbody.appendChild(fila);
  });
}

document.getElementById("Lista").addEventListener("click", listar);

// Modificar registro
document.getElementById("Modificar").addEventListener("click", function () {
  const id = parseInt(prompt("Ingrese el ID del producto a modificar:"));
  const item = document.getElementById("item").value;
  const precio = document.getElementById("precio").value;
  if (!id || !item || !precio) return alert("Completa todos los campos");

  let productos = JSON.parse(localStorage.getItem("productos") || "[]");
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) return alert("ID no encontrado");

  productos[index].item = item;
  productos[index].precio = parseFloat(precio);
  localStorage.setItem("productos", JSON.stringify(productos));

  alert("Registro modificado correctamente");
  limpiar();
  listar();
});

// Eliminar todos los registros
document.getElementById("BorrarTodo").addEventListener("click", function () {
  if (confirm("¿Estás seguro de que deseas eliminar todos los registros?")) {
    localStorage.removeItem("productos");
    listar();
    alert("Todos los registros han sido eliminados");
  }
});

// Cargar lista al iniciar
document.addEventListener("DOMContentLoaded", listar);
