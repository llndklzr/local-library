const { sortAccountsByLastName } = require("./accounts");
const { partitionBooksByBorrowedStatus } = require("./books");

// a function to count books
// parameter:
  // an array of book objects
// return:
  // number of book objects in parameter array
function totalBooksCount(books) {
  return books.length;
}

// a function to count accounts
// parameters:
  // an array of account objects
// return:
  // number of account objects
function totalAccountsCount(accounts) {
  return accounts.length;
}
// a function to count currently loaned out books
// parameters:
  // an array of book objects
// return: number of books currently out
function booksBorrowedCount(books) {
  const partitioned = partitionBooksByBorrowedStatus(books);
  return partitioned[0].length;
}

// makes a top 5 list of common genres
// parameters:
  // an array of book objects
// return: a most to least sorted top 5 list of genres
function getMostCommonGenres(books) {
  const genres = getAllGenres(books);
  const countList = [];
  
  genres.forEach(genre => {
    // list all the books of the given genre then push the count to the countList
    const genreBooks = books.filter(book => book.genre === genre);
    countList.push(genreBooks.length);
  });

  return makeSortedTopFiveNameCountArray(genres, countList);
}

// makes a top 5 list of popular books
// parameters:
  // an array of book objects
// return: a most to least sorted top 5 list of most borrowed books
function getMostPopularBooks(books) {
  const bookList = [];
  const countList = [];
  const bookIdList = [];

  books.forEach(book => {
    // test for books being listed multiple times
    if(!bookIdList.includes(book.id)){
      bookIdList.push(book.id);
      // make lists of titles and corresponding number of borrows
      bookList.push(book.title);
      countList.push(book.borrows.length);
    };
  });
  
  return makeSortedTopFiveNameCountArray(bookList, countList);
}

// makes a top 5 list of popular authors
// parameters:
  // an array of book objects
  // an array of author objects
// return:
  // a most to least sorted top 5 list of authors whose books are most borrowed
function getMostPopularAuthors(books, authors) {
  const authorList = [];
  const countList = [];
  const authorIdList = [];

  authors.forEach(author => {
    // test for authors being listed multiple times
    if (!authorIdList.includes(author.id)) {
    authorIdList.push(author.id);
    // make formatted list of author names
    authorList.push(`${author.name.first} ${author.name.last}`);
    // make list of author books, count borrows for each book
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBooksBorrows = authorBooks.map(book => book.borrows.length);
    // reduce array of borrows for each author book to a single number for all an author's borrows
    // add it it a countList that corresponds with the authorList
    countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  
  return makeSortedTopFiveNameCountArray(authorList, countList);
}

// HELPER FUNCTIONS

// a function to list all genres in a given array of books
// parameters:
  // an array of book objects
// return:
  // a list of all the genres included in the parameter array
function getAllGenres (books) {
  const genres = [];
  books.forEach(book => {
    // test for a genre being listed multiple times
    if (!genres.includes(book.genre)) genres.push(book.genre);
  });
  return genres;
}

// takes an array of descriptors and makes an array of objects in this format
// [{name: descriptop, count: 0}]
// parameters:
  // an array of names, and an array of counts (these should correspond by index)
// returns:
  // an array of objects
function makeNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}

// puts an array of name / count objects into order from highest to lowest count
// parameters:
  // an array of name / count objects
// returns:
  // the sorted parameter array
function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}

// a function to shorten a list to 5 or less items
// parameters:
  // an array
// return:
  // an array that is 5 or less items long
function topFive (list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}

// a function to create the formatted return for all the top 5 lists here
// parameters:
  //  an array of names, and an array of counts (these should correspond by index)
// return:
  // an array of objects similar to {name: foo, count: number}, sorted largest to smallest, at most 5 objects long
function makeSortedTopFiveNameCountArray (nameList, countList)
{
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
