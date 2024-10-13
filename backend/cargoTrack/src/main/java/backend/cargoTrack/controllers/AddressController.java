package backend.cargoTrack.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
@RequestMapping("/auth")
@RestController
public class AddressController {

    @Value("${API_KEY}")
    private String apiKey;

    @GetMapping("/getExternalAddress")
    public String getExternalAddress(@RequestParam String query) {
        String uri = "http://api.positionstack.com/v1/forward?access_key=" + apiKey + "&query=" + query;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);

        return response.getBody();
    }
}
