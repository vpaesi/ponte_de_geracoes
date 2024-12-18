package com.group9.ponte_de_geracoes.util;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.group9.ponte_de_geracoes.model.Address;
import com.group9.ponte_de_geracoes.model.Helper;

public class HelperCreator {

    public static Helper createHelperToBeSaved() {
        Helper helper = new Helper();
        
        helper.setName("João Paulo");
        helper.setBirthDate(LocalDate.of(2005, 05, 12));
        helper.setRg("123456789");
        helper.setCpf("123.456.789-10");
        helper.setEmail("joaopaulo@example.com");
        helper.setPhone("(11) 98765-4321");
        helper.setPassword("password123");
        helper.setSkills("Ajudo na Cozinha e tarefas básicas");
        helper.setAvailable(true);
        helper.setProfileImageUrl(null);
        helper.setAvailableDays(Arrays.asList("Segunda", "Quarta", "Sexta"));
        helper.setAboutYou("Adoro ajudar em tarefas domésticas e jardinagem");

        Address address = new Address();
        address.setCity("São Paulo");
        address.setZipCode("01000-000");
        address.setStreet("Rua Exemplo");
        address.setNumber("123");
        address.setComplement("Apt. 45");

        helper.setAddress(address);

        return helper;
    }

    public static List<Helper> createListOfHelpersWithDifferentAddresses() {
        List<Helper> helpers = new ArrayList<>();
    
        helpers.add(createHelperWithAddress("São Paulo", "01000-000", "Rua Exemplo", "123", "Apt. 45"));
        helpers.add(createHelperWithAddress("Rio de Janeiro", "20000-000", "Avenida Exemplo", "456", null));
        helpers.add(createHelperWithAddress("Belo Horizonte", "30000-000", "Praça Exemplo", "789", "Casa"));
    
        return helpers;
    }

    public static Helper createHelperWithName(String name) {
        Helper helper = createHelperToBeSaved();
        helper.setName(name);
        return helper;
    }

    public static Helper createHelperWithAvailableDays(String name) {
        Helper helper = createHelperToBeSaved();
        helper.setName(name);
        return helper;
    }

    public static Helper createHelperWithoutCpf() {
        Helper helper = createHelperToBeSaved();
        helper.setCpf(null);
        return helper;
    }
    
    private static Helper createHelperWithAddress(String city, String zipCode, String street, String number, String complement) {
        Address address = new Address();
        address.setCity(city);
        address.setZipCode(zipCode);
        address.setStreet(street);
        address.setNumber(number);
        address.setComplement(complement);
    
        Helper helper = new Helper();
        helper.setAddress(address);
    
        return helper;
    }
}
