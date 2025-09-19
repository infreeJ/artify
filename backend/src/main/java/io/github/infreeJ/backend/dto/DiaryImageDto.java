package io.github.infreeJ.backend.dto;

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
	private long id;
	private String OrgDiaryImgName;
	private String uuidDiaryImgName;
}
