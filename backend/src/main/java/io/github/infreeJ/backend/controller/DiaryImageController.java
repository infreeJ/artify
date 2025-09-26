package io.github.infreeJ.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.dto.DiaryImageDto;
import io.github.infreeJ.backend.service.DiaryImageService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DiaryImageController {
	
	private final DiaryImageService diaryImageService;
	
	@PostMapping("/diary-save")
	public DiaryImageDto generateImageAndSave(@RequestBody DiaryImageDto diaryImageDto) {
		
		return diaryImageService.generateImageAndSave(diaryImageDto);
		
	}

}
