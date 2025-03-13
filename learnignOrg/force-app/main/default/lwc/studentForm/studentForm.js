import { LightningElement, track } from 'lwc'; 
import createRecordApex from '@salesforce/apex/StudentFormRecord.createRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordForm extends LightningElement {
    @track record = {
        Name: '',
        Age__c: '',
        Phone__c: ''
    };

    @track error;

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.record[field] = event.target.value;
    }

    handleSubmit() {
        this.error = null;
        createRecordApex({ record: this.record })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record created successfully',
                        variant: 'success'
                    })
                );
                // Clear the form after successful submission
                this.record = {
                    Name: '',
                    Age__c: '',
                    Phone__c: ''
                };
                window.location.reload();
            })
            
            .catch(error => {
                this.error = error.body.message;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}