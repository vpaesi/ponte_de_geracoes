package com.group9.ponte_de_geracoes.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Collections;
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
import org.springframework.web.multipart.MultipartFile;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.service.AssistedService;
import com.group9.ponte_de_geracoes.util.AssistedCreator;

class AssistedControllerTest {

    @InjectMocks
    private AssistedController assistedController;

    @Mock
    private AssistedService assistedService;

    private Assisted assisted;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));

        assisted = AssistedCreator.createAssistedToBeSaved();
    }

    @Test
    void testGetAssisteds() {
        List<Assisted> assisteds = new ArrayList<>();
        assisteds.add(assisted);
        Page<Assisted> assistedPage = new PageImpl<>(assisteds);

        when(assistedService.getAssisteds(null, null, null, Pageable.unpaged())).thenReturn(assistedPage);

        ResponseEntity<Page<Assisted>> response = assistedController.getAssisteds(Pageable.unpaged(), null, null, null);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());

        Page<Assisted> responsePage = response.getBody();
        assertNotNull(responsePage);
        assertFalse(responsePage.isEmpty());

        Assisted createdAssisted = responsePage.getContent().get(0);
        assertEquals(assisted.getName(), createdAssisted.getName());
        assertEquals(assisted.getAddress().getCity(), createdAssisted.getAddress().getCity());

        verify(assistedService, times(1)).getAssisteds(null, null, null, Pageable.unpaged());
    }

    @SuppressWarnings("null")
    @Test
    void testInsertNewAssisted() {
        when(assistedService.insertNewAssisted(assisted)).thenReturn(assisted);

        ResponseEntity<Assisted> response = assistedController.insertNewAssisted(assisted);

        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(assisted.getName(), response.getBody().getName());

        verify(assistedService, times(1)).insertNewAssisted(assisted);
    }

    @SuppressWarnings("null")
    @Test
    void testUpdateAssisted() {
        Long assistedId = 1L;

        when(assistedService.updateAssisted(assistedId, assisted)).thenReturn(assisted);

        ResponseEntity<Assisted> response = assistedController.updateAssisted(assistedId, assisted);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(assisted.getName(), response.getBody().getName());

        verify(assistedService, times(1)).updateAssisted(assistedId, assisted);
    }

    @Test
    void testDeleteAssisted() {
        Long assistedId = 1L;

        when(assistedService.deleteAssisted(assistedId)).thenReturn(true);

        ResponseEntity<Void> response = assistedController.deleteAssisted(assistedId);

        assertNotNull(response);
        assertEquals(204, response.getStatusCode().value());
        assertNull(response.getBody());

        verify(assistedService, times(1)).deleteAssisted(assistedId);
    }

    @Test
    void testDeleteAssistedNotFound() {
        Long assistedId = 1L;

        doThrow(new EntityNotFoundException("Assisted not found", Collections.singletonList("O Assisted informado não foi encontrado.")))
                .when(assistedService).deleteAssisted(assistedId);

        assertThrows(EntityNotFoundException.class, () -> assistedController.deleteAssisted(assistedId));

        verify(assistedService, times(1)).deleteAssisted(assistedId);
    }

    @Test
    void testUploadImage() {
        Long assistedId = 1L;
        String fileUrl = "http://example.com/image.jpg";
        MultipartFile mockFile = mock(MultipartFile.class);

        when(assistedService.uploadImage(assistedId, mockFile)).thenReturn(fileUrl);

        ResponseEntity<?> response = assistedController.uploadImage(assistedId, mockFile);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertEquals(Collections.singletonMap("url", fileUrl), response.getBody());

        verify(assistedService, times(1)).uploadImage(assistedId, mockFile);
    }
}