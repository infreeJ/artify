package io.github.infreeJ.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DiaryImageDto {
	private Long id;
	private Long diaryId;
	private String orgDiaryImgName;
	private String uuidDiaryImgName;
	private LocalDateTime createdAt;
	
	// 추가로 필요한 필드
	private String imageUrl;
	private String imageType;
}




