public with sharing class RestCallouts {
    // Method to perform a GET request
    public static String makeGetCallout() {
        String endpointUrl= 'https://faux-api.com/api/v1/movie_12666703491810005';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpointUrl);
        request.setMethod('GET');
        
        try {
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                return response.getBody();
            } else {
                System.debug('Error: ' + response.getStatus());
                return null;
            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            return null;
        }
    }

    // Method to perform a POST request
    public static String makePostCallout(String endpointUrl, String requestBody) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpointUrl);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setBody(requestBody);
        
        try {
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200 || response.getStatusCode() == 201) {
                return response.getBody();
            } else {
                System.debug('Error: ' + response.getStatus());
                return null;
            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
            return null;
        }
    }
}