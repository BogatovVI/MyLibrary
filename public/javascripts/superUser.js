async function getUser(){//Получение пользователей
    let response = await fetch('/users/superuser/getUser')
    let users = await response.json()
    let div = document.getElementById("list_user")
    let ul = document.createElement('ul')
    ul.id = "users"
    div.append(ul)
    users.forEach(obj => {
        let li = document.createElement('li')
        li.id = "user"
        li.innerHTML = `<h3>Логин: ${obj.username}</h3><h3>Роль: ${obj.role}</h3>`
        ul.append(li)
    });
}

getUser();//Вызов функции получения пользователей

document.querySelector(".renameRole").onclick = async () => {//Изменение роли пользователя
    const selected = document.querySelector('input[name="role"]:checked').value;
    const login = document.querySelector('input[name="login"]').value;
    let error = document.getElementById("Error_supuser");
    if (login === ""){
        error.textContent = "Логин не должен быть пустым."
        error.style.color = 'darkred';
    }
    else{
        const data = {
            Login: login,
            Role: selected
        }
        let headers = {
            'Content-Type': 'application/json'
        }
        let response = await fetch('/users/superuser', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: headers
        })
        let json = await response.json();
        const {message} = json;
        if (response.status === 200){
            error.textContent = message;
            error.style.color = 'green';
            setTimeout(function() {
                error.textContent = "";
            }, 3000);
            let ul = document.getElementById("users");
            let li = document.getElementById("user");
            li.remove();
            ul.remove();
            getUser();
        }
        else{
            error.textContent = message;
            error.style.color = 'darkred';
        }
    }
}

document.querySelector(".DeleteUserButton").onclick = async () => {//Удаление пользователя
    const login = document.querySelector('input[name="loginDeleteUser"]').value;
    let error = document.getElementById("Error_deleteUser");
    if (login === ""){
        error.textContent = "Логин не должен быть пустым."
        error.style.color = 'darkred';
    }
    else{
        const data = {
            Login: login,
        }
        let headers = {
            'Content-Type': 'application/json'
        }
        let response = await fetch('/users/superuser/deleteUser', {
            method: 'delete',
            body: JSON.stringify(data),
            headers: headers
        })
        let json = await response.json();
        const {message} = json;
        if (response.status === 200){
            error.textContent = message;
            error.style.color = 'green';
            setTimeout(function() {
                error.textContent = "";
            }, 3000);
            let ul = document.getElementById("users");
            let li = document.getElementById("user");
            li.remove();
            ul.remove();
            getUser();
        }
        else{
            error.textContent = message;
            error.style.color = 'darkred';
        }
    }
}