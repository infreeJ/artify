package io.github.infreeJ.backend.service;

import io.github.infreeJ.backend.dto.DiaryImageDto;

public interface DiaryImageService {
	
	public int diaryImageInsert(DiaryImageDto dto);
	
	public int diaryImageUpdate(DiaryImageDto dto);
	
	public int diaryImageDelete(long id);
}
