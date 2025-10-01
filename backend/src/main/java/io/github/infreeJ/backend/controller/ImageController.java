package io.github.infreeJ.backend.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.dto.ImageGenerateDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.service.ImageManagerService;
import io.github.infreeJ.backend.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ImageController {
	
	private final ImageManagerService imageManagerService;
	private final UserService userService;
	
	// dall-e-3 이미지 생성 요청
	@PostMapping("/image-generate")
	public String imageGanerate(@RequestBody ImageGenerateDto dto) {
		
		UserDto userDto = userService.getById(dto.getUserId());
		
		dto.setPersona(userDto.getPersona());
		
		String prompt = imageManagerService.ImagePromptGenerate(dto);
		
		String imageUrl = imageManagerService.DiaryImageGenerate(prompt);
		
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







