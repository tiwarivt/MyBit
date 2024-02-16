package com.app.service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.*;
import com.app.enities.Role;
import com.app.enities.User;
import com.app.enities.UserInfo;
import com.app.repository.UserInfoRepository;
import com.app.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    UserInfoRepository userInfoRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public DonorResponse addUser(DonorInsertRequest newDonor) {
        //String password =
        User newUser = mapper.map(newDonor, User.class);
        newUser.setPassword(encoder.encode(newUser.getPassword()));//pwd : encrypted using SHA
        newUser.getInfo().setRegNo("N/A");
        UserInfo addedInfo = userInfoRepo.save(newUser.getInfo());
        newUser.setInfo(addedInfo); // Added new info with ID
        userRepo.save(newUser);
        return mapper.map(newUser, DonorResponse.class);
    }

    @Override
    public NgoResponse addNgo(NgoInsertRequest newNgo) {
        User newUser = mapper.map(newNgo, User.class);
        UserInfo addedInfo = userInfoRepo.save(newUser.getInfo());
        newUser.setInfo(addedInfo); // Added new info with ID
        newUser.setPassword(encoder.encode(newUser.getPassword()));//pwd : encrypted using SHA
        userRepo.save(newUser);
        return mapper.map(newUser, NgoResponse.class);
    }

    @Override
    public List<UserList> getUserList() {
        List<User> userList = userRepo.findAll();
        List<UserList> userListResp = userList.stream()
                .map(u -> mapper.map(u, UserList.class))
                .collect(Collectors.toList());

        return userListResp;
    }

    @Override
    public List<UserList> getUserByCity(String city) {
        List<User> userList = userRepo.findByCity(city)
                .orElseThrow(() -> new ResourceNotFoundException("User not present in " + city));
        List<UserList> userListResp = userList.stream()
                .map(u -> mapper.map(u, UserList.class))
                .collect(Collectors.toList());
        return userListResp;
    }

    @Override
    public List<NgoList> getAllNgo() {
        List<User> ngoList = userRepo.findByRole("ROLE_NGO")
                .orElseThrow(() -> new ResourceNotFoundException("NGO Not Found"));
        List<NgoList> ngoListResp = ngoList.stream()
                .map(ngo -> mapper.map(ngo, NgoList.class))
                .collect(Collectors.toList());
        return ngoListResp;
    }

    @Override
    public NgoResponse getNgoByName(String name) {
        User ngo = userRepo.findByFirstName(name)
                .orElseThrow(() -> new ResourceNotFoundException("No NGO by such name found"));
        if (ngo.getRole().equals(Role.ROLE_NGO)) {
            NgoResponse resp = mapper.map(ngo, NgoResponse.class);
            return resp;
        } else {
            throw new ResourceNotFoundException("No such NGO found by such a name");
        }
    }


}
