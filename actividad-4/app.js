const input = document.getElementById("inputTarea");
const btn = document.getElementById("btnAgregar");
const lista = document.getElementById("listaTareas");

// Agregar tarea
btn.addEventListener("click", () => {
    const texto = input.value.trim();
    if (texto === "") return;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    // Texto
    const span = document.createElement("span");
    span.textContent = texto;

    // Marcar completada
    span.addEventListener("click", () => {
        span.classList.toggle("text-decoration-line-through");
        span.classList.toggle("text-muted");

        li.classList.toggle("list-group-item-success");
    });

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(btnEliminar);

    lista.appendChild(li);

    input.value = "";
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});
