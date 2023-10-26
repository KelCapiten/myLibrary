function book (bookNum, read, name, author, pages, genre, year, rating, cover) {
    this.bookNum = bookNum
    this.read = read
    this.name = name
    this.author = author
    this.pages = pages
    this.genre = genre
    this.year = year
    this.rating = rating
    this.cover = cover
    this.readIndicator = () => {
        if (this.read == true) {
            return "#32CD32"
        } else {
            return "black"
        }
    }
    this.selectBook = () => {
    }
}

const book1 = new book("1", true, "The Lord of the Rings", "J.R.R. Tolkien", 1178, "Fantasy", 1954, 4.5, "url(images/lotr.jpg)")
const book2 = new book("2", false, "The Catcher in the Rye", "J.D. Salinger", 277, "Coming-of-age", 1951, 3.8, "url(images/acitr.jpg)")
const book3 = new book("3", true, "The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 216, "Science fiction", 1979, 4.2, "url(images/hhgto.jpg)")
const book4 = new book("4", true, "The Kite Runner", "Khaled Hosseini", 372, "Historical fiction", 2003, 4.3, "url(images/tkr.jpg)")
const book5 = new book("5", true, "Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, "Fantasy", 1997, 4.5, "url(images/hpatfs.jpg)")
const book6 = new book("6", false, "To Kill a Mockingbird", "Harper Lee", 281, "Southern Gothic", 1960, 4.3, "url(images/tkamb.jpg)")

const books = [book1, book2, book3, book4, book5, book6]

function addBookToArray() {
    
}

function displayBookInfo(books) {

    const bookSection = document.querySelectorAll(".bookCard")

    let count = 0

    bookSection.forEach(section => {
        let book = books[count]
        const name = section.querySelector(".name")
        const author = section.querySelector(".author")
        const year = section.querySelector(".year")
        const wallpaper = section.querySelector(".section1")

        name.innerHTML = `${book.name}`
        author.innerHTML = `${book.author}`
        year.innerHTML = `${book.year}`
        wallpaper.style.backgroundImage = `${book.cover}`

        name.style.color = book.readIndicator()

        count++
    });

}

displayBookInfo(books)

document.querySelector(".div1").addEventListener('click', (event) => {
    const div2 = document.querySelector(".div2")
    const wallpaper = event.target.style.backgroundImage

    div2.style.backgroundImage = wallpaper
    div2.querySelector(".bookTittle").innerHTML = event.target.nextElementSibling.children[0].children[0].innerHTML
})