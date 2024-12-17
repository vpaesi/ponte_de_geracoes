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
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.service.HelperService;
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

    MockHttpServletRequest mockRequest = new MockHttpServletRequest();
    RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));

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

        Page<Helper> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        Helper createdHelper = responsePage.getContent().get(0);
        assertEquals(helper.getName(), createdHelper.getName());
        assertEquals(helper.getAddress().getCity(), createdHelper.getAddress().getCity());

        verify(helperService, times(1)).getHelpers(null, null, null, Pageable.unpaged());
    }

    @Test
    void testGetHelpersWithNoContent() {
        List<Helper> helpers = new ArrayList<>();
        Page<Helper> helperPage = new PageImpl<>(helpers);

        when(helperService.getHelpers(null, null, null, Pageable.unpaged())).thenReturn(helperPage);

        ResponseEntity<Page<Helper>> response = helperController.getHelpers(Pageable.unpaged(), null, null, null);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<Helper> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertTrue(responsePage.isEmpty());

        verify(helperService, times(1)).getHelpers(null, null, null, Pageable.unpaged());
    }

    @Test
    void testGetHelpersWithFilteredByCity() {
        List<Helper> helpers = HelperCreator.createListOfHelpersWithDifferentAddresses();

        Page<Helper> helperPage = new PageImpl<>(helpers);

        when(helperService.getHelpers(null, "Porto Alegre", null, Pageable.unpaged())).thenReturn(helperPage);

        ResponseEntity<Page<Helper>> response = helperController.getHelpers(Pageable.unpaged(), null, "Porto Alegre", null);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<Helper> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        Helper actualHelper = responsePage.getContent().get(0);
        Helper expectedHelper = helpers.get(0);
        assertEquals(actualHelper.getAddress().getCity(), expectedHelper.getAddress().getCity());

        verify(helperService, times(1)).getHelpers(null, "Porto Alegre", null, Pageable.unpaged());
    }

    @Test
    void testGetHelpersWithFilteredByDay() {
        List<Helper> helpers = HelperCreator.createListOfHelpersWithDifferentAddresses();

        Page<Helper> helperPage = new PageImpl<>(helpers);

        when(helperService.getHelpers(null, null, "Segunda", Pageable.unpaged())).thenReturn(helperPage);

        ResponseEntity<Page<Helper>> response = helperController.getHelpers(Pageable.unpaged(), null, null, "Segunda");

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<Helper> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        Helper actualHelper = responsePage.getContent().get(0);
        Helper expectedHelper = helpers.get(0);
        assertEquals(actualHelper.getAddress().getCity(), expectedHelper.getAddress().getCity());

        verify(helperService, times(1)).getHelpers(null, null, "Segunda", Pageable.unpaged());
    }

    @Test
    void testCreateHelper() {
        when(helperService.insertNewHelper(helper)).thenReturn(helper);

        ResponseEntity<Helper> response = helperController.insertNewHelper(helper);
    
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(helper.getName(), response.getBody().getName());
    
        verify(helperService, times(1)).insertNewHelper(helper);
    }

    @Test
    void testUpdateHelper() {
        Long helperId = 1L;

        when(helperService.updateHelper(helperId, helper)).thenReturn(helper);

        ResponseEntity<Helper> response = helperController.updateHelper(helperId, helper);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(helper.getName(), response.getBody().getName());

        verify(helperService, times(1)).updateHelper(helperId, helper);
    }

    @Test
    void testUpdateHelperNotFound() {
        Long helperId = 1L;

        when(helperService.updateHelper(helperId, helper)).thenReturn(null);

        ResponseEntity<Helper> response = helperController.updateHelper(helperId, helper);

        assertNotNull(response);
        assertEquals(404, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(helperService, times(1)).updateHelper(helperId, helper);
    }

    @Test
    void testDeleteHelper() {
        Long helperId = 1L;

        when(helperService.deleteHelper(helperId)).thenReturn(true);

        ResponseEntity<Void> response = helperController.deleteHelper(helperId);

        assertNotNull(response);
        assertEquals(204, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(helperService, times(1)).deleteHelper(helperId);
    }

    @Test
    void testDeleteHelperNotFound() {
        Long helperId = 1L;

        doThrow(new RuntimeException("Helper not found")).when(helperService).deleteHelper(helperId);

        assertThrows(RuntimeException.class, () -> helperController.deleteHelper(helperId));

        verify(helperService, times(1)).deleteHelper(helperId);
    }

}

