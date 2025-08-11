package com.group9.ponte_de_geracoes.controller;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.User;
import com.group9.ponte_de_geracoes.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/users")
@Tag(name = "User API", description = "Gerencia usuários (helpers e assisted) dentro do sistema")
public class UserController {

    @Autowired
    private UserService userService;

    private URI createNewURIById(User user) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getId())
                .toUri();
    }

    @Operation(
        summary = "Lista usuários por tipo",
        description = "Retorna uma página de usuários filtrados por tipo (helper/assisted)."
    )
    @GetMapping("/{userType}")
    public ResponseEntity<Page<User>> getUsersByType(
            @PathVariable String userType,
            @Parameter(hidden = true) @PageableDefault(size = 10, sort = {"id"}) Pageable pageable,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String day
    ) {
        Page<User> page = userService.getUsers(userType, isAvailable, city, day, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/details/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        throw new EntityNotFoundException("User not found", List.of("O usuário informado não foi encontrado."));
    }

    @PostMapping
    public ResponseEntity<User> insertNewUser(@RequestBody User user) {     
        User insertedUser = userService.insertNewUser(user);
        URI locator = createNewURIById(insertedUser);
        return ResponseEntity.created(locator).body(insertedUser);
    }

    @PostMapping("/upload-image/{userId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        String fileUrl = userService.uploadImage(userId, file);
        return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Validated @RequestBody User requestUser) {
        User updatedUser = userService.updateUser(id, requestUser);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}