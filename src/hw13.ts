type uuid = number;

interface INote
{
    id: uuid,
    title: string,
    content: string,
    createDate: Date,
    editedDate: Date | null;
    completed: boolean;
    update: ( payload: INoteUpdated ) => void;
    complete: () => void;
}

type INoteUpdated = Partial<Pick<INote, 'title' | 'content'>>;

interface AdditionalNoteProps
{
    changeable: boolean;
}

abstract class BaseNote<T extends Partial<AdditionalNoteProps> = {}> implements INote
{
    readonly id: uuid = Math.random() * ( 100 - 0 ) + 0;
    readonly createDate = new Date();
    editedDate: Date | null = null;
    completed = false;
    protected additionalProps: T;

    constructor ( public title: string, public content: string, additionalProps: T = {} as T )
    {
        this.additionalProps = additionalProps;
    }

    public complete (): void
    {
        this.completed = true;
    }

    public abstract update ( { title, content }: INoteUpdated ): void;
}

class Note extends BaseNote
{
    public update ( { title, content }: INoteUpdated ): void
    {
        if ( title?.trim() ) {
            this.title = title;
        }
        if ( content?.trim() ) {
            this.content = content;
        }
        this.editedDate = new Date();
    }
}

class NoteConfirm extends BaseNote<AdditionalNoteProps>
{
    public update ( { title, content }: INoteUpdated ): void
    {
        if ( this.additionalProps && this.additionalProps.changeable ) {
            if ( title?.trim() ) {
                this.title = title;
            }
            if ( content?.trim() ) {
                this.content = content;
            }
            this.editedDate = new Date();
        }
        throw new Error( `This note could not be changed` );
    }
}


const test = new Note( 'title', 'content' );
const testconfirm = new NoteConfirm( 'title', 'content', { changeable: true } );


interface iToDoList
{
    allCount: number;
    incompletedCount: number;

    create: ( title: string, content: string ) => void;
    removeNoteById: ( id: uuid ) => INote;
    modifyNote: ( id: uuid, payload: INoteUpdated ) => INote;
    getNoteById: ( id: uuid ) => INote;
    getAllNotes: () => INote[];
    complete: ( id: uuid ) => void;
}

class ToDoList implements iToDoList
{
    private notes: INote[] = [];

    get allCount (): number
    {
        return this.notes.length;
    }

    get incompletedCount (): number
    {
        return this.notes.filter( ( x ) => !x.completed ).length;
    }

    public create ( title: string, content: string ): void
    {
        if ( !title.trim() || !content.trim() ) {
            throw new Error( 'Note could not be empty' );
        }
        const newNote = new Note( title, content );
        this.notes.push( newNote );
    }

    public removeNoteById ( id: uuid ): INote
    {
        const noteIndex = this.getNoteIndex( id );
        const [removedNote] = this.notes.splice( noteIndex, 1 );
        return removedNote;
    }

    public modifyNote ( id: uuid, payload: INoteUpdated ): INote
    {
        const index = this.notes.findIndex( note => note.id === id );
        const note = this.notes[index];
        const oldNote = { ...note };
        note.update( payload );
        return oldNote;
    }

    public getNoteById ( id: uuid ): INote
    {
        const note = this.notes[this.getNoteIndex( id )];
        if ( !note ) {
            throw new Error( `No Note found` );
        }
        return note;
    }

    public getNoteIndex ( id: uuid ): number
    {
        const noteIndex = this.notes.findIndex( ( x ) => x.id === id );
        if ( ~~noteIndex ) {
            throw new Error( `$(id) is not defined` );
        }
        return noteIndex;
    }

    public getAllNotes (): INote[]
    {
        return this.notes;
    }

    public getNotesQuantity (): number
    {
        return this.notes.length;
    }

    public complete ( id: uuid ): void
    {
        const noteIndex = this.getNoteIndex( id );
        const note = this.notes[noteIndex];
        note.complete();
    }

    /*
        countNotesWithFalseStatus(): number;
        {
            return this.notes.filter( note => !note.status ).length;
        }
    
    
    noteSearch( query: string ): Note[];
    {
        const searchResults: Note[] = [];
    
        for ( const note of this.notes ) {
            if ( note.title.includes( query ) || note.content.includes( query ) ) {
                searchResults.push( note );
            }
        }
    
        return searchResults;
    }
    
    sortNotes( sortBy: 'status' | 'date' ): void
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
    */
}
