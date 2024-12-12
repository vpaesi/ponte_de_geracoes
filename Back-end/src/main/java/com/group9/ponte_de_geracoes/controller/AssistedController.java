package com.group9.ponte_de_geracoes.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.services.AssistedService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/assisted")
public class AssistedController {

    @Autowired
    private AssistedService assistedService;

    private URI createNewURIById(Assisted assisted) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(assisted.getId())
                .toUri();
    }

    @GetMapping
    public ResponseEntity<Page<Assisted>> getHelpers(
            @PageableDefault(size = 10, sort = {"id"}) Pageable pageable,
            @RequestParam(required = false) Boolean needsHelp,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String day
    ) {
        Page<Assisted> page = assistedService.getAssisteds(needsHelp, city, day, pageable);
        
        return ResponseEntity.ok(page);
    }

    @PostMapping
    public ResponseEntity<Assisted> insertNewAssisted(@RequestBody Assisted assisted) {
        Assisted insertedAssisted = assistedService.insertNewAssisted(assisted);
        URI locator = createNewURIById(insertedAssisted);
        return ResponseEntity.created(locator).body(insertedAssisted);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assisted> updateAssisted(@PathVariable Long id, @Validated @RequestBody Assisted requestAssisted) {
        Assisted updatedAssisted = assistedService.updateAssisted(id, requestAssisted);
        if (updatedAssisted != null) {
            return ResponseEntity.ok(updatedAssisted);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssisted(@PathVariable Long id) {
        if (assistedService.deleteAssisted(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
