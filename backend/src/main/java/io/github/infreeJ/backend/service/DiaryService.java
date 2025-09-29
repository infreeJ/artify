package io.github.infreeJ.backend.service;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;

public interface DiaryService {
	
	public DiaryDto getDiaryDetailByDiaryId(Long id);
	
	public UserDto getDiaryListByUserId(Long id);
	
	public int createDiary(DiaryDto dto);
	
	public int updateDiary(DiaryDto dto);
	
	public int deleteDiary(long id);
}
