package io.github.infreeJ.backend.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.cloud.vertexai.VertexAI;


@Configuration
public class VertexAiConfig {

    @Value("${gemini.api.project-id}")
    private String projectId;

    @Value("${gemini.api.location}")
    private String location;
    
    @Bean
    public VertexAI vertexAI() throws IOException {
        // 애플리케이션 로딩 시점에 단 한 번만 생성되어 Bean으로 등록됩니다.
        return new VertexAI(projectId, location);
    }
}
