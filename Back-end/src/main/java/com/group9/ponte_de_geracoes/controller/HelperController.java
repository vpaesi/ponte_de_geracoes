package com.group9.ponte_de_geracoes.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.services.HelperService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/helper")
public class HelperController {

    @Autowired
    private HelperService helperService;

    private URI createNewURIById(Helper helper) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(helper.getId())
                .toUri();
    }

    @GetMapping
    public ResponseEntity<Page<Helper>> getHelpers(@PageableDefault(size = 10, sort = {"id"}) Pageable pageable) {
        Page<Helper> page = helperService.getHelpers(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping
    public ResponseEntity<Helper> insertNewHelper(@RequestBody Helper helper) {
        if (helper == null || helper.getName() == null || helper.getName().isEmpty()) {
            return ResponseEntity.badRequest().build(); // Pode retornar erro 400 para dados inválidos
        }
        
        Helper insertedHelper = helperService.insertNewHelper(helper);
        URI locator = createNewURIById(insertedHelper);
        return ResponseEntity.created(locator).body(insertedHelper);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Helper> updateHelper(@PathVariable Long id, @Validated @RequestBody Helper requestHelper) {
        Helper updatedHelper = helperService.updateHelper(id, requestHelper);
        if (updatedHelper != null) {
            return ResponseEntity.ok(updatedHelper);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelper(@PathVariable Long id) {
        if (helperService.deleteHelper(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
