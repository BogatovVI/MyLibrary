document.querySelector("#button_reg").onclick = async() => {
    let Login = document.getElementById("Login").value;
    let Password = document.getElementById("Password").value;
    let error = document.getElementById("Error");
    if (Login === "" || Password === ""){
        error.textContent = "Логин и пароль не должны быть пустыми.";
    }
    else if (Login.indexOf(" ", 0) !== -1){
        error.textContent = "Логин должен быть без пробелов.";
    }
    else if (Password.indexOf(" ", 0) !== -1){
        error.textContent = "Пароль должен быть без пробелов.";
    }
    else if (Password.length < 4){
        error.textContent = "Пароль должен быть больше 3 символов.";
    }
    else{
        error.textContent = "";
        let data = {
            username: Login,
            password: Password
        }
        let headers = {
            'Content-Type': 'application/json'
        }
        let response = await fetch('/registration', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers
        })
        let json = await response.json();
        const {message} = json;
        if (response.status === 200){
            window.location.href = '/login';
        }
        else{
            error.textContent = message;
        }
    }
}