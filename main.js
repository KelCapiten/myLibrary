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

const book1 = new book("1", false, "The Lord of the Rings", "J.R.R. Tolkien", 1178, "Fantasy", 1954, 4.5, "url(images/lotr.jpg)");
const book2 = new book("2", false, "The Catcher in the Rye", "J.D. Salinger", 277, "Coming-of-age", 1951, 3.8, "url(images/acitr.jpg)");
const book3 = new book("3", true, "The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 216, "Science fiction", 1979, 4.2, "url(images/hhgto.jpg)");
const book4 = new book("4", false, "The Kite Runner", "Khaled Hosseini", 372, "Historical fiction", 2003, 4.3, "url(images/tkr.jpg)");
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
            if (currentBook.read) {
                section.querySelector(".readTrackBall").style.marginLeft = "auto";
                section.querySelector(".readSlider").style.backgroundColor = "#32CD32";
            }

            count++;
        })
    };

    func(booksArray);  // Immediately invoke the function with booksArray
    return func;  // Return the function reference
})();

function adjustDivOffset() {
    let nodelist = document.querySelectorAll(".bookCard")
    let count = 0;

    nodelist.forEach(node => {
        let offset = count*50;
        node.style.right = `${offset}px`;
        count++;
    })
}

let clicked = false;

