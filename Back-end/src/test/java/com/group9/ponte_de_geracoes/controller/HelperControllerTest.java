package com.group9.ponte_de_geracoes.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.services.HelperService;
import com.group9.ponte_de_geracoes.util.HelperCreator;

class HelperControllerTest {

    @InjectMocks
    private HelperController helperController;

    @Mock
    private HelperService helperService;

    private Helper helper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        helper = HelperCreator.createHelperToBeSaved();
    }

    @Test
    void testGetHelpers() {
        List<Helper> helpers = new ArrayList<>();
        helpers.add(helper);
        Page<Helper> helperPage = new PageImpl<>(helpers);

        when(helperService.getHelpers(null, null, null, Pageable.unpaged())).thenReturn(helperPage);

        ResponseEntity<Page<Helper>> response = helperController.getHelpers(Pageable.unpaged(), null, null, null);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        // O corpo da resposta é uma página de Helpers
        Page<Helper> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        // Pegando o primeiro Helper da página para validar
        Helper createdHelper = responsePage.getContent().get(0);
        assertEquals(helper.getName(), createdHelper.getName());
        assertEquals(helper.getAddress().getCity(), createdHelper.getAddress().getCity()); // Exemplo de verificação adicional

        verify(helperService, times(1)).getHelpers(null, null, null, Pageable.unpaged());
    }
}

