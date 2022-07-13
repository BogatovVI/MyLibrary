async function getBooks(){
    let error = document.createElement("div");
    error.id = "error_list_books"
    const response = await fetch('/users/admin/getBooks')
    let books = await response.json()
    let div = document.getElementById("list_book")
    let ul = document.createElement('ul')
    ul.id = "books"
    div.append(ul)
    books.forEach(obj => {
        let li = document.createElement('li')
        let button = document.createElement('button')
        button.id = "delete_book_button"
        button.textContent = "Удалить"
        button.onclick =  async () => {
            const data = {
                id: obj._id
            }
            let headers = {
                'Content-Type': 'application/json'
            }
            let response_delete = await fetch('/users/admin/deleteBook', {
                method: 'delete',
                body: JSON.stringify(data),
                headers: headers
            })
            let json = await response_delete.json();
            let {message} = json;
            if (response_delete.status === 200){
                error.textContent = message;
                error.style.color = 'green';
                setTimeout(function() {
                    error.textContent = "";
                }, 3000);
            }
            else{
                error.textContent = message;
                error.style.color = 'darkred';
            }
        }
        li.id = "book"
        li.innerHTML = `<h3>Автор: ${obj.Author}</h3><h3>Название: ${obj.Title}</h3>`
        li.onclick = () => {
            setTimeout(function() {
                li.remove();
            }, 3500);
        }
        li.append(button)
        ul.append(li)
    });
    div.append(error);
}
getBooks();


appendBook.onsubmit = async (e) => {//Обработка формы для отправки на сервер
    e.preventDefault();

    let response = await fetch('/users/admin/appendBook', {
        method: 'POST',
        body: new FormData(appendBook)
    });
    let error = document.getElementById("error_book");
    let result = await response.json();
    const {message} = result;
    if (response.status === 200){
        error.textContent = message;
        error.style.color = 'green';
        setTimeout(function() {
            error.textContent = "";
        }, 3000);
        e.target.reset();
        let ul = document.getElementById("books");
        let li = document.getElementById("book");
        li.remove();
        ul.remove();
        getBooks();
    }
    else{
        error.textContent = message;
        error.style.color = 'darkred';
        e.target.reset();
    }
};