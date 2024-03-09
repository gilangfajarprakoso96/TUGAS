document.addEventListener("DOMContentLoaded", function() {
  const inputForm = document.getElementById("inputBook");
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  const completeBookshelfList = document.getElementById("completeBookshelfList");

  inputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    saveBookToLocalStorage(title, author, year, isComplete);
    displayBooksOnShelves();
  });

  function saveBookToLocalStorage(title, author, year, isComplete) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    const newBook = { title, author, year, isComplete };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
  }

  function displayBooksOnShelves() {
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    const books = getBooksFromLocalStorage();

    books.forEach(book => {
      const bookItem = createBookItem(book.title, book.author, book.year, book.isComplete);
      if (book.isComplete) {
        completeBookshelfList.appendChild(bookItem);
      } else {
        incompleteBookshelfList.appendChild(bookItem);
      }
    });
  }

  function createBookItem(title, author, year, isComplete) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const authorElement = document.createElement("p");
    authorElement.textContent = "Penulis: " + author;

    const yearElement = document.createElement("p");
    yearElement.textContent = "Tahun: " + year;

    bookItem.appendChild(titleElement);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(yearElement);

    return bookItem;
  }

  function getBooksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("books")) || [];
  }

  displayBooksOnShelves();
});