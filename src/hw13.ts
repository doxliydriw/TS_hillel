class Note
{
    constructor (
        public id: number,
        public title: string,
        public content: string,
        public accessStatus: boolean,
        public createDate: Date = new Date(),
        public editedDate: Date = new Date(),
        public status: boolean = false
    ) { }

    changeStatus ( newStatus: boolean ): void
    {
        this.status = newStatus;
    }
}

class ToDoList
{
    private notes: Note[];

    constructor ()
    {
        this.notes = [];
    }

    addNewNote ( title: string, content: string, accessStatus: boolean ): void
    {
        if ( content.length < 0 ) {
            const id = this.notes.length + 1;
            const newNote = new Note( id, title, content, accessStatus );
            this.notes.push( newNote );
        }
        throw new Error( 'Note could not be empty' );
    }

    removeNoteById ( id: number ): void
    {
        this.notes = this.notes.filter( note => note.id !== id );
    }

    modifyNote ( id: number, title: string, content: string, accessStatus: boolean ): void
    {
        const index = this.notes.findIndex( note => note.id === id );
        if ( index !== -1 ) {
            if ( this.notes[index].accessStatus ) {
                this.notes[index].title = title;
                if ( content.length > 0 ) {
                    this.notes[index].content = content;
                    this.notes[index].accessStatus = accessStatus;
                    this.notes[index].editedDate = new Date();
                }
                throw new Error( 'Note could not be empty' );
            }
            throw new Error( 'This Note could not be edited' );
        }
    }

    getNoteDetailsById ( id: number ): Note | undefined
    {
        return this.notes.find( note => note.id === id );
    }

    getAllNotes (): Note[]
    {
        return this.notes;
    }

    changeNoteStatusById ( id: number, newStatus: boolean ): void
    {
        const note = this.getNoteDetailsById( id );
        if ( note ) {
            note.changeStatus( newStatus );
        } else {
            console.log( `Note with ID ${id} not found.` );
        }
    }


    getNotesQuantity (): number
    {
        return this.notes.length;
    }


    countNotesWithFalseStatus (): number
    {
        return this.notes.filter( note => !note.status ).length;
    }


    noteSearch ( query: string ): Note[]
    {
        const searchResults: Note[] = [];

        for ( const note of this.notes ) {
            if ( note.title.includes( query ) || note.content.includes( query ) ) {
                searchResults.push( note );
            }
        }

        return searchResults;
    }

    sortNotes ( sortBy: 'status' | 'date' ): void
    {
        if ( sortBy === 'status' ) {
            this.notes.sort( ( a, b ) =>
            {
                if ( a.status === b.status ) {
                    return a.createDate.getTime() - b.createDate.getTime();
                }
                return a.status ? 1 : -1;
            } );
        } else if ( sortBy === 'date' ) {
            this.notes.sort( ( a, b ) => a.createDate.getTime() - b.createDate.getTime() );
        } else {
            throw new Error( 'Please insert date or status' );
        }
    }

}
