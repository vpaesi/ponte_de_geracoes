package com.group9.ponte_de_geracoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.repository.AssistedRepository;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/assisted")
public class AssistedController {

    @Autowired
    private AssistedRepository assistedRepository;

    @GetMapping
    public ResponseEntity<Page<Assisted>> getAssisteds(@PageableDefault(size = 10, sort = {"id"}) Pageable pageable){
        Page<Assisted> page = assistedRepository.findAll(pageable);
        
        return ResponseEntity.ok(page);
    } 
    
}
