import { LightningElement } from 'lwc';

export default class DeleteFunctionality extends LightningElement {
    cardData = [];
    lastDeletedCard = null; // Property to store the last deleted card's data

    connectedCallback() {
        this.generateCardData();
    }

    generateCardData() {
        const data = [];
        for (let i = 1; i <= 12; i++) {
            data.push({
                id: i,
                title: `Card ${i}`,
                iconName: 'standard:account',
                description: `This is the detailed description for Card number ${i}.`
            });
        }
        this.cardData = data;
        this.lastDeletedCard = null; // Reset when generating fresh data
    }

    // Getter to check if there are any cards currently displayed
    get hasCards() {
        return this.cardData && this.cardData.length > 0;
    }

    // Getter to determine if the Create button should be disabled
    get isCreateDisabled() {
        // Disable button if no card has been deleted yet OR if cards are already showing
        return !this.lastDeletedCard || this.hasCards;
        // Simplified based on context: Button only shows when hasCards is false,
        // so only need to check if lastDeletedCard has data.
        // return !this.lastDeletedCard;
    }


    // --- MODIFIED Delete Handler ---
    handleDeleteClick(event) {
        const cardIdToDelete = parseInt(event.target.dataset.id, 10);

        // Find the card object being deleted *before* filtering
        const deletedCard = this.cardData.find(card => card.id === cardIdToDelete);

        // Store its data if found
        if (deletedCard) {
            this.lastDeletedCard = deletedCard;
        }

        // Filter the array to remove the card
        this.cardData = this.cardData.filter(card => card.id !== cardIdToDelete);
    }

    // --- NEW Handler for the Create button ---
    handleRecreateClick() {
        // Check if there is data stored for the last deleted card
        if (this.lastDeletedCard) {
            // Add the last deleted card back to the array
            // Create a new array reference for reactivity
            this.cardData = [...this.cardData, this.lastDeletedCard];

            // Clear the stored data so it can't be added again immediately
            // and the button becomes disabled again if no other card was deleted since.
            this.lastDeletedCard = null;
        }
    }
}