import { LightningElement, wire, track } from 'lwc';
import getanimeData from '@salesforce/apex/AnimeService.getParsedAnimes';

export default class AnimeListPage extends LightningElement {
    animes;
    error;

    @wire(getanimeData)
    wiredMovies({ error, data }) {
        if (data) {
            this.animes = data;
            this.error = undefined;
            console.log('animes:', data);
            console.log('poster:', data.poster);
        } else if (error) {
            this.error = error;
            this.movies = undefined;
            console.error('Error fetching movies:', error);
        }
    }

}

