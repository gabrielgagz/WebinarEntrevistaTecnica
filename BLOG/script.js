document.addEventListener('DOMContentLoaded', function () {
    let entries = JSON.parse(localStorage.getItem('blogEntries')) || [];

    function renderEntries() {

        const blogList = document.getElementById('blogList');

        if ( entries.length == 0 ) {
            blogList.innerHTML = 'No hay entradas';
        }
        else {
            // Reseteamos
            blogList.innerHTML = '';

            // Escribimos los elemntos
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

    document.getElementById('blogForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const newEntry = {
            title: document.getElementById('title').value,
            content: document.getElementById('content').value
        };

        entries.push(newEntry);
        localStorage.setItem('blogEntries', JSON.stringify(entries));
        renderEntries();
        document.getElementById('blogForm').reset();
    });

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