document.querySelector(".addBook").addEventListener('mouseover', () => {
    document.querySelector(".addBookDiv").classList.add('addBookDivHover');
})
document.querySelector(".addBook").addEventListener('mouseout', () => {
    if (clicked) {
        return;
    } else {
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');
        return;
    }
})
document.addEventListener('click', (event) => {
    if (!(event.target.style.backgroundImage == "")) {
        document.querySelector(".div2").style.backgroundImage = event.target.style.backgroundImage;
        document.querySelector(".bookTittle").innerHTML = event.target.nextElementSibling.children[0].children[0].innerHTML;
        return;
    }

    if (event.target == document.querySelector(".addBook > img") && clicked) {
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');
        document.querySelector(".addBook").style.backgroundColor = "rgba(105, 170, 201, 0.836)";
        document.querySelector(".cover").classList.remove("dim");
        document.querySelector(".placeholderBookCard").classList.remove("placeholderBookCardActive");
        clicked = false;
        return
    }

    if (event.target.classList.contains("deleteBTN") && !(event.target.classList.contains("card0"))) {
        let bookCardNumber = event.target.classList[1];
        let bookIndex = bookCardNumber[bookCardNumber.length-1]-1;
        booksArray.splice(bookIndex, 1);
        document.querySelector(`.${event.target.classList[1]}`).remove();
        displayBooks(booksArray);
        adjustDivOffset();
        return;
    }
        
    function handleReadSlider(event) {
        if (event.target.children[0].style.marginLeft == "auto") {
            event.target.children[0].style.marginLeft = "";
            event.target.children[0].style.marginRight = "";
            event.target.style.backgroundColor = "black";

            let bookCardNumber = event.target.classList[1];
            if (bookCardNumber === undefined) {
                document.querySelector(".card0name").style.color = "black";
                return false;
            }
            let bookIndex = bookCardNumber[bookCardNumber.length-1]-1;
            booksArray[bookIndex].read = false;
            displayBooks(booksArray);
        } else {
            event.target.children[0].style.marginRight = "";
            event.target.children[0].style.marginLeft = "auto";
            event.target.style.backgroundColor = "#32CD32";

            let bookCardNumber = event.target.classList[1];
            if (bookCardNumber === undefined) {
                document.querySelector(".card0name").style.color = "#32CD32";
                return true;
            }
            let bookIndex = bookCardNumber[bookCardNumber.length-1]-1;
            booksArray[bookIndex].read = true;
            displayBooks(booksArray);
        }
    }
    
    function handleReadTrackBall(event) {
        if (event.target.style.marginLeft == "auto") {
            event.target.style.marginLeft = "";
            event.target.style.marginRight = "";
            event.target.parentElement.style.backgroundColor = "black";

            let bookCardNumber = event.target.classList[1];
            if (bookCardNumber === undefined) {
                document.querySelector(".card0name").style.color = "black";
                return false;
            }
            let bookIndex = bookCardNumber[bookCardNumber.length-1]-1;
            booksArray[bookIndex].read = false;
            displayBooks(booksArray);
        } else {
            event.target.style.marginRight = "";
            event.target.style.marginLeft = "auto";
            event.target.parentElement.style.backgroundColor = "#32CD32";

            let bookCardNumber = event.target.classList[1];
            if (bookCardNumber === undefined) {
                document.querySelector(".card0name").style.color = "#32CD32";
                return true;
            }
            let bookIndex = bookCardNumber[bookCardNumber.length-1]-1;
            booksArray[bookIndex].read = true;
            displayBooks(booksArray);
        }
    }
    
    if (event.target.classList.contains("readSlider")) {
        handleReadSlider(event);
        return;
    } else if (event.target.classList.contains("readTrackBall")) {
        handleReadTrackBall(event);
        return;
    }

    if (event.target.classList.contains("doneBTN")) {
        let newBookNumber = booksArray.length + 1;
        let bookName = document.querySelector(".bookName").value;
        let bookAuthor = document.querySelector(".bookAuthor").value;
        let bookYear = document.querySelector(".bookYear").value;
        let newCard = document.querySelector(".card1").cloneNode(true);

        newCard.classList.remove("card1");
        newCard.classList.add(`card${newBookNumber}`);
        newCard.querySelector(".readSlider").classList.remove(`card1`);
        newCard.querySelector(".readTrackBall").classList.remove(`card1`);
        newCard.querySelector(".deleteBTNdiv").classList.remove(`card1`);
        newCard.querySelector(".deleteBTN").classList.remove(`card1`);
        newCard.removeAttribute('id');

        newCard.querySelector(".deleteBTNdiv").classList.add(`card${newBookNumber}`);
        newCard.querySelector(".deleteBTN").classList.add(`card${newBookNumber}`);
        newCard.querySelector(".readSlider").classList.add(`card${newBookNumber}`);
        newCard.querySelector(".readTrackBall").classList.add(`card${newBookNumber}`);
        newCard.id = `${newBookNumber}`;

        newCard.style.right = `${(newBookNumber-1)*50}px`;
        newCard.querySelector(".section1").style.backgroundImage = "";

        document.querySelector(".div1").insertBefore(newCard, document.querySelector(".card0"));

        const newBook = new book(newBookNumber, false, bookName, bookAuthor, 0, "N/A", bookYear, "N/A", "N/A");
        booksArray.push(newBook);
        displayBooks(booksArray);

        clicked = false;
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');
        document.querySelector(".placeholderBookCard").classList.remove("placeholderBookCardActive");
        document.querySelector(".addBook").style.backgroundColor = "rgba(105, 170, 201, 0.836)";
        document.querySelector(".cover").classList.remove("dim");
        return;
    }
    if (event.target == document.querySelector(".addBook > img") || event.target.localName == "input" || event.target.localName == "legend" || event.target.localName == "fieldset" || event.target.localName == "h3") {
        clicked = true;
        document.querySelector(".addBook").style.backgroundColor = "white";
        document.querySelector(".cover").classList.add("dim");
        document.querySelector(".placeholderBookCard").classList.add("placeholderBookCardActive");
        document.querySelector(".addBookDiv").classList.add('addBookDivHover');
    } else {
        clicked = false;
        document.querySelector(".addBookDiv").classList.remove('addBookDivHover');
        document.querySelector(".placeholderBookCard").classList.remove("placeholderBookCardActive");
        document.querySelector(".addBook").style.backgroundColor = "rgba(105, 170, 201, 0.836)";
        document.querySelector(".cover").classList.remove("dim");
        return;
    }
})
document.addEventListener('keyup', (event) => {
    if (document.activeElement.localName == "input") {
        document.querySelector(".bookTittle").innerHTML = document.querySelector(".bookName").value;
        document.querySelector(".placeholderBookCard .card0name").innerHTML = document.querySelector(".bookName").value;
        document.querySelector(".placeholderBookCard .author").innerHTML = document.querySelector(".bookAuthor").value;
        document.querySelector(".placeholderBookCard .year").innerHTML = document.querySelector(".bookYear").value;
    } else {
        return;
    }
})