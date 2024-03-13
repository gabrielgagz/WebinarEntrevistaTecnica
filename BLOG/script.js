document.addEventListener('DOMContentLoaded', function () {

    // Cargamos los datos almacenados en LocalStorage (si existen)
    let entries = JSON.parse(localStorage.getItem('blogEntries')) || [];

    function renderEntries() {

        const blogList = document.getElementById('blogList');

        if ( entries.length == 0 ) {
            blogList.innerHTML = 'No hay entradas';
        }
        else {
            
            // Reseteamos
            blogList.innerHTML = '';

            // Escribimos los elementos
            entries.forEach(function (entry, index) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h2>${entry.title}</h2>
                    <p>${entry.image}</p>
                    <p>${entry.content}</p>
                    <button onclick="editEntry(${index})">Editar</button>
                    <button onclick="deleteEntry(${index})">Eliminar</button>
                `;
                blogList.appendChild(listItem);
            });
        }

    }

    // Eliminamos el modal después de enviar los datos a través del formulario
    // TODO: implementar una mejor solución
    function removeModal() {
        document.getElementById('closeButton').click();
    }

    // Anviamos los datos del formulario a LocalStorage
    document.getElementById('blogForm').addEventListener('submit', function (event) {

        event.preventDefault();
        
        const newEntry = {
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
            image: document.getElementById('image').value
        };

        entries.push(newEntry);
        localStorage.setItem('blogEntries', JSON.stringify(entries));
        renderEntries();
        document.getElementById('blogForm').reset();
        removeModal();
        
    });

    // PARA ESTUDIANTES: Tarea 1
    // Utilizar modal de Bootstrap
    window.editEntry = function (index) {
        const updatedTitle = prompt('Editar título:', entries[index].title);
        const updatedContent = prompt('Editar contenido:', entries[index].content);

        if (updatedTitle !== null && updatedContent !== null) {
            entries[index].title = updatedTitle;
            entries[index].content = updatedContent;
            localStorage.setItem('blogEntries', JSON.stringify(entries));
            renderEntries();
        }
    };

    // PARA ESTUDIANTES: Tarea 2
    // Utilizar modal de Bootstrap
    window.deleteEntry = function (index) {
        const confirmDelete = confirm('¿Estás seguro de eliminar esta entrada?');
        if (confirmDelete) {
            entries.splice(index, 1);
            localStorage.setItem('blogEntries', JSON.stringify(entries));
            renderEntries();
        }
    };

    renderEntries();
});
