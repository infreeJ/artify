package io.github.infreeJ.backend.service;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import io.github.infreeJ.backend.dto.UserDto;

public class CustomUserDetails implements UserDetails{

	private final UserDto userDto;

    public CustomUserDetails(UserDto dto) {
        this.userDto = dto;
    }

    public Long getId() { // 추가로 정의한 커스텀 메서드
        return userDto.getId();
    }

    @Override
    public String getPassword() {
        return userDto.getPwd();
    }

    @Override
    public String getUsername() {
        return userDto.getLoginId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	return Collections.emptyList(); // 권한 기능이 없으므로 빈 목록 반환
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
