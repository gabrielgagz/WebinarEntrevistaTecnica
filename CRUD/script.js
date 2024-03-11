document.addEventListener('DOMContentLoaded', function () {
    
    // Obtener la lista de elementos desde el LocalStorage o inicializarla si no existe
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Función para renderizar la lista de elementos
    function renderItems() {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';

        items.forEach(function (item, index) {
            const listItem = document.createElement('li');
            listItem.className="list-group-item";
            listItem.innerHTML = `
                ${item}
                <button onclick="editItem(${index})" class="btn btn-outline-primary btn-sm ms-2">Editar</button>
                <button onclick="deleteItem(${index})" class="btn btn-outline-danger btn-sm">Eliminar</button>
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