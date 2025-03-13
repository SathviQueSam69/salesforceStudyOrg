import { LightningElement, wire } from 'lwc';
import getRecords from '@salesforce/apex/studentData.getRecords';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone__c' }, // Replace with your field API names
    { label: 'Age', fieldName: 'Age__c' }
];

export default class RecordTable extends LightningElement {
    records;
    columns = COLUMNS;
    error;
    isLoading = true;

    @wire(getRecords)
    wiredRecords({ error, data }) {
        if (data) {
            this.records = data;
            this.error = undefined;
            this.isLoading = false;
        } else if (error) {
            this.error = error;
            this.records = undefined;
            this.isLoading = false;
        }
    }
}