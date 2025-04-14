import { LightningElement, wire, track } from 'lwc';
import getParsedSeriesApex from '@salesforce/apex/TvShowService.getSeriesData';

export default class SeriesListPage extends LightningElement {
    series;
    error;

    @wire(getParsedSeriesApex)
    wiredMovies({ error, data }) {
        if (data) {
            this.series = data;
            this.error = undefined;
            console.log('Series:', data);
        } else if (error) {
            this.error = error;
            this.series = undefined;
            console.error('Error fetching series:', error);
        }
    }

}

