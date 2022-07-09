document.querySelector(".renameRole").onclick = async () => {
    const selected = document.querySelector('input[name="role"]:checked').value;
    const login = document.querySelector('input[name="login"]').value;
    let error = document.getElementById("Error_supuser");
    if (login === ""){
        error.textContent = "Логин не должен быть пустым."
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
        }
        else{
            error.textContent = message;
        }
    }
}

document.querySelector(".DeleteUserButton").onclick = async () => {
    alert("Удалить");
}