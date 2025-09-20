package io.github.infreeJ.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Alias("userDto")
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private long id;
	private String loginId;
	private String pwd;
	private String name;
	private int age;
	private int gender;
	private String persona;
	private LocalDateTime createdAt;
	private String orgProfileImgName;
	private String uuidProfileImgName;
	private List<DiaryDto> diaries;
}
