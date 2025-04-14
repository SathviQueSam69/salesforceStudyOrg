import { LightningElement, track } from 'lwc';
// *** STEP 1: Import Apex method (uncomment when you have Apex) ***
// import loginUser from '@salesforce/apex/UserLoginController.loginUser';

// *** Optional: Import ShowToastEvent for notifications ***
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LoginPage extends LightningElement {
    // Use @track for properties that, when changed, should cause the component to re-render
    @track username = '';
    @track password = '';
    @track errorMessage = '';
    @track isProcessing = false; // To control spinner and button state

    // Handles changes in the input fields
    handleInputChange(event) {
        const fieldName = event.target.name;
        const value = event.target.value;

        if (fieldName === 'username') {
            this.username = value;
        } else if (fieldName === 'password') {
            this.password = value;
        }
        // Clear previous error message when user types
        this.errorMessage = '';
    }

    // Handles the Login button click
    handleLogin() {
        // Basic Client-Side Validation
        if (!this.username || !this.password) {
            this.errorMessage = 'Please enter both username and password.';
            return; // Stop execution if fields are empty
        }

        this.isProcessing = true; // Show spinner, disable button
        this.errorMessage = '';   // Clear previous errors

        // *** STEP 2: Call Apex method for actual login ***
        // Replace this simulation with an Apex call
        console.log('Attempting login with:');
        console.log('Username:', this.username);
        // NEVER log password in real code
        // console.log('Password:', this.password);

        // --- SIMULATED APEX CALL ---
        // In a real scenario, you'd call an Apex method here:
        
        loginUser({ username: this.username, password: this.password })
            .then(result => {
                // Handle successful login (e.g., navigate to another page, show success message)
                console.log('Login successful:', result);
                this.isProcessing = false;
                window.location.href ='https://sangipagisandbox-dev-ed.develop.my.site.com/movies'; // Simple redirect (consider implications)
                this.showToast('Success', 'Login Successful!', 'success');

                // Example: Redirect to home page (if this component isn't already on it)
                // You might need NavigationMixin for more complex navigation
                 //window.location.assign('https://sangipagisandbox-dev-ed.develop.my.site.com/movies'); // Simple redirect (consider implications)

            })
            .catch(error => {
                // Handle login failure (show error message)
                console.error('Login failed:', error);
                this.isProcessing = false;
                // Extract a user-friendly error message from the Apex exception
                this.errorMessage = this.reduceErrors(error).join(', ');
                this.showToast('Error', this.errorMessage, 'error');
            });
        }
        

        // --- Simulation Only (Remove this section when using Apex) ---
    /*    setTimeout(() => {
            if (this.username === 'test@example.com' && this.password === 'password123') {
                console.log('Simulated Login Successful');
                this.showToast('Success', 'Simulated Login Successful!', 'success');
                // Optionally clear fields after successful login
                // this.username = '';
                // this.password = '';
            } else {
                console.log('Simulated Invalid Credentials');
                this.errorMessage = 'Invalid username or password.';
                this.showToast('Error', this.errorMessage, 'error');
            }
            this.isProcessing = false; // Hide spinner, enable button
        }, 1500); // Simulate network delay
        // --- End Simulation ---
    }*/

    // Helper function to display toast messages
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: success, // 'success', 'error', 'warning', 'info'
        });
        this.dispatchEvent(event);
    }

     // Helper function to extract error messages from Apex controller errors
     // (Keep this even when using real Apex)
    reduceErrors(errors) {
        if (!Array.isArray(errors)) {
            errors = [errors];
        }

        return (
            errors
                // Remove null/undefined items
                .filter((error) => !!error)
                // Extract an error message
                .map((error) => {
                    // UI API read errors
                    if (Array.isArray(error.body)) {
                        return error.body.map((e) => e.message);
                    }
                    // UI API DML, Apex and network errors
                    else if (error.body && typeof error.body.message === 'string') {
                        return error.body.message;
                    }
                    // JS errors
                    else if (typeof error.message === 'string') {
                        return error.message;
                    }
                    // Unknown error shape so try logging
                    console.error('Unknown error shape:', error);
                    return 'Unknown error';
                })
                // Flatten
                .reduce((prev, curr) => prev.concat(curr), [])
                // Remove empty strings
                .filter((message) => !!message)
        );
    }
}