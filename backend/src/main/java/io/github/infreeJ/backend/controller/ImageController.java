package io.github.infreeJ.backend.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.service.ImageManagerService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ImageController {
	
	private final ImageManagerService imageManagerService;
	
	// dall-e-3 이미지 생성 요청
	@PostMapping("/image-generate")
	public String imageGanerate(@RequestBody String request) {
		String imageUrl = imageManagerService.DiaryImageGenerate(request);
		System.out.println(imageUrl);
		return imageUrl;
	}
	
	// 삭제 예정
//	// 일기 이미지 저장
//	@PostMapping("/diary-image-save")
//	public int createDiaryImage(@RequestBody DiaryImageDto dto) throws IOException {
//		return diaryImageSerive.createDiaryImage(dto);
//	}

}







