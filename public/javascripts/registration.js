document.querySelector("#button_reg").onclick = () => {
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
    }
}