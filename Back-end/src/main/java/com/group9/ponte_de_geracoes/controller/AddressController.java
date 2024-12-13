package com.group9.ponte_de_geracoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group9.ponte_de_geracoes.service.AddressService;



@RestController
@RequestMapping("/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;
    
    @GetMapping("/cities")
    public ResponseEntity<Page<String>> getCities(
        Pageable pageable) {
    Page<String> cities = addressService.getAllDistinctedCities(pageable);
    return ResponseEntity.ok(cities);
}

}
