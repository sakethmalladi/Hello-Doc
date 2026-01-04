package com.springproject.hellodoc.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGPTService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public ChatGPTService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String askQuestion(String question) throws Exception {
        // Define the system role and user prompt
        String payload = "{"
                + "\"model\": \"gpt-4o\"," // Use your specific model (e.g., gpt-4o)
                + "\"messages\": ["
                + "    {\"role\": \"system\", \"content\": \"You are an Office Assistant at a Doctor Clinic. Provide information on the different medical specializations available for booking appointments with doctors. Answer the user's questions or address any doubts regarding specific specializations, such as cardiology, orthopedics, etc.\"},"
                + "    {\"role\": \"user\", \"content\": \"" + question + "\"}"
                + "],"
                + "\"max_tokens\": 2048,"
                + "\"temperature\": 1,"
                + "\"top_p\": 1,"
                + "\"frequency_penalty\": 0,"
                + "\"presence_penalty\": 0"
                + "}";

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create HTTP entity
        HttpEntity<String> entity = new HttpEntity<>(payload, headers);

        // Make API request
        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

        // Process response
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            JsonNode choicesNode = rootNode.path("choices");
            if (choicesNode.isArray() && choicesNode.size() > 0) {
                return choicesNode.get(0).path("message").path("content").asText().trim();
            } else {
                return "No response from ChatGPT.";
            }
        } else {
            throw new Exception("Failed to get response from ChatGPT. Status code: " + response.getStatusCode());
        }
    }
}
