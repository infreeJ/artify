package io.github.infreeJ.backend.service;

import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.repository.DiaryMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService{
	
	private final DiaryMapper mapper;

	@Override
	public DiaryDto getDiaryDetailByDiaryId(long id) {
		return mapper.getDiaryDetailByDiaryId(id);
	}

	@Override
	public UserDto getDiaryListByUserId(long id) {
		return mapper.getDiaryListByUserId(id);
	}

	@Override
	public int createDiary(DiaryDto dto) {
		// 여기에 이미지 insert SQL도 트랜잭션으로 묶어서 넣을 예정
		return mapper.createDiary(dto);
	}

	@Override
	public int updateDiary(DiaryDto dto) {
		// 여기에 이미지 update SQL도 트랜잭션으로 묶어서 넣을 예정
		return mapper.updateDiary(dto);
	}

	@Override
	public int deleteDiary(long id) {
		return mapper.deleteDiary(id);
	}

}
