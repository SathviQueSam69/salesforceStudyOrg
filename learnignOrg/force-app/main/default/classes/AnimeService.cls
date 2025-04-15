public class AnimeService {
    
    public class AnimeResult {
        @AuraEnabled
        public Integer id;
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String synopsis;
        @AuraEnabled
        public String genres;
        @AuraEnabled
        public String episodes;
        @AuraEnabled
        public String poster;
        @AuraEnabled
        public String year;
        @AuraEnabled
        public String rating;
    }

	public class ApiResponse {
        @AuraEnabled
        public String status { get; set; }
        @AuraEnabled
        public List<AnimeResult> result { get; set; }
    }

    private static final String FAUX_API_ENDPOINT = 'https://faux-api.com/api/v1/anime_12666703491810005'; // Assuming this API always returns the structure you provided
	@AuraEnabled(cacheable=true)
    public static ApiResponse getAnimeData() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(FAUX_API_ENDPOINT);
        req.setMethod('GET');

        try {
            Http http = new Http();
            HttpResponse res = http.send(req);

            if (res!= null && res.getStatusCode() == 200) {
                ApiResponse response = (ApiResponse) JSON.deserialize(res.getBody(), ApiResponse.class);
                System.debug('Faux API Response: ' + response);
                return response;
            } else {
                System.debug('Faux API Callout Failed. Status Code: ' + res.getStatusCode() + ', Body: ' + res.getBody());
                return new ApiResponse(); // Return an empty response or handle the error as needed
            }

        } catch (Exception e) {
            System.debug('An error occurred during the Faux API callout: ' + e.getMessage());
            return new ApiResponse(); // Return an empty response or handle the error as needed
        }
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<AnimeResult> getParsedAnimes() {
        ApiResponse response = getAnimeData();
        //List<ShowResult> seriesList = new List<ShowResult>();
        
        if (response != null && response.status == 'success' && response.result != null) {
            //for(Integer i=skipCount;i<response.result.size();i++){
            //    seriesList.add(response.result[i]);
            //}
            return response.result;
        }
        
        return new List<AnimeResult>();
    }
    
    public static void testFauxApiCallout() {
        ApiResponse response = getAnimeData();
        if (response != null) {
            System.debug('Faux API Status: ' + response.status);
            if (response.result != null) {
                for (AnimeResult anime : response.result) {
                    System.debug('Movie Title: ' + anime.title);
                    System.debug('IMDB Rating: ' + anime.rating);
                    // Add other fields as needed
                }
            }
        }
    }
    
    //public static List<ShowResult> getParsedSeries() {
      //  return getParsedSeries(2);
    //}    

}