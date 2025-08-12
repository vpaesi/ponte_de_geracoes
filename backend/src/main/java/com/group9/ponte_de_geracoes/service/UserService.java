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
import com.group9.ponte_de_geracoes.model.User;
import com.group9.ponte_de_geracoes.model.Address;
import com.group9.ponte_de_geracoes.repository.UserRepository;
import com.group9.ponte_de_geracoes.repository.AddressRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AddressRepository addressRepository;
    
    private static final List<String> ALLOWED_FILE_TYPES = List.of(
        "image/jpeg",
        "image/png", 
        "image/gif",
        "image/webp"
    );

    public Page<User> getUsers(String userType, Boolean isAvailable, String city, String day, Pageable pageable) {
        if (userType == null) {
            if (city != null && isAvailable != null) {
                return userRepository.findByAddress_CityAndIsAvailable(city, isAvailable, pageable);
            } else if (isAvailable != null) {
                return userRepository.findByIsAvailable(isAvailable, pageable);
            } else if (city != null) {
                return userRepository.findByAddress_City(city, pageable);
            } else {
                return userRepository.findAll(pageable);
            }
        }
        
        if (city != null && day != null && isAvailable != null) {
            return userRepository.findByUserTypeAndAddress_CityAndIsAvailable(userType, city, isAvailable, pageable);
        } else if (day != null && isAvailable != null) {
            return userRepository.findByUserTypeAndAvailableDaysContainsAndIsAvailable(userType, day, isAvailable, pageable);
        } else if (isAvailable != null) {
            return userRepository.findByUserTypeAndIsAvailable(userType, isAvailable, pageable);
        } else if (city != null) {
            return userRepository.findByUserTypeAndAddress_City(userType, city, pageable);
        } else {
            return userRepository.findByUserType(userType, pageable);
        }
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User insertNewUser(User user) {
        if (user.getAddress() != null && user.getAddress().getId() != null) {
            Address managedAddress = addressRepository.findById(user.getAddress().getId())
                .orElseThrow(() -> new EntityNotFoundException("Address not found", List.of("O endereço informado não foi encontrado.")));
            user.setAddress(managedAddress);
        }
        
        return userRepository.save(user);
    }
    
    public User insertNewUserWithNewAddress(User user) {
        if (user.getAddress() != null) {
            user.getAddress().setId(null);
        }
        
        return userRepository.save(user);
    }

    public String uploadImage(Long userId, MultipartFile file) {
        try {
            Optional<User> optionalUser = userRepository.findById(userId);

            if (optionalUser.isEmpty()) {
                throw new EntityNotFoundException("User not found", List.of("O usuário informado não foi encontrado."));
            }
            
            if (file.isEmpty()) {
                throw new ImageStorageException("The file is Empty", List.of("O arquivo de imagem recebido está vazio."));
            }

            String contentType = file.getContentType();
            if (contentType == null || !ALLOWED_FILE_TYPES.contains(contentType)) {
                throw new ImageStorageException("Invalid file type", List.of("O tipo de arquivo enviado não é válido. Apenas imagens são permitidas."));
            }

            User user = optionalUser.get();
            String uploadDir = "./uploads/" + user.getUserType().toLowerCase() + "/";
            
            String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                boolean dirCreated = directory.mkdirs();
                if (!dirCreated) {
                    throw new ImageStorageException("Fail to create the Upload Directory", List.of("Falha interna durante o armazenamento da imagem."));
                }
            }
        
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        
            String fileUrl = "/uploads/" + user.getUserType().toLowerCase() + "/" + fileName;
            user.setProfileImageUrl(fileUrl);
            userRepository.save(user);
        
            return fileUrl;
        }
        catch (IOException e) {
            throw new ImageStorageException("Fail to upload the Image", List.of("Falha interna durante o armazenamento da imagem."));
        }
    }

    public User updateUser(Long id, User requestUser) {
        return userRepository.findById(id).map(userToUpdate -> {
            if (requestUser.getName() != null) {
                userToUpdate.setName(requestUser.getName());
            }
            if (requestUser.getBirthDate() != null) {
                userToUpdate.setBirthDate(requestUser.getBirthDate());
            }
            if (requestUser.getEmail() != null) {
                userToUpdate.setEmail(requestUser.getEmail());
            }
            if (requestUser.getPhone() != null) {
                userToUpdate.setPhone(requestUser.getPhone());
            }
            if (requestUser.getAddress() != null) {
                userToUpdate.setAddress(requestUser.getAddress());
            }
            if (requestUser.getNeedsAndSkills() != null) {
                userToUpdate.setNeedsAndSkills(requestUser.getNeedsAndSkills());
            }
            if (requestUser.getCpf() != null) {
                userToUpdate.setCpf(requestUser.getCpf());
            }
            if (requestUser.getPassword() != null) {
                userToUpdate.setPassword(requestUser.getPassword());
            }
            if (requestUser.getAvailableDays() != null) {
                userToUpdate.setAvailableDays(requestUser.getAvailableDays());
            }
            if (requestUser.getAboutYou() != null) {
                userToUpdate.setAboutYou(requestUser.getAboutYou());
            }
            userToUpdate.setAvailable(requestUser.isAvailable());
    
            return userRepository.save(userToUpdate);
        }).orElse(null);
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}