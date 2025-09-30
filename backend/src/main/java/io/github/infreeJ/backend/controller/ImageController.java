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
	
	@PostMapping("/image-generate")
	public String imageGanerate(@RequestBody String request) {
		String imageUrl = imageManagerService.DiaryImageGenerate(request);
		System.out.println(imageUrl);
		return imageUrl;
	}

}
