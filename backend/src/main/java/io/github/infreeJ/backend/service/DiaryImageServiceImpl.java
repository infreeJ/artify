package io.github.infreeJ.backend.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.google.auth.oauth2.GoogleCredentials;

import io.github.infreeJ.backend.dto.DiaryImageDto;
import io.github.infreeJ.backend.dto.GeminiRequestDto;
import io.github.infreeJ.backend.dto.GeminiResponseDto;
import io.github.infreeJ.backend.repository.DiaryImageMapper;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class DiaryImageServiceImpl implements DiaryImageService {

    private final DiaryImageMapper diaryImageMapper;
    private final WebClient.Builder webClientBuilder;

    @Value("${gemini.project.id}")
    private String projectId;

    @Value("${gemini.location:global}")
    private String location;

    @Value("${gemini.service-account.path}")
    private String serviceAccountPath;

    @Override
    public int diaryImageUpdate(DiaryImageDto dto) {
        return diaryImageMapper.diaryImageUpdate(dto);
    }

    @Override
    public int diaryImageDelete(long id) {
        return diaryImageMapper.diaryImageDelete(id);
    }

    @Override
    public DiaryImageDto generateImageAndSave(DiaryImageDto diaryImageDto) {

        // Gemini API 요청 DTO 생성
        GeminiRequestDto.Part part = new GeminiRequestDto.Part(diaryImageDto.getPrompt());
        GeminiRequestDto.Content content = new GeminiRequestDto.Content(List.of(part));
        GeminiRequestDto.GenerationConfig config =
                new GeminiRequestDto.GenerationConfig(List.of("TEXT", "IMAGE"));

        GeminiRequestDto requestDto = new GeminiRequestDto(List.of(content), config);

        // Vertex AI Endpoint URL
        String url = String.format(
                "https://%s-aiplatform.googleapis.com/v1/projects/%s/locations/%s/publishers/google/models/gemini-2.5-flash-image-preview:generate",
                location, projectId, location);

        try {
            String accessToken = getAccessToken(); // 서비스 계정 OAuth2 토큰 발급
            WebClient webClient = webClientBuilder.build();

            GeminiResponseDto responseDto = webClient.post()
                    .uri(url)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Mono.just(requestDto), GeminiRequestDto.class)
                    .retrieve()
                    .bodyToMono(GeminiResponseDto.class)
                    .block();

            // base64 이미지 추출 및 저장
            String imageUrl = extractImageUrlFromResponse(responseDto);

            // DB에 저장
            diaryImageDto.setImageUrl(imageUrl);
            diaryImageMapper.diaryImageInsert(diaryImageDto);

            return diaryImageDto;

        } catch (IOException e) {
            throw new RuntimeException("Failed to get access token", e);
        }
    }

    private String extractImageUrlFromResponse(GeminiResponseDto responseDto) {
        if (responseDto != null && responseDto.getCandidates() != null && !responseDto.getCandidates().isEmpty()) {
            GeminiResponseDto.Candidate candidate = responseDto.getCandidates().get(0);
            if (candidate.getContent() != null && candidate.getContent().getParts() != null) {
                for (GeminiResponseDto.Part part : candidate.getContent().getParts()) {
                    if (part.getInlineData() != null) {
                        String base64Data = part.getInlineData().getData();
                        return saveImageToFile(base64Data);
                    }
                }
            }
        }
        throw new RuntimeException("Failed to generate image from API.");
    }

    private String saveImageToFile(String base64Data) {
        try {
            byte[] imageBytes = Base64.getDecoder().decode(base64Data);
            String fileName = "generated_" + System.currentTimeMillis() + ".png";
            Path filePath = Paths.get("uploads/images/" + fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, imageBytes);
            return "/images/" + fileName; // 웹에서 접근 가능한 URL
        } catch (IOException e) {
            throw new RuntimeException("Image save failed", e);
        }
    }

    /**
     * 서비스 계정 JSON 기반 OAuth2 토큰 발급
     */
    private String getAccessToken() throws IOException {
        GoogleCredentials credentials = GoogleCredentials
                .fromStream(new FileInputStream(serviceAccountPath))
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        credentials.refreshIfExpired();
        return credentials.getAccessToken().getTokenValue();
    }
}
