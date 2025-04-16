import { LightningElement, wire, track } from 'lwc';
import getParsedFauxMoviesApex from '@salesforce/apex/MovieService.getParsedFauxMovies';
import getRecords from '@salesforce/apex/MovieRecords.getRecords';

export default class MovieListPage extends LightningElement {
    movies;
    error;
    @track paginatedRecords = [];
    @track currentPage = 1;
    movieLength;
    pageSize = 10;
    totalPages = 0;

    @wire(getRecords)
    wiredMovies({ error, data }) {
        if (data) {
            this.movies = data;
            this.error = undefined;
            this.movieLength = Object.keys(this.movies).length;
            this.totalPages = Math.ceil(this.movieLength / this.pageSize);
            console.log('Movies:', data);
            console.log('poster:', data[0].Poster);
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
        this.paginatedRecords = this.movies.slice(start, end);
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

