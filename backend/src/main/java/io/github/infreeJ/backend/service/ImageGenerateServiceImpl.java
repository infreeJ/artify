package io.github.infreeJ.backend.service;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.Part;
import com.google.cloud.vertexai.generativeai.GenerativeModel;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class ImageGenerateServiceImpl implements ImageGenerateService{

	private final VertexAI vertexAi;

    // 실제 프로덕션에서는 이미지를 GCS 등에 업로드하고 URL을 반환해야 합니다.
    // 이 예제에서는 간단히 Base64 인코딩된 문자열을 데이터 URL로 만들어 반환합니다.
	@Override
    public String generateImageFromDiary(String diaryContent) throws IOException {
        String prompt = diaryContent + ", in a beautiful and fantastical watercolor painting style.";

        // 더 이상 try-with-resources로 객체를 만들고 닫을 필요가 없습니다.
        // 주입받은 객체를 바로 사용합니다.
        GenerativeModel model = new GenerativeModel("imagegeneration@006", vertexAi);

        GenerateContentResponse response = model.generateContent(prompt);

        Part imagePart = response.getCandidates(0).getContent().getParts(0);
        byte[] imageBytes = imagePart.getInlineData().getData().toByteArray();
        String base64Image = Base64.getMimeEncoder().encodeToString(imageBytes);

        return "data:image/png;base64," + base64Image;
    }
    
}
