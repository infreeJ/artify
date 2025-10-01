package io.github.infreeJ.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.net.URL;

import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImageOptions;
import org.springframework.ai.image.ImageOptionsBuilder;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.DiaryDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageManagerServiceImpl implements ImageManagerService{
	
	private final ImageModel imageModel;
	private final String uploadBaseDir = "../../images/";

	
	// 이미지 생성
	@Override
	public String DiaryImageGenerate(String request) {
		
		ImageOptions options = ImageOptionsBuilder.builder()
				.model("dall-e-3")
				.width(1024)
				.height(1024)
				.build();
		
		ImagePrompt prompt = new ImagePrompt(request, options);
		ImageResponse response = imageModel.call(prompt);
		
		String imageUrl = response.getResult().getOutput().getUrl();
		
		return imageUrl;
	}
	
	
	// 이미지 다운로드 및 저장
	@Override
	public DiaryDto downloadAndSaveImage(DiaryDto dto) throws IOException {
		
		String subPath = dto.getImageType() + "-images/";
		
        // 이미지 종류에 따라 하위 폴더 경로를 결정 (profile-images, diary-images)
        Path destinationDirectory = Paths.get(uploadBaseDir, subPath);

        // 하위 폴더가 존재하지 않으면 생성
        if (Files.notExists(destinationDirectory)) {
            Files.createDirectories(destinationDirectory);
            System.out.println("디렉토리 생성됨: " + destinationDirectory);
        }

        // 고유한 파일 이름 생성 (UUID 사용)
        String originalFileName = dto.getImageUrl().substring(dto.getImageUrl().lastIndexOf("/") + 1);
        String fileExtension = "";
        int lastDot = originalFileName.lastIndexOf(".");
        if (lastDot > 0) {
            fileExtension = originalFileName.substring(lastDot);
        }
//        String savedFileName = UUID.randomUUID().toString() + fileExtension;
        String savedFileName = UUID.randomUUID().toString() + ".jpg";
        
        // 파일명을 dto에 삽입
        dto.setOrgDiaryImageName(originalFileName);
        dto.setSavedDiaryImageName(savedFileName);

        // 최종 저장 경로와 파일 이름 결합
        Path destinationFile = destinationDirectory.resolve(savedFileName);

        // URL에서 스트림을 열어 파일을 다운로드 및 저장
        try (InputStream in = new URL(dto.getImageUrl()).openStream()) {
            Files.copy(in, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }

        // DB에 저장할 dto를 반환
        return dto;
    }

}













