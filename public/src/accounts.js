const { findAuthorById } = require("./books");

// a function to find an account given a certain ID
// parameters:
  // an array of account objects
  // an account ID
// return:
  // the account object which matches the ID
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

// sort an array of accounts alphabetically by last name
// parameters:
  // an array of accounts
// return:
  // the sorted array
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
}

// a function to count how many times a user has borrowed books
// parameters:
  // an account object
  // an array of book objects
// return:
  // the number of books borrowed
function numberOfBorrows(account, books) {
  let count = 0;
  // look at each book, filter the array to only be the id we're looking at, add array length to count
  books.forEach(book => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
  });
  return count;
}

// a function to learn all books currently checked out by given account
// parameters:
  // an account
  // an array of book objects
  // an array of author objects
// return:
  // an object (a book with the author embedded inside it between authorId and borrows)
function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
  const result = [];
  borrowedBooks.forEach(book => {
    const bookAuthor = findAuthorById(authors, book.authorId);
    result.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  return result;
}

// HELPER FUNCTIONS

// a function to look up borrows of a given book by a particular account
// parameters:
  // a book object
  // an id, deconstructed from an account argument
// return:
  // a list of borrows by the provided account id
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
