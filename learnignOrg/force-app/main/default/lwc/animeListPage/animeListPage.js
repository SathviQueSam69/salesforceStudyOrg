import { LightningElement, track } from 'lwc';

// Define columns for the datatable
const COLUMNS = [
    { label: 'Title', fieldName: 'title', type: 'text', sortable: true },
    { label: 'Genre', fieldName: 'genre', type: 'text', sortable: true },
    { label: 'Year', fieldName: 'releaseYear', type: 'number', sortable: true, cellAttributes: { alignment: 'left' } },
    { label: 'Director', fieldName: 'director', type: 'text', sortable: true },
    { label: 'Rating', fieldName: 'rating', type: 'number', sortable: true, typeAttributes: { minimumFractionDigits: '1', maximumFractionDigits: '1' } },
    // Example of adding a button/action - uncomment and add handler if needed
    // { type: 'button', typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details', variant: 'base' } }
];

export default class AnimeListPage extends LightningElement {
    @track movies = []; // Use @track for reactivity if data might change (e.g., sorting, filtering)
    @track columns = COLUMNS;

    // Store the original unsorted data
    allMovies = [];

    connectedCallback() {
        // Load initial data (replace with Apex/fetch call in real scenario)
        this.loadMovieData();
    }

    loadMovieData() {
        // Simulate fetching data
        this.allMovies = [
            { id: '1', title: 'One Piece', genre: 'Sci-Fi, Thriller', releaseYear: 2010, director: 'Christopher Nolan', rating: 8.8 },
            { id: '2', title: 'Dragon Ball', genre: 'Action, Crime, Drama', releaseYear: 2008, director: 'Christopher Nolan', rating: 9.0 },
            { id: '3', title: 'Naruto', genre: 'Sci-Fi, Adventure, Drama', releaseYear: 2014, director: 'Christopher Nolan', rating: 8.6 },
            { id: '4', title: 'Demon Slayer', genre: 'Comedy, Drama, Thriller', releaseYear: 2019, director: 'Bong Joon Ho', rating: 8.6 },
            { id: '5', title: 'Attack on Titan', genre: 'Animation, Adventure, Family', releaseYear: 2001, director: 'Hayao Miyazaki', rating: 8.6 },
            { id: '6', title: 'My Hero Academia', genre: 'Action, Sci-Fi', releaseYear: 1999, director: 'Lana Wachowski, Lilly Wachowski', rating: 8.7 },
            { id: '7', title: 'Haikyuu!!', genre: 'Crime, Drama', releaseYear: 1994, director: 'Quentin Tarantino', rating: 8.9 },
            { id: '8', title: 'BeyBlade', genre: 'Comedy, Drama, Romance', releaseYear: 1994, director: 'Robert Zemeckis', rating: 8.8 },
            // Add more movies...
        ];
        this.movies = [...this.allMovies]; // Initialize displayed movies
    }

    

    // Placeholder for row action handler (if action button column is added)
    // handleRowAction(event) {
    //     const actionName = event.detail.action.name;
    //     const row = event.detail.row;
    //     switch (actionName) {
    //         case 'view_details':
    //             console.log('View details for:', row.title);
    //             // Navigate to detail page or show modal
    //             break;
    //         default:
    //     }
    // }
}