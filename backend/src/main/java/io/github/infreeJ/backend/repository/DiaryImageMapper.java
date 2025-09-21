package io.github.infreeJ.backend.repository;

import io.github.infreeJ.backend.dto.DiaryImageDto;

public interface DiaryImageMapper {
	public int diaryImageInsert(DiaryImageDto dto);
	
	public int diaryImageUpdate(DiaryImageDto dto);
	
	public int diaryImageDelete(long id);
	
}
