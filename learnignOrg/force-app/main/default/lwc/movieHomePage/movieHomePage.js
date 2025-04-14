import { LightningElement } from 'lwc';

export default class MovieHomePage extends LightningElement {
    // Hardcoded movie data (replace with actual data fetching)
    movies = [
        {
            id: '1',
            title: 'Inception',
            genre: 'Sci-Fi, Thriller',
            releaseYear: 2010,
            posterUrl: '/img/my_photo.jpg', // Placeholder - Replace with actual image URL or static resource
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology...'
        },
        {
            id: '2',
            title: 'The Dark Knight',
            genre: 'Action, Crime, Drama',
            releaseYear: 2008,
            posterUrl: '/img/my_photo.jpg', // Placeholder
            description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...'
        },
        {
            id: '3',
            title: 'Interstellar',
            genre: 'Sci-Fi, Adventure, Drama',
            releaseYear: 2014,
            posterUrl: '/img/my_photo.jpg', // Placeholder
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
        },
        {
            id: '4',
            title: 'Parasite',
            genre: 'Comedy, Drama, Thriller',
            releaseYear: 2019,
            posterUrl: '/img/my_photo.jpg', // Placeholder
            description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'
        },
         {
            id: '5',
            title: 'Spirited Away',
            genre: 'Animation, Adventure, Family',
            releaseYear: 2001,
            posterUrl: '/img/my_photo.jpg', // Placeholder
            description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits...'
        },
         {
            id: '6',
            title: 'The Matrix',
            genre: 'Action, Sci-Fi',
            releaseYear: 1999,
            posterUrl: '/img/my_photo.jpg', // Placeholder
            description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
        }
        // Add more movies as needed
    ];

    // Optional: Handle clicks on movie tiles (e.g., navigate to detail page)
    handleMovieClick(event) {
        const movieId = event.currentTarget.dataset.movieid;
        console.log('Clicked Movie ID:', movieId);

        // Find the movie details based on ID
        const selectedMovie = this.movies.find(movie => movie.id === movieId);
        console.log('Selected Movie Details:', selectedMovie);

        // Placeholder for navigation or showing details
        // In a real app, you might fire an event or use NavigationMixin
        // For now, we'll just log it.
        alert(`You clicked on: ${selectedMovie.title}`);
    }

    handleMoviesList(){
        window.location.assign('https://sangipagisandbox-dev-ed.develop.my.site.com/movies');
    }
    handleSeriesList(){
        window.location.assign('https://sangipagisandbox-dev-ed.develop.my.site.com/series');
    }
    handleAnimesList(){
        window.location.assign('https://sangipagisandbox-dev-ed.develop.my.site.com/animes');
    }
}