package com.group9.ponte_de_geracoes.util;

import java.time.LocalDate;
import java.util.Arrays;

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
        helper.setSkills("Preciso de ajuda na Cozinha e tarefas básicas");
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

    public static Helper createHelperWithName(String name) {
        Helper helper = createHelperToBeSaved();
        helper.setName(name);
        return helper;
    }

    public static Helper createHelperWithoutCpf() {
        Helper helper = createHelperToBeSaved();
        helper.setCpf(null);
        return helper;
    }
}
