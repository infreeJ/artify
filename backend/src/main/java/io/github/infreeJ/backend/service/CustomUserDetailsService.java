package io.github.infreeJ.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.github.infreeJ.backend.dto.UserDto;
import io.github.infreeJ.backend.repository.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
	
	private final UserMapper userMapper;

	@Override
	public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
		
		UserDto dto = userMapper.getByLoginId(loginId);
		
		if(dto == null) {
			throw new UsernameNotFoundException("아이디를 찾지 못했습니다. " + loginId);
		}

		List<GrantedAuthority> authList=new ArrayList<>();
		UserDetails userDetails = new User(dto.getLoginId(), dto.getPwd(), authList);
		return userDetails;
	}
}



