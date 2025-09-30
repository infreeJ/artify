package io.github.infreeJ.backend.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.service.DiaryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DiaryController {
	
	private final DiaryService diaryService;
	
	// id로 일기 상세정보 출력
	@GetMapping("diary/detail/{id}")
	public DiaryDto getDiaryDetailByDiaryId(@PathVariable Long id) {
		return diaryService.getDiaryDetailByDiaryId(id);
	}
	
	// 유저 id로 해당 유저 일기 목록 출력
	@GetMapping("/diary/list/{id}")
	public UserDto getDiaryListByUserId(@PathVariable Long id) {
		return diaryService.getDiaryListByUserId(id);
	}
	
	// 일기 생성
	@PostMapping("/diary")
	public long createDiary(@RequestBody DiaryDto dto) throws IOException {
		return diaryService.createDiary(dto);
	}
	
	// 일기 내용 업데이트
	@PutMapping("/diary")
	public long updateDiary(@RequestBody DiaryDto dto) {
		return diaryService.updateDiary(dto);
	}

	// 일기 삭제
	@DeleteMapping("/diary")
	public int deleteDiary(@RequestBody Long id) {
		return diaryService.deleteDiary(id);
	}

}
