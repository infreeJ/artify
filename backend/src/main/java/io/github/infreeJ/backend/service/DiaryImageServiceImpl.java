package io.github.infreeJ.backend.service;

import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImageOptions;
import org.springframework.ai.image.ImageOptionsBuilder;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryImageServiceImpl implements DiaryImageService{
	
	private final ImageModel imageModel;

	@Override
	public String imageGenerate(String request) {
		
		ImageOptions options = ImageOptionsBuilder.builder()
				.model("dall-e-3")
				.width(1024)
				.height(1024)
				.build();
		
		ImagePrompt prompt = new ImagePrompt(request, options);
		ImageResponse response = imageModel.call(prompt);
		
		String imageUrl = response.getResult().getOutput().getUrl();
		
		return imageUrl;
	}

}













