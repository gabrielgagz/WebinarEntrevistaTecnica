document.addEventListener('DOMContentLoaded', function () {

    // Cargamos los datos almacenados en LocalStorage (si existen)
    let entries = JSON.parse(localStorage.getItem('blogEntries')) || [];

    function renderEntries() {

        const blogList = document.getElementById('blogList');

        if ( entries.length == 0 ) {
            blogList.innerHTML = `
            <div class="d-flex alert">
                <div class="alert alert-danger mt-4 text-center text-red" role="alert">
                    No se encontró ningún post para mostrar.
                </div>
            </div>`;
        }
        else {
            
            // Reseteamos
            blogList.innerHTML = '';

            // Escribimos los elementos
            entries.forEach(function (entry, index) {

                const listItem = document.createElement('div');

                // TAREA: Chequear si la imagen que se provee existe
                if (entry.image == '') {entry.image ='img/fallback.jpeg'}

                listItem.innerHTML = `
                <div class="card border-0 shadow mt-4 me-4">
                    <img src="${entry.image}" class="card-img-top" alt="Modal Image">
                    <div class="card-body">
                        <h5 class="card-title">${entry.title}</h5>
                        <p class="card-text">${entry.content}</p>
                        <button class="btn btn-outline-success btn-list-edit" onclick="editEntry(${index})">Editar</button>
                        <button class="btn btn-outline-danger btn-list-delete" onclick="deleteEntry(${index})">Eliminar</button>
                    </div>
                </div>
                `;
                blogList.appendChild(listItem);
            });
        }

    }

    // Eliminamos el modal después de enviar los datos a través del formulario
    // TAREA: implementar una mejor solución
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

    // TAREA: Utilizar modal de Bootstrap
    window.editEntry = function (index) {
        const updatedTitle = prompt('Editar título:', entries[index].title);
        const updatedImage = prompt('Editar título:', entries[index].image);
        const updatedContent = prompt('Editar contenido:', entries[index].content);

        if (updatedTitle !== null && updatedContent !== null) {
            entries[index].title = updatedTitle;
            entries[index].image = updatedImage;
            entries[index].content = updatedContent;
            localStorage.setItem('blogEntries', JSON.stringify(entries));
            renderEntries();
        }
    };

    // TAREA: Utilizar modal de Bootstrap
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
