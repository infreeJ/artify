package io.github.infreeJ.backend.service;

import java.io.IOException;

import io.github.infreeJ.backend.dto.DiaryImageDto;

public interface ImageManagerService {
	public String DiaryImageGenerate(String request);
	
	public DiaryImageDto downloadAndSaveImage(DiaryImageDto dto) throws IOException;
}
