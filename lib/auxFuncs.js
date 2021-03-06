module.exports = {
    //borrowedBooks returns the amount of copies of a book loaned
    borrowedBooks: (bookID, loansCollection) => {
        let cont = 0;
        for (let i = 0; i < loansCollection.length; i++) {
            if (loansCollection[i].bookId == bookID) {
                cont++;
            }
        }
        return cont;
    },

    //updateBook updates the amount of copies of a book
    updateBook: (bookID, amount, booksCollection, loansCollection) => {
        if (amount < 0) {
            return -1
        }
        if (amount >= module.exports.borrowedBooks(bookID, loansCollection)) {
            for (let i = 0; i < booksCollection.length; i++) {
                if (bookID == booksCollection[i].id) {
                    booksCollection[i].amount = amount;
                    return 1;
                }
            }
            return 0;
        }
        else {
            return -1;
        }
    },

    //findID finds the user of book by its id
    findID: (id, collection) => {
        for (let i = 0; i < collection.length; i++) {
            if (id == collection[i].id) {
                return collection[i];
            }
        }
        return false;
    },

    //debt returns true if user has books in debt, false if not
    debt: (userId, loans) => {
        for (let i = 0; i < loans.length; i++) {
            if (userId == loans[i].userId && loans[i].expiracyDate < Date.now()) {
                return true;
            }
        }
        return false;
    },

    //checkLoaned checks if books is in loan, returning true if it's true, false if it's not
    checkLoaned: (bookID, loans) => {
        for (let i = 0; i < loans.length; i++) {
            if (loans[i].bookId == bookID) {
                return true;
            }
        }
        return false;
    },

    //deleteBook deletes a book
    deleteBook: (id, books, loans) => {
        if (module.exports.checkLoaned(id, loans) == false) {
            for (let i = 0; i < books.length; i++) {
                if (id == books[i].id) {
                    books.splice(i, 1);
                    return 1;
                }
            }
            return 0;
        }
        else {
            return -1;
        }
    },

    //getLoansId returns all the current loans by a user via his id
    getLoansId: (userId, loansCollection) => {
        let loan = new Array();
        for (let i = 0; i < loansCollection.length; i++) {
            if (userId == loansCollection[i].userId) {
                loan.push({ "bookId": loansCollection[i].bookId, "expiracyDate": new Date(loansCollection[i].expiracyDate) });
            }
        }
        return loan;
    },

    //generateLoansID generates an unique id for a loan
    generateLoansID: () => {
        return Math.random().toString(36).substr(2, 9);
    },

    //returnBook eliminates an entry in loans structure
    returnBook: (loanId, loansCollection) => {
        for (let i = 0; i < loansCollection.length; i++) {
            if (loansCollection[i].id == loanId) {
                console.log("Book Found");
                console.log(loansCollection[i]);
                loansCollection.splice(i, 1);
                return true;
            }
        }
        return false;
    },
}