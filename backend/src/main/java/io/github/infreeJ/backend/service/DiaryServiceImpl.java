package io.github.infreeJ.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.repository.DiaryImageMapper;
import io.github.infreeJ.backend.repository.DiaryMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService{
	
	private final DiaryMapper diaryMapper;
	private final DiaryImageMapper imageMapper;
	

	@Override
	public DiaryDto getDiaryDetailByDiaryId(Long id) {
		return diaryMapper.getDiaryDetailByDiaryId(id);
	}

	@Override
	public UserDto getDiaryListByUserId(Long id) {
		return diaryMapper.getDiaryListByUserId(id);
	}

	@Override
	public long createDiary(DiaryDto dto) {
		
		// 이미지가 null이 아닐 때만 diaryImageInsert 호출
//		return imageMapper.diaryImageInsert(dto.getDiaryImage());
		diaryMapper.createDiary(dto);
		return dto.getId();
	}

	@Override
	@Transactional
	public int updateDiary(DiaryDto dto) {
		diaryMapper.updateDiary(dto);
		
		return imageMapper.diaryImageUpdate(dto.getDiaryImage());
	}

	@Override
	public int deleteDiary(long id) {
		return diaryMapper.deleteDiary(id);
	}

}
