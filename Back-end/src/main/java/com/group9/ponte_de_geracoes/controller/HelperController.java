package com.group9.ponte_de_geracoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.repository.HelperRepository;

@RestController
@RequestMapping("/helper")
public class HelperController {

    @Autowired
    private HelperRepository helperRepository;
    
    @GetMapping
    public ResponseEntity<Page<Helper>> getHelpers(@PageableDefault(size = 10, sort = {"id"}) Pageable pageable){
        Page<Helper> page = helperRepository.findAll(pageable);
        
        return ResponseEntity.ok(page);
    }

}
