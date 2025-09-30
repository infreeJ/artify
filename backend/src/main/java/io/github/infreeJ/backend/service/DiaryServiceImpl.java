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
	private final DiaryImageMapper diaryImageMapper;
	

	// id로 일기 상세정보 출력
	@Override
	public DiaryDto getDiaryDetailByDiaryId(Long id) {
		return diaryMapper.getDiaryDetailByDiaryId(id);
	}

	// 유저 id로 해당 유저 일기 목록 출력
	@Override
	public UserDto getDiaryListByUserId(Long id) {
		return diaryMapper.getDiaryListByUserId(id);
	}

	// 일기 생성
	@Override
	public long createDiary(DiaryDto dto) {
		
		diaryMapper.createDiary(dto);
		
		return dto.getId();
	}
	

	// 일기 내용 업데이트
	@Override
	@Transactional
	public long updateDiary(DiaryDto dto) {
		
		diaryMapper.updateDiary(dto);
		
		diaryImageMapper.updateDiaryImage(dto.getDiaryImage());
		
		return dto.getId();
	}

	//일기 삭제
	@Override
	public int deleteDiary(long id) {
		return diaryMapper.deleteDiary(id);
	}

}
