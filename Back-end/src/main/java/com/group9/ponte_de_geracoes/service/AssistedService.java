package com.group9.ponte_de_geracoes.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.exception.ImageStorageException;
import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.repository.AssistedRepository;

@Service
public class AssistedService {

    @Autowired
    private AssistedRepository assistedRepository;

    private final String uploadImagesDir = "./uploads/assisted/";
    private static final List<String> ALLOWED_FILE_TYPES = List.of(
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    );

    public Page<Assisted> getAssisteds(Boolean needsHelp, String city, String day, Pageable pageable) {
        if (city != null && day != null) {
            return assistedRepository.findByAddress_CityAndNeedsHelp(city, needsHelp, pageable);
        } else if (day != null) {
            return assistedRepository.findByAvailableDaysContainsAndNeedsHelp(day, needsHelp, pageable);
        } else if (needsHelp != null) {
            return assistedRepository.findByNeedsHelp(needsHelp, pageable);
        } else {
            return assistedRepository.findAll(pageable);
        }
    }

    public Assisted insertNewAssisted(Assisted assisted) {
        assisted.setId(null);
        if (assisted != null && assisted.getProfileImageUrl() == null){
            assisted.setProfileImageUrl("/uploads/generic-icon.jpg");
        }
        return assistedRepository.save(assisted);
    }

    public String uploadImage(Long AssistedId, MultipartFile file) {
        try {
            Optional<Assisted> optionalAssisted = assistedRepository.findById(AssistedId);

            if (optionalAssisted.isEmpty()){
                    throw new EntityNotFoundException("Assisted not founded", List.of("O Ajudado informado não foi encontrado."));
            }
            if (file.isEmpty()) {
                throw new ImageStorageException("The file is Empty", List.of("O arquivo de imagem recebido está vázio."));
            }

            String contentType = file.getContentType();
            if (contentType == null || !ALLOWED_FILE_TYPES.contains(contentType)) {
                throw new ImageStorageException("Invalid file type", List.of("O tipo de arquivo enviado não é válido. Apenas imagens são permitidas."));
            }

            Assisted Assisted = optionalAssisted.get();
        
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        
            Path path = Paths.get(uploadImagesDir + fileName);
            
            File directory = new File(uploadImagesDir);
            if (!directory.exists()) {
                boolean dirCreated = directory.mkdirs();
                if (!dirCreated) {
                    throw new ImageStorageException("Fail to create the Upload Directory", List.of("Falha interna durante o armazenamento da imagem."));
                }
            }
        
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        
            String fileUrl = "/uploads/assisted/" + fileName;
        
            Assisted.setProfileImageUrl(fileUrl);
            assistedRepository.save(Assisted);
        
            return fileUrl;
        }
        catch (IOException e){
            throw new ImageStorageException("Fail to upload the Image", List.of("Falha interna durante o armazenamento da imagem."));
        }
    }

    public Assisted updateAssisted(Long id, Assisted requestAssisted) {
        return assistedRepository.findById(id).map(assistedToUpdate -> {
            if (requestAssisted.getName() != null) {
                assistedToUpdate.setName(requestAssisted.getName());
            }
            if (requestAssisted.getBirthDate() != null) {
                assistedToUpdate.setBirthDate(requestAssisted.getBirthDate());
            }
            if (requestAssisted.getEmail() != null) {
                assistedToUpdate.setEmail(requestAssisted.getEmail());
            }
            if (requestAssisted.getPhone() != null) {
                assistedToUpdate.setPhone(requestAssisted.getPhone());
            }
            if (requestAssisted.getAddress() != null) {
                assistedToUpdate.setAddress(requestAssisted.getAddress());
            }
            if (requestAssisted.getNeeds() != null) {
                assistedToUpdate.setNeeds(requestAssisted.getNeeds());
            }
            if (requestAssisted.getNeedsHelp() != null) {
                assistedToUpdate.setNeedsHelp(requestAssisted.getNeedsHelp());
            }
            if (requestAssisted.getRg() != null) {
                assistedToUpdate.setRg(requestAssisted.getRg());
            }
            if (requestAssisted.getCpf() != null) {
                assistedToUpdate.setCpf(requestAssisted.getCpf());
            }
            if (requestAssisted.getPassword() != null) {
                assistedToUpdate.setPassword(requestAssisted.getPassword());
            }
            if (requestAssisted.getAvailableDays() != null) {
                assistedToUpdate.setAvailableDays(requestAssisted.getAvailableDays());
            }
            if (requestAssisted.getAboutYou() != null) {
                assistedToUpdate.setAboutYou(requestAssisted.getAboutYou());
            }
    
            return assistedRepository.save(assistedToUpdate);
        }).orElse(null);
    }    

    public boolean deleteAssisted(Long id) {
        if (assistedRepository.existsById(id)) {
            assistedRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
