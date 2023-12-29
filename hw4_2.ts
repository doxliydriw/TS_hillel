// Інтерфейс Book
interface Author
{
    id: number;
    name: string;
    birthDate: string;
}

// Інтерфейс Author
interface Book
{
    id: number;
    title: string;
    author: Author;
    publicationDate: string;
}

// Інтерфейс BookService
interface BookService
{
    getBooks (): Book[];
    getAuthors (): Author[];
    searchBook ( query: string ): Book[];
    searchAuthor ( authorName: string ): Author | undefined;
}

// Об'єкт bookService, який імітує роботу веб-сервісу, і використовуйте інтерфейси для отримання інформації про книги та авторів.
const bookService: BookService = {
    getBooks: () => [
        { id: 1, title: 'The Silmarillion', author: { id: 1, name: 'John Ronald Reuel Tolkien', birthDate: '03-01-1892' }, publicationDate: '01-01-1977' },
        { id: 2, title: 'Eneida', author: { id: 2, name: 'Ivan Petrovych Kotliarevsky', birthDate: '1769-08-29' }, publicationDate: '01-01-1798' },
    ],
    getAuthors: () => [
        { id: 1, name: 'John Ronald Reuel Tolkien', birthDate: '03-01-1892' },
        { id: 2, name: 'Ivan Petrovych Kotliarevsky', birthDate: '1769-08-29' },
    ],
    searchBook: function ( query: string ): Book[]
    {
        query = query.toLowerCase();
        return this.getBooks().filter(
            book => book.title.toLowerCase().includes( query ) || book.author.name.toLowerCase().includes( query )
        );
    },
    searchAuthor: function ( authorName: string ): Author | undefined
    {
        const searchAuthorByName = authorName.toLowerCase();
        return this.getAuthors().find( author => author.name.toLowerCase().includes( searchAuthorByName ) );
    }

};

const books = bookService.getBooks();
const authors = bookService.getAuthors();
const searchQuery = bookService.searchBook( 'john' );
const seacrhAuthor = bookService.searchAuthor( 'ivan' );

console.log( '1: ', 'Books:', books );
console.log( '2: ', 'Authors:', authors );
console.log( '3: ', searchQuery );
console.log( '4: ', seacrhAuthor );