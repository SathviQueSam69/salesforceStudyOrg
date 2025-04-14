public class MovieApiClient {

    public class HttpResponseWrapper {
        @AuraEnabled
        public Integer statusCode { get; set; }
        @AuraEnabled
        public String status { get; set; }
        @AuraEnabled
        public String body { get; set; }
    }

    private static final String FAUX_API_ENDPOINT = 'https://faux-api.com/api/v1/movie_12666703491810005';

    public static HttpResponseWrapper getFauxMovieData() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(FAUX_API_ENDPOINT);
        req.setMethod('GET');

        try {
            Http http = new Http();
            HttpResponse res = http.send(req);

            HttpResponseWrapper wrapper = new HttpResponseWrapper();
            wrapper.statusCode = res.getStatusCode();
            wrapper.status = res.getStatus();
            wrapper.body = res.getBody();

            System.debug('Faux API Status Code: ' + res.getStatusCode());
            System.debug('Faux API Status: ' + res.getStatus());
            System.debug('Faux API Body: ' + res.getBody());

            return wrapper;

        } catch (Exception e) {
            System.debug('An error occurred during the Faux API callout: ' + e.getMessage());
            HttpResponseWrapper errorWrapper = new HttpResponseWrapper();
            errorWrapper.statusCode = 500;
            errorWrapper.status = 'Error';
            errorWrapper.body = 'An error occurred during the Faux API callout: ' + e.getMessage();
            return errorWrapper;
        }
    }

    // You can add methods for other HTTP methods (POST, PUT, DELETE)
    // if the Faux API supports them for this endpoint or other endpoints.

    // Example of how you might parse the JSON response (assuming the API returns JSON)
    public class MovieData {
        @AuraEnabled
        public String MovieTitle { get; set; }
        @AuraEnabled
        public Integer year { get; set; }
        @AuraEnabled
        public String director { get; set; }
        @AuraEnabled
        public String genre { get; set; }
        @AuraEnabled
        public String rating { get; set; }
        // Add other fields based on the API response structure
    }

    public static MovieData parseFauxMovieData() {
        HttpResponseWrapper response = getFauxMovieData();
        if (response != null && response.statusCode == 200 && String.isNotBlank(response.body)) {
            try {
                MovieData movie = (MovieData) JSON.deserialize(response.body, MovieData.class);
                return movie;
            } catch (JSONException e) {
                System.debug('Error parsing Faux API response: ' + e.getMessage());
                return null;
            }
        } else {
            System.debug('Failed to retrieve or the response was empty from Faux API.');
            return null;
        }
    }

    // Example usage in Anonymous Apex:
    public static void testFauxApiCallout() {
        HttpResponseWrapper response = getFauxMovieData();
        if (response != null) {
            System.debug('Faux API Callout Result:');
            System.debug('Status Code: ' + response.statusCode);
            System.debug('Status: ' + response.status);
            System.debug('Body: ' + response.body);
        }

        MovieData movieInfo = parseFauxMovieData();
        if (movieInfo != null) {
            System.debug('Parsed Movie Data:');
            System.debug('Title: ' + movieInfo.MovieTitle);
            System.debug('Year: ' + movieInfo.genre);
            System.debug('Director: ' + movieInfo.director);
        }
    }
}