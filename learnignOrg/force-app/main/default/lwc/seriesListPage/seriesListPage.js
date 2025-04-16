import { LightningElement, wire, track } from 'lwc';
import getParsedSeriesApex from '@salesforce/apex/TvShowService.getParsedSeries';
import getRecordsFromObject from '@salesforce/apex/TvShowRecords.getRecords';

export default class SeriesListPage extends LightningElement {
    series;
    error;
    @track paginatedRecords = [];
    @track currentPage = 1;
    seriesLength;
    pageSize = 10;
    totalPages = 0;

    @wire(getRecordsFromObject)
    wiredMovies({ error, data }) {
        if (data) {
            this.series = data;
            this.error = undefined;
            this.seriesLength = Object.keys(this.series).length;
            this.totalPages = Math.ceil(this.seriesLength / this.pageSize);
            console.log('Series:', data);
            console.log('Poster:',data[0].poster);
        } else if (error) {
            this.error = error;
            this.series = undefined;
            console.error('Error fetching series:', error);
        }
    }

    setPage(pageNumber) {
        this.currentPage = pageNumber;
        const start = (pageNumber - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.paginatedRecords = this.series.slice(start, end);
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

