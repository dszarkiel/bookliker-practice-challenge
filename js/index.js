document.addEventListener("DOMContentLoaded", e => {
    fetchBooks();
});
const showPanel = document.querySelector("#show-panel")
const myUser = {id: 1, username: "pouros"}

// FETCH ALL BOOKS FROM API
function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(books => {
        books.forEach(renderBooks)
    })
}

// GRAB ALL BOOKS AND DISPLAY THEM IN LI FORMAT 
// INCLUDES EVENT LISTNER FOR CLICK
function renderBooks(book) {
    let bookUl = document.querySelector("ul")
    let bookLi = document.createElement("li")
    bookLi.textContent = book.title
    bookUl.append(bookLi)

    bookLi.addEventListener("click", e => {
        showPanel.innerHTML = ""
        showBookDetails(book)
    })
}

// DISPLAY INFO ABOUT BOOK THAT HAS BEEN CLICKED ON 
function showBookDetails(book) {
    let bookTitle = document.createElement("h3")
    bookTitle.textContent = book.title

    let bookSubTitle = document.createElement("h3")
    bookSubTitle.textContent = book.subtitle 

    let bookAuthor = document.createElement("h3")
    bookAuthor.textContent = book.author 

    let bookImg = document.createElement("img")
    bookImg.src = book.img_url
    
    let bookDesc = document.createElement("p")
    bookDesc.textContent = book.description

    // LISTS OF USERS THAT HAVE LIKED THIS BOOK 
    let likesUl = document.createElement("ul")
    likesUl.setAttribute("class", "likes")

    let usersLikes = book.users
    usersLikes.forEach(user => {
        let userLi = document.createElement("li")
        userLi.append(user.username)
        likesUl.append(userLi)
    })

    let likeBtn = document.createElement("button")
    likeBtn.textContent = "Like"
    likeBtn.addEventListener("click", () => {
        likeBook(book)
    })

    showPanel.append(bookImg, bookTitle, bookSubTitle, bookAuthor, bookDesc, likesUl, likeBtn)
}

// LIKE FUNCTION TO ADD NEW LIKE TO BOOK SHOW PANEL
function likeBook(book) {
    let bookId = book.id
    let likedUsers = book.users
    likedUsers.push(myUser)

    fetch(`http://localhost:3000/books/${bookId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({users: likedUsers})
    })

    let likesList = document.querySelector(".likes")
    let myUserLi = document.createElement("li")
    myUserLi.textContent = myUser.username
    likesList.append(myUserLi)
}