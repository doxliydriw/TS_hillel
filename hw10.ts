/* 
У вас є дві сутності - список фільмів і список категорій фільмів.
*/

//У кожного списку є пошук за ім'ям (це, по суті, фільтрація), 
//це саме MatchFilter в обох типів. 
//у списку фільмів є додаткова фільтрація за роком випуску, 
//рейтингом і нагородами.;
//це саме для ValueSearchFilter та RangeFilter для MovieList.
type MovieList = List<Movie> & {
    applySearchValue ( filter: ValueSearchFilter<string> | RangeFilter<number> | MatchFilter<string> ): void;
};

type CategoryList = List<Category> & {
    applySearchValue ( filter: MatchFilter<string> ): void;
};

/*
Кожен фільм містить поля: 
    назва,
    рік випуску,
    рейтинг,
    список нагород.;
*/
type Movie = {
    title: string;
    releaseYear: number;
    rating: number;
    awardsList: string[];
};

/*
Категорія містить поля:     
    назва 
    і фільми.
*/
type Category = {
    name: string;
    moviesList: Movie[];
};

/*
У кожного списку є пошук за ім'ям (це, по суті, фільтрація), 
у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.
*/
//У нас визначено три типи фільтрів:
//Фільтр відповідності має поле filter
type MatchFilter<T> = { filter: T; };
//Фільтр діапазону має поле filter і filterTo
type RangeFilter<T> = { filter: T; filterTo: T; };
//Фільтр пошуку за значеннями має поле values
type ValueSearchFilter<T> = { values: T[]; };


type MovieListFilters = MatchFilter<string> | RangeFilter<number> | ValueSearchFilter<string>;
type CategoryListFilters = MatchFilter<string> | RangeFilter<number> | ValueSearchFilter<string>;


/*
Кожен список містить стан його фільтрів,
який може бути змінений тільки методом
applySearchValue
або applyFiltersValue
(за наявності додаткових фільтрів)
*/

type List<T> = {
    items: T[];
    filters: T extends Movie ? MovieListFilters : T extends Category ? CategoryListFilters : never;
    applyFiltersValue ( filter: T extends Movie ? MovieListFilters : CategoryListFilters ): void;
    applySearchValue ( filter: ValueSearchFilter<string> ): void;
};
