document.addEventListener('DOMContentLoaded', function () {
    class User {
        constructor(username, password) {
            this.username = username;
            this.password = password;
        }
    }

    const registrationForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userList = document.getElementById('users');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        if (username && password) {
            const users = getUsersFromLocalStorage();
            const newUser = new User(username, password);
            users.push(newUser);
            setUsersToLocalStorage(users);
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            registrationForm.reset();
            renderUserList();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (username && password) {
            const users = getUsersFromLocalStorage();
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                alert('Inicio de sesión exitoso. ¡Bienvenido!');
                loginForm.reset();
            } else {
                alert('Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.');
            }
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    function getUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function setUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function renderUserList() {
        const users = getUsersFromLocalStorage();
        const userList = document.getElementById('users');
        userList.innerHTML = '';

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${user.username}</h3>
                <p>Password: ${user.password}</p>
            `;
            userList.appendChild(listItem);
        });
    }

    renderUserList();
});
