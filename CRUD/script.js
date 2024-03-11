document.addEventListener('DOMContentLoaded', function () {

    // Obtener la lista de elementos desde el LocalStorage o inicializarla si no existe
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Función para renderizar la lista de elementos
    function renderItems() {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';

        items.forEach(function (item, index) {
            const listItem = document.createElement('li');
            listItem.className="list-group-item text-muted";
            listItem.innerHTML = `
            <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-square-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4z"/>
            </svg> 
            ${item}
            <button onclick="editItem(${index})" class="btn btn-outline-secondary btn-list-edit ms-5">Editar</button>
            <button onclick="deleteItem(${index})" class="btn btn-outline-secondary btn-list-delete">Eliminar</button>
            `;
            itemList.appendChild(listItem);
        });
    }

    // Función para agregar un nuevo elemento
    document.getElementById('crudForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const newItem = document.getElementById('itemName').value;
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
        document.getElementById('crudForm').reset();
    });

    // Función para editar un elemento
    window.editItem = function (index) {
        const updatedItem = prompt('Editar elemento:', items[index]);
        if (updatedItem !== null) {
            items[index] = updatedItem;
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
        }
    };

    // Función para eliminar un elemento
    window.deleteItem = function (index) {
        const confirmDelete = confirm('¿Estás seguro de eliminar este elemento?');
        if (confirmDelete) {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
        }
    };

    // Renderizar la lista inicial al cargar la página
    renderItems();
});