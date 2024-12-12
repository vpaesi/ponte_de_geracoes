package com.group9.ponte_de_geracoes.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.repository.HelperRepository;

@Service
public class HelperService {

    @Autowired
    private HelperRepository helperRepository;

    private final String uploadImagesDir = "./uploads/";

    public Page<Helper> getHelpers(Boolean isAvailable, String city, String day, Pageable pageable) {
        if (city != null && day != null) {
            return helperRepository.findByAddress_CityAndIsAvailable(city, isAvailable, pageable);
        } else if (day != null) {
            return helperRepository.findByAvailableDaysContainsAndIsAvailable(day, isAvailable, pageable);
        } else if (isAvailable != null) {
            return helperRepository.findByIsAvailable(isAvailable, pageable);
        } else {
            return helperRepository.findAll(pageable);
        }
    }

    public Helper insertNewHelper(Helper helper) {
        helper.setId(null);
        return helperRepository.save(helper);
    }

    public String uploadImage(Long helperId, MultipartFile file) throws IOException {
        Optional<Helper> optionalHelper = helperRepository.findById(helperId);

        if (optionalHelper.isEmpty()){
            throw new RuntimeException("Helper not founded");
        }
        if (file.isEmpty()) {
            throw new IOException("The file is Empty");
        }

        Helper helper = optionalHelper.get();
    
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
    
        Path path = Paths.get(uploadImagesDir + fileName);
        
        File directory = new File(uploadImagesDir);
        if (!directory.exists()) {
            boolean dirCreated = directory.mkdirs();
            if (!dirCreated) {
                throw new IOException("Fail to create the Upload Directory");
            }
        }
    
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    
        String fileUrl = "/uploads/helper/" + fileName;
    
        helper.setProfileImageUrl(fileUrl);
        helperRepository.save(helper);
    
        return fileUrl;
    }

    public Helper updateHelper(Long id, Helper requestHelper) {
        return helperRepository.findById(id).map(helperToUpdate -> {
            if (requestHelper.getName() != null) {
                helperToUpdate.setName(requestHelper.getName());
            }
            if (requestHelper.getBirthDate() != null) {
                helperToUpdate.setBirthDate(requestHelper.getBirthDate());
            }
            if (requestHelper.getEmail() != null) {
                helperToUpdate.setEmail(requestHelper.getEmail());
            }
            if (requestHelper.getPhone() != null) {
                helperToUpdate.setPhone(requestHelper.getPhone());
            }
            if (requestHelper.getAddress() != null) {
                helperToUpdate.setAddress(requestHelper.getAddress());
            }
            if (requestHelper.getSkills() != null) {
                helperToUpdate.setSkills(requestHelper.getSkills());
            }
            if (requestHelper.getRg() != null) {
                helperToUpdate.setRg(requestHelper.getRg());
            }
            if (requestHelper.getCpf() != null) {
                helperToUpdate.setCpf(requestHelper.getCpf());
            }
            if (requestHelper.getPassword() != null) {
                helperToUpdate.setPassword(requestHelper.getPassword());
            }
            if (requestHelper.getAvailableDays() != null) {
                helperToUpdate.setAvailableDays(requestHelper.getAvailableDays());
            }
            if (requestHelper.getAboutYou() != null) {
                helperToUpdate.setAboutYou(requestHelper.getAboutYou());
            }
            helperToUpdate.setAvailable(requestHelper.isAvailable());
    
            return helperRepository.save(helperToUpdate);
        }).orElse(null);
    }    

    public boolean deleteHelper(Long id) {
        if (helperRepository.existsById(id)) {
            helperRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
