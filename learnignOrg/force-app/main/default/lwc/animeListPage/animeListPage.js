import { LightningElement, wire, track } from 'lwc';
import getanimeData from '@salesforce/apex/AnimeService.getParsedAnimes';
import getRecords from '@salesforce/apex/AnimeRecords.getRecords';

export default class AnimeListPage extends LightningElement {
    animes;
    error;
    @track paginatedRecords = [];
    @track currentPage = 1;
    animeLength;
    pageSize = 10;
    totalPages = 0;

    @wire(getRecords)
    wiredMovies({ error, data }) {
        if (data) {
            this.animes = data;
            this.error = undefined;
            this.animeLength = Object.keys(this.animes).length;
            this.totalPages = Math.ceil(this.animeLength / this.pageSize);
            this.setPage(1);
            console.log('animes:', data);
            console.log('poster:', data.poster);
        } else if (error) {
            this.error = error;
            this.movies = undefined;
            console.error('Error fetching movies:', error);
        }
    }

    setPage(pageNumber) {
        this.currentPage = pageNumber;
        const start = (pageNumber - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.paginatedRecords = this.animes.slice(start, end);
    }

    handlePrev() {
        if (this.currentPage > 1) {
            this.setPage(this.currentPage - 1);
        }
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.setPage(this.currentPage + 1);
        }
    }

}

