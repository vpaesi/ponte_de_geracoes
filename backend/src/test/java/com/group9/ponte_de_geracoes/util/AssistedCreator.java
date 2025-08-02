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
        assisted.setRg("987654321");
        assisted.setCpf("987.654.321-00");
        assisted.setEmail("mariasilva@example.com");
        assisted.setPhone("(11) 99999-8888");
        assisted.setProfileImageUrl(null);
        assisted.setAvailableDays(Arrays.asList("Terça", "Quinta", "Sábado"));
        assisted.setAboutYou("Sou uma pessoa tranquila, gosto de companhia e de conversar.");

        Address address = createAddress("São Paulo", "12345-678", "Rua das Flores", "100", "Casa");
        assisted.setAddress(address);

        return assisted;
    }

    // Método para criar um Assisted com nome personalizado
    public static Assisted createAssistedWithName(String name) {
        Assisted assisted = createAssistedToBeSaved();
        assisted.setName(name);
        return assisted;
    }

    // Método para criar um Assisted sem CPF
    public static Assisted createAssistedWithoutCpf() {
        Assisted assisted = createAssistedToBeSaved();
        assisted.setCpf(null);
        return assisted;
    }

    // Método para criar um Assisted com endereço personalizado
    public static Assisted createAssistedWithAddress(String city, String zipCode, String street, String number, String complement) {
        Address address = createAddress(city, zipCode, street, number, complement);
        Assisted assisted = createAssistedToBeSaved();
        assisted.setAddress(address);
        return assisted;
    }

    // Método auxiliar para criar um endereço
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
