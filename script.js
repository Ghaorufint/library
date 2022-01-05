let myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}
/*function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}*/

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function addIndex(libraryArray) {
    libraryArray[libraryArray.length - 1].idx = libraryArray.length - 1;
}

const body = document.querySelector('body');
const container = document.querySelector('container');
const form = document.getElementById('userInput');
const submitButton = document.getElementById('submitButton');
const bookDisplay = document.getElementById('bookDisplay');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(new Book(bookName.value, bookAuthor.value, bookPages.value, document.getElementById('userInput')['status'].value))
    addIndex(myLibrary);
    form.onsubmit("refreshTable(myLibrary)");
});

function refreshTable(myLibrary) {
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('data-attribute', `${myLibrary.length - 1}`);

    bookDisplay.appendChild(tableRow)

    const tableData1 = document.createElement('th');
    tableData1.textContent = myLibrary[myLibrary.length - 1].title;
    tableRow.appendChild(tableData1);

    const tableData2 = document.createElement('th');
    tableData2.textContent = myLibrary[myLibrary.length - 1].author;
    tableRow.appendChild(tableData2);

    const tableData3 = document.createElement('th');
    tableData3.textContent = myLibrary[myLibrary.length - 1].pages;
    tableRow.appendChild(tableData3);

    const tableData4 = document.createElement('th');
    tableData4.textContent = myLibrary[myLibrary.length - 1].status;
    tableRow.appendChild(tableData4);

    const toggleStatus = document.createElement('input');
    toggleStatus.type = "button";
    toggleStatus.classList.toggle("toggleReadStatus");
    toggleStatus.value = "Change Status";
    tableData4.appendChild(toggleStatus);
    tableRow.appendChild(tableData4);

    const tableData5 = document.createElement('th');
    const removeBookButton = document.createElement('input');
    removeBookButton.type = "button";
    removeBookButton.classList.toggle("removeBookButton");
    removeBookButton.value = "X";
    tableData5.appendChild(removeBookButton);
    tableRow.appendChild(tableData5);
}

window.addEventListener('click', (event) => {
    if (event.target.className === 'removeBookButton') {
        myLibrary = myLibrary.filter(book => book.idx != event.path[2].getAttribute('data-attribute'));
        event.path[2].remove();
    }
    if (event.target.classList == 'toggleReadStatus') {
        if (event.path[1].childNodes[0].textContent == "Read") {
            event.path[1].childNodes[0].textContent = "Not read";
            myLibrary[event.path[2].getAttribute('data-attribute')].status = 'Not read';
        }
        else {
            event.path[1].childNodes[0].textContent = "Read";
            myLibrary[event.path[2].getAttribute('data-attribute')].status = 'Read';
        }
    }
})