package com.group9.ponte_de_geracoes.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.repository.HelperRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/helper")
public class HelperController {

    @Autowired
    private HelperRepository helperRepository;

    private URI createNewURIById(Helper helper){
        URI locator = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(helper.getId())
                    .toUri();
        
        return locator;
    }
    
    @GetMapping
    public ResponseEntity<Page<Helper>> getHelpers(@PageableDefault(size = 10, sort = {"id"}) Pageable pageable){
        Page<Helper> page = helperRepository.findAll(pageable);
        
        return ResponseEntity.ok(page);
    }

    @PostMapping
    public ResponseEntity<Helper> insertNewHelpers(@RequestBody Helper helper) { 
        helper.setId(null);

        Helper insertedHelper = helperRepository.save(helper);

        URI locator = createNewURIById(insertedHelper);

        return ResponseEntity.created(locator).body(insertedHelper);
    }
    
}
