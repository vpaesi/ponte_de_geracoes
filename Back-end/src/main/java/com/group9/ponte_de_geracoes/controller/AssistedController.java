package com.group9.ponte_de_geracoes.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.repository.AssistedRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/assisted")
public class AssistedController {

    @Autowired
    private AssistedRepository assistedRepository;

    private URI createNewURIById(Assisted assisted){
        URI locator = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(assisted.getId())
                    .toUri();
        
        return locator;
    }

    @GetMapping
    public ResponseEntity<Page<Assisted>> getAssisteds(@PageableDefault(size = 10, sort = {"id"}) Pageable pageable){
        Page<Assisted> page = assistedRepository.findAll(pageable);
        
        return ResponseEntity.ok(page);
    } 

    @PostMapping
    public ResponseEntity<Assisted> insertNewAssisted(@RequestBody Assisted assisted) { 
        assisted.setId(null);

        Assisted insertedAssisted = assistedRepository.save(assisted);

        URI locator = createNewURIById(insertedAssisted);

        return ResponseEntity.created(locator).body(insertedAssisted);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assisted> updateAssisted(@PathVariable Long id, @Validated @RequestBody Assisted requestAssisted) {
        return assistedRepository.findById(id).map(assistedToUpdate -> {
            if (requestAssisted.getName() != null) {
                assistedToUpdate.setName(requestAssisted.getName());
            }
            if (requestAssisted.getAge() != null){
                assistedToUpdate.setAge(requestAssisted.getAge());
            }
            if (requestAssisted.getEmail() != null){
                assistedToUpdate.setEmail(requestAssisted.getEmail());
            }
            if (requestAssisted.getPhone() != null){
                assistedToUpdate.setPhone(requestAssisted.getPhone());
            }
            if (requestAssisted.getAddress() != null){
                assistedToUpdate.setAddress(requestAssisted.getAddress());
            }
            if (requestAssisted.getNeeds() != null){
                assistedToUpdate.setNeeds(requestAssisted.getNeeds());;
            }

            assistedRepository.save(assistedToUpdate);
            return ResponseEntity.ok(assistedToUpdate);
        }).orElse(ResponseEntity.notFound().build());
    }
    
}
