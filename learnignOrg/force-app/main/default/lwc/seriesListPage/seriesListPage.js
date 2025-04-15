import { LightningElement, wire, track } from 'lwc';
import getParsedSeriesApex from '@salesforce/apex/TvShowService.getParsedSeries';
//import getParsedSeriesApex from '@salesforce/apex/RestCallouts.makeGetCallout';

export default class SeriesListPage extends LightningElement {
    series;
    error;

    @wire(getParsedSeriesApex)
    wiredMovies({ error, data }) {
        if (data) {
            this.series = data;
            this.error = undefined;
            console.log('Series:', data);
            console.log('Poster:',data[0].poster);
        } else if (error) {
            this.error = error;
            this.series = undefined;
            console.error('Error fetching series:', error);
        }
    }

}

