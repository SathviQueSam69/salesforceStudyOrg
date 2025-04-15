import { LightningElement, wire, track } from 'lwc';
import getParsedFauxMoviesApex from '@salesforce/apex/MovieService.getParsedFauxMovies';

export default class MovieListPage extends LightningElement {
    movies;
    error;

    @wire(getParsedFauxMoviesApex)
    wiredMovies({ error, data }) {
        if (data) {
            this.movies = data;
            this.error = undefined;
            console.log('Movies:', data);
            console.log('poster:', data[0].Poster);
        } else if (error) {
            this.error = error;
            this.movies = undefined;
            console.error('Error fetching movies:', error);
        }
    }

}

