package io.github.infreeJ.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import io.github.infreeJ.backend.dto.DiaryImageDto;
import io.github.infreeJ.backend.dto.GeminiRequestDto;
import io.github.infreeJ.backend.dto.GeminiResponseDto;
import io.github.infreeJ.backend.repository.DiaryImageMapper;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class DiaryImageServiceImpl implements DiaryImageService{
	
	private final DiaryImageMapper diaryImageMapper;
	private final WebClient.Builder webClientBuilder;
	
	@Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

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
        
        // Gemini API에 보낼 요청 DTO 생성
        GeminiRequestDto.Part part = new GeminiRequestDto.Part(diaryImageDto.getPrompt());
        GeminiRequestDto.Content content = new GeminiRequestDto.Content(List.of(part));
        GeminiRequestDto requestDto = new GeminiRequestDto(List.of(content));

        // WebClient를 사용하여 Gemini API 호출
        WebClient webClient = webClientBuilder.build();
        
        GeminiResponseDto responseDto = webClient.post()
                .uri(apiUrl + "?key=" + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(requestDto), GeminiRequestDto.class)
                .retrieve()
                .bodyToMono(GeminiResponseDto.class)
                .block();

        // API 응답에서 결과 텍스트(이미지 URL) 추출
        String imageUrl = extractImageUrlFromResponse(responseDto);

        // DB에 결과 저장        
        diaryImageDto.setImageUrl(imageUrl);
        diaryImageMapper.diaryImageInsert(diaryImageDto);
        
        // 컨트롤러에 이미지 URL 반환
        return diaryImageDto;
	}
	
	
	
	private String extractImageUrlFromResponse(GeminiResponseDto responseDto) {
        if (responseDto != null && responseDto.getCandidates() != null && !responseDto.getCandidates().isEmpty()) {
            GeminiResponseDto.Candidate candidate = responseDto.getCandidates().get(0);
            if (candidate.getContent() != null && candidate.getContent().getParts() != null && !candidate.getContent().getParts().isEmpty()) {
                return candidate.getContent().getParts().get(0).getText();
            }
        }
        throw new RuntimeException("Failed to generate image from API.");
    }


}
