package io.github.infreeJ.backend.service;

import java.io.IOException;

public interface ImageGenerateService {
	
	public String generateImageFromDiary(String diaryContent) throws IOException; 
}
