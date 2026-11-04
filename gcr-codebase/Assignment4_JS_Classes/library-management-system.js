// Q3: Library Management System (Classes + Objects)
// Manages a collection of books, tracks borrowing state, and facilitates checkouts by ISBN.

class Book {
  constructor(title, author, ISBN, isIssued = false) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.isIssued = isIssued;
  }

  // Method to issue the book
  issueBook() {
    if (this.isIssued) {
      console.log(`[SORRY] "${this.title}" is already issued to someone else.`);
      return false;
    }
    this.isIssued = true;
    console.log(`[SUCCESS] "${this.title}" (ISBN: ${this.ISBN}) has been successfully issued.`);
    return true;
  }

  // Method to return the book
  returnBook() {
    if (!this.isIssued) {
      console.log(`[INFO] "${this.title}" was not issued. Already in library.`);
      return false;
    }
    this.isIssued = false;
    console.log(`[SUCCESS] "${this.title}" has been returned and is now available.`);
    return true;
  }

  // Summary helper
  getInfo() {
    const status = this.isIssued ? "Issued" : "Available";
    return `[${status.padEnd(9)}] "${this.title}" by ${this.author} (ISBN: ${this.ISBN})`;
  }
}

// Create an array of book objects
const library = [
  new Book("Eloquent JavaScript", "Marijn Haverbeke", "9781593279509"),
  new Book("You Don't Know JS", "Kyle Simpson", "9781491904244"),
  new Book("JavaScript: The Good Parts", "Douglas Crockford", "9780596517748", true), // already issued
  new Book("Clean Code", "Robert C. Martin", "9780132350884"),
  new Book("Design Patterns", "Erich Gamma et al.", "9780201633610")
];

// Display all available books
function displayAvailableBooks(books) {
  console.log("\n--- Available Books in Library ---");
  const available = books.filter((b) => !b.isIssued);
  if (available.length === 0) {
    console.log("No books are currently available.");
  } else {
    available.forEach((b) => console.log(b.getInfo()));
  }
}

// Allow a user to issue a book by searching ISBN
function issueBookByISBN(books, searchISBN) {
  console.log(`\nSearching for ISBN: ${searchISBN}...`);
  const foundBook = books.find((b) => b.ISBN === searchISBN);

  if (!foundBook) {
    console.log(`[NOT FOUND] No book with ISBN "${searchISBN}" found in library catalogue.`);
    return null;
  }

  foundBook.issueBook();
  return foundBook;
}

// ---------------- Execution / Demonstration ----------------
console.log("================ LIBRARY CATALOGUE ================");
library.forEach((book) => console.log(book.getInfo()));

// Display initially available books
displayAvailableBooks(library);

// Issue a book by ISBN (Clean Code)
issueBookByISBN(library, "9780132350884");

// Attempt to issue a book that is already issued (JS: The Good Parts)
issueBookByISBN(library, "9780596517748");

// Attempt to issue a non-existent ISBN
issueBookByISBN(library, "1111111111111");

// Display updated available books
displayAvailableBooks(library);

// Return the book
console.log("\n--- Returning a Book ---");
library[3].returnBook();

// Final check
displayAvailableBooks(library);
