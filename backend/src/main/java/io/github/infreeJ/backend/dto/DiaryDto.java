package io.github.infreeJ.backend.dto;

import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Alias("diaryDto")
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DiaryDto {
	private long id;
	private long userId;
	private String title;
	private String content;
	private int mood;
	private LocalDateTime createdAt;
	private DiaryImageDto diaryImage;
}
