// a function to look up an author given their id number
// parameters:
  // an array of author objects
  // an id number
// return:
  // the author object associated with that id
function findAuthorById(authors, id) {
  return authors.find(author => id === author.id);
}

// a function to look up a book given its id number
// parameters:
  // an array of book objects
  // an id number
// return:
  // the book object associated with that id
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

// a function to divide borrowed and unborrowed books
// parameters:
  // an array of book objects
// return:
  // an array containing two arrays inside, one for borrowed one for unborrowed
function partitionBooksByBorrowedStatus(books) {
  const result = [];
  // if they're returned put them in one array, if not put them in another
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  const unborrowedBooks = books.filter(book => book.borrows[0].returned);
  // push the borrowed books then the unborrowed books to the return array
  result.push(borrowedBooks);
  result.push(unborrowedBooks);
  return result;
}

// a function to discover everyone who has borrowed a book
// parameters:
  // a book object
  // an array of account objects
// return:
  // an array of the most recent borrower account objects (10 max) formatted:
  /*
  {
      id: string,
      returned: boolean,
      picture: string(link),
      age: number,
      name: {
        first: string,
        last: string,
      },
      company: string,
      email: string(email address),
      registered: string(format ie:"Tuesday, April 14, 2020 9:15 PM"),
  }
  */
function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  // loop through borrows array, find borrower, and push formatted results to result array
  borrows.forEach(borrow => {
    // test for a maximum of 10 borrowers in the array
    if (result.length >= 10) return;

    const borrower = accounts.find(account => account.id === borrow.id);
    const formattedBorrow = {
      ...borrow,
      ...borrower,
    };
    result.push(formattedBorrow);
  });
  console.log(result);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
