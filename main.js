function book (bookNum, read, name, author, pages, genre, year, rating, cover) {
    this.bookNum = bookNum;
    this.read = read;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.year = year;
    this.rating = rating;
    this.cover = cover;
    this.readIndicator = () => {
        if (this.read == true) {
            return "#32CD32";
        } else {
            return "black";
        }
    }
}

const book1 = new book("1", true, "The Lord of the Rings", "J.R.R. Tolkien", 1178, "Fantasy", 1954, 4.5, "url(images/lotr.jpg)");
const book2 = new book("2", false, "The Catcher in the Rye", "J.D. Salinger", 277, "Coming-of-age", 1951, 3.8, "url(images/acitr.jpg)");
const book3 = new book("3", true, "The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 216, "Science fiction", 1979, 4.2, "url(images/hhgto.jpg)");
const book4 = new book("4", true, "The Kite Runner", "Khaled Hosseini", 372, "Historical fiction", 2003, 4.3, "url(images/tkr.jpg)");
const book5 = new book("5", true, "Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, "Fantasy", 1997, 4.5, "url(images/hpatfs.jpg)");
const book6 = new book("6", false, "To Kill a Mockingbird", "Harper Lee", 281, "Southern Gothic", 1960, 4.3, "url(images/tkamb.jpg)");

let booksArray = [book1, book2, book3, book4, book5, book6];

let displayBooks = (function() {
    const func = function(booksArray) {
        const bookSection = document.querySelectorAll(".bookCard");
        let count = 0;

        bookSection.forEach(section => {
            let currentBook = booksArray[count];
            const name = section.querySelector(".name");
            const author = section.querySelector(".author");
            const year = section.querySelector(".year");
            const wallpaper = section.querySelector(".section1");

            name.innerHTML = `${currentBook.name}`;
            author.innerHTML = `${currentBook.author}`;
            year.innerHTML = `${currentBook.year}`;
            wallpaper.style.backgroundImage = `${currentBook.cover}`;

            name.style.color = currentBook.readIndicator();

            count++;
        })
    };

    func(booksArray);  // Immediately invoke the function with booksArray
    return func;  // Return the function reference
})();

function addBookToArray() {
    
}

document.querySelector(".div1").addEventListener('click', (event) => {
    document.querySelector(".div2").style.backgroundImage = event.target.style.backgroundImage;
    document.querySelector(".bookTittle").innerHTML = event.target.nextElementSibling.children[0].children[0].innerHTML;
})

let clicked = false;

document.querySelector(".addBook").addEventListener('mouseover', () => {
    document.querySelector(".addBookDiv").classList.add('addBookDivHover');
})
document.querySelector(".addBook").addEventListener('mouseout', () => {
    if (clicked) {
        return
    } else {
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');    
    }
})
document.addEventListener('click', (event) => {
    const target = document.querySelector(".addBook > img");
    if (event.target == target && clicked) {
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');
        document.querySelector(".addBook").style.backgroundColor = "rgba(105, 170, 201, 0.836)";
        document.querySelector(".cover").classList.remove("dim");
        document.querySelector(".placeholderBookCard").classList.remove("placeholderBookCardActive");
        clicked = false;
        return
    }
    if (event.target.localName == "button") {
        let newBookNumber = booksArray.length + 1;
        let bookName = document.querySelector(".bookName").value;
        let bookAuthor = document.querySelector(".bookAuthor").value;
        let bookYear = document.querySelector(".bookYear").value;

        let newCard = document.querySelector(".card6").cloneNode(true);
        newCard.classList.remove("card6");
        newCard.classList.add(`card${newBookNumber}`);
        newCard.removeAttribute('id');
        newCard.id = `${newBookNumber}`;
        document.querySelector(".div1").insertBefore(newCard, document.querySelector(".card0"));
        newCard.style.right = `${(newBookNumber-1)*50}px`;
        newCard.querySelector(".section1").style.backgroundImage = "";

        const newBook = new book(newBookNumber, false, bookName, bookAuthor, 0, "N/A", bookYear, "N/A", "N/A");
        booksArray.push(newBook);
        displayBooks(booksArray);

        clicked = false;
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');
        document.querySelector(".placeholderBookCard").classList.remove("placeholderBookCardActive");
        document.querySelector(".addBook").style.backgroundColor = "rgba(105, 170, 201, 0.836)";
        document.querySelector(".cover").classList.remove("dim");
    }
    if (event.target == target || event.target.localName == "input" || event.target.localName == "legend" || event.target.localName == "fieldset" || event.target.localName == "h3") {
        clicked = true;
        document.querySelector(".addBook").style.backgroundColor = "white";
        document.querySelector(".cover").classList.add("dim");
        document.querySelector(".placeholderBookCard").classList.add("placeholderBookCardActive");
        document.querySelector(".addBookDiv").classList.add('addBookDivHover')
    } else {
        clicked = false;
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');
        document.querySelector(".placeholderBookCard").classList.remove("placeholderBookCardActive");
        document.querySelector(".addBook").style.backgroundColor = "rgba(105, 170, 201, 0.836)";
        document.querySelector(".cover").classList.remove("dim");
    }
})
document.addEventListener('keyup', (event) => {
    if (document.activeElement.localName == "input") {
        document.querySelector(".bookTittle").innerHTML = document.querySelector(".bookName").value;
        document.querySelector(".placeholderBookCard .name").innerHTML = document.querySelector(".bookName").value;
        document.querySelector(".placeholderBookCard .author").innerHTML = document.querySelector(".bookAuthor").value;
        document.querySelector(".placeholderBookCard .year").innerHTML = document.querySelector(".bookYear").value;
    } else {
        return;
    }
})