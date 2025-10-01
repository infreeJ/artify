package io.github.infreeJ.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.net.URL;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImageOptions;
import org.springframework.ai.image.ImageOptionsBuilder;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.DiaryDto;
import io.github.infreeJ.backend.dto.ImageGenerateDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageManagerServiceImpl implements ImageManagerService{
	
	private final ImageModel imageModel;
	private final String uploadBaseDir = "../../images/";
	private final ChatModel chatModel;

	
	// 이미지 생성을 위한 프롬프트 생성
	@Override
	public String ImagePromptGenerate(ImageGenerateDto dto) {
		ChatClient chatClient = ChatClient.builder(chatModel).build();

		String title = dto.getTitle();
		String content = dto.getContent();
		String persona = dto.getPersona();
		String style = dto.getStyle();
		String option = dto.getOption();
		
		
		String systemPersona = """
				You are a world-class prompt engineer specializing in creating prompts for AI image generators like DALL-E and Midjourney. Your primary mission is to translate a user's diary entry and several creative options into a single, masterful, and visually rich English prompt.
				Synthesize the 'Main Scene' from the diary's title and content, capturing the core emotion and atmosphere. Seamlessly integrate the 'User's Persona' as the main character in this scene. Incorporate any 'Additional User Requests' as specific, concrete details. Finally, conclude the prompt by describing the 'Desired Art Style' in a detailed and artistic manner.
				The final output must be a single, cohesive paragraph, written in English, and ready to be used by an image generation AI.
				""";
		
		
		String userRequestTemplate = """
				아래 정보를 바탕으로 이미지 생성 프롬프트를 만들어 주세요.

			    - 일기 제목: %s
			    - 일기 내용: %s
			    - 일기 작성자 특징 (페르소나): %s
			    - 희망하는 그림 스타일: %s
			    - 추가 요청사항: %s
				""";
		
		String userRequest = String.format(userRequestTemplate, title, content, persona, style, option);
		
		
		String prompt = chatClient.prompt()
				.system(systemPersona)
				.user(userRequest)
				.call()
				.content();
		
		System.out.println("결과 : " + prompt);
		return prompt;
	}
	
	
	
	// 이미지 생성
	@Override
	public String DiaryImageGenerate(String prompt) {
		
		ImageOptions options = ImageOptionsBuilder.builder()
				.model("dall-e-3")
				.width(1024)
				.height(1024)
				.build();
		
		ImagePrompt imagePrompt = new ImagePrompt(prompt, options);
		ImageResponse response = imageModel.call(imagePrompt);
		
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













