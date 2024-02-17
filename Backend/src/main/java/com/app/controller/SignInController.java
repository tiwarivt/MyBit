package com.app.controller;

import com.app.dto.SigninRequest;
import com.app.dto.SigninResponse;
import com.app.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class SignInController {

    @Autowired
    private JwtUtils utils;

    @Autowired
    private AuthenticationManager mgr;

    @PostMapping("/signin")
    ResponseEntity<?> userSignIn(@RequestBody @Valid SigninRequest reqDTO) {
        System.out.println("in signin " + reqDTO);
        // simply invoke authentucate(...) on AuthMgr
        // i/p : Authentication => un verifed credentials
        // i/f --> Authentication --> imple by UsernamePasswordAuthToken
        // throws exc OR rets : verified credentials (UserDetails i.pl class: custom
        // user details)

        Authentication verifiedAuth = mgr.authenticate(new UsernamePasswordAuthenticationToken(reqDTO.getEmail(), reqDTO.getPassword()));
        System.out.println(verifiedAuth.getClass());// Custom user details
        // => auth success
        return ResponseEntity.ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), "Successful Authentication!!!"));
    }

}
