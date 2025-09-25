package io.github.infreeJ.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.service.ImageGenerateService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/diaries")
public class ImageGenerateController {
	private final ImageGenerateService imageGenerateService;

    // 이미지 생성을 요청하는 DTO
    public record ImageGenerateRequest(String diaryContent) {}
    // 생성된 이미지 URL을 반환하는 DTO
    public record ImageGenerateResponse(String imageUrl) {}

    @PostMapping("/generate-image")
    public ImageGenerateResponse generateImage(@RequestBody ImageGenerateRequest request) throws Exception {
        String imageUrl = imageGenerateService.generateImageFromDiary(request.diaryContent());
        return new ImageGenerateResponse(imageUrl);
    }
}
