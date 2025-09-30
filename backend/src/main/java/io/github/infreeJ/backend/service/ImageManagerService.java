package io.github.infreeJ.backend.service;

import java.io.IOException;

import io.github.infreeJ.backend.dto.DiaryDto;

public interface ImageManagerService {
	public String DiaryImageGenerate(String request);
	
	public DiaryDto downloadAndSaveImage(DiaryDto dto) throws IOException;
}
