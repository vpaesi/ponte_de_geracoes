package com.group9.ponte_de_geracoes.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.repository.HelperRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @PutMapping("/{id}")
    public ResponseEntity<Helper> updateHelper(@PathVariable Long id, @Validated @RequestBody Helper requestHelper) {
        return helperRepository.findById(id).map(helperToUpdate -> {
            if (requestHelper.getName() != null) {
                helperToUpdate.setName(requestHelper.getName());
            }
            if (requestHelper.getBirthDate() != null){
                helperToUpdate.setBirthDate(requestHelper.getBirthDate());
            }
            if (requestHelper.getEmail() != null){
                helperToUpdate.setEmail(requestHelper.getEmail());
            }
            if (requestHelper.getPhone() != null){
                helperToUpdate.setPhone(requestHelper.getPhone());
            }
            if (requestHelper.getAddress() != null){
                helperToUpdate.setAddress(requestHelper.getAddress());
            }
            if (requestHelper.getSkills() != null){
                helperToUpdate.setSkills(requestHelper.getSkills());
            }

            helperRepository.save(helperToUpdate);
            return ResponseEntity.ok(helperToUpdate);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelper(@PathVariable Long id){
        if (helperRepository.existsById(id)){
            helperRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
