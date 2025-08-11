package com.group9.ponte_de_geracoes.util;

import java.time.LocalDate;
import java.util.Arrays;

import com.group9.ponte_de_geracoes.model.Address;
import com.group9.ponte_de_geracoes.model.Assisted;

public class AssistedCreator {

    public static Assisted createAssistedToBeSaved() {
        Assisted assisted = new Assisted();
        assisted.setName("Maria Silva");
        assisted.setBirthDate(LocalDate.of(1940, 3, 25));
        assisted.setCpf("987.654.321-00");
        assisted.setEmail("mariasilva@example.com");
        assisted.setPhone("(11) 99999-8888");
        assisted.setPassword("password123");
        assisted.setConfirmPassword("password123");
        assisted.setAvailable(true);
        assisted.setProfileImageUrl(null);
        assisted.setAvailableDays(Arrays.asList("Terça", "Quinta", "Sábado"));
        assisted.setNeedsAndSkills(Arrays.asList("Ajuda com compras", "Companhia"));
        assisted.setAboutYou("Sou uma pessoa tranquila, gosto de companhia e de conversar.");

        Address address = createAddress("São Paulo", "12345-678", "Rua das Flores", "100", "Casa");
        assisted.setAddress(address);

        return assisted;
    }

    public static Assisted createAssistedWithName(String name) {
        Assisted assisted = createAssistedToBeSaved();
        assisted.setName(name);
        return assisted;
    }

    public static Assisted createAssistedWithoutCpf() {
        Assisted assisted = createAssistedToBeSaved();
        assisted.setCpf(null);
        return assisted;
    }

    public static Assisted createAssistedWithAddress(String city, String zipCode, String street, String number, String complement) {
        Address address = createAddress(city, zipCode, street, number, complement);
        Assisted assisted = createAssistedToBeSaved();
        assisted.setAddress(address);
        return assisted;
    }

    private static Address createAddress(String city, String zipCode, String street, String number, String complement) {
        Address address = new Address();
        address.setCity(city);
        address.setZipCode(zipCode);
        address.setStreet(street);
        address.setNumber(number);
        address.setComplement(complement);
        return address;
    }
}
