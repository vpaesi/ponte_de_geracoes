package com.group9.ponte_de_geracoes.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.repository.HelperRepository;
import com.group9.ponte_de_geracoes.util.HelperCreator;

class HelperServiceTest {

    @InjectMocks
    private HelperService helperService;

    @Mock
    private HelperRepository helperRepository;

    private Helper helper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        helper = HelperCreator.createHelperToBeSaved();
    }

    @Test
    void testGetHelpers() {
        List<Helper> helpers = Collections.singletonList(helper);
        Page<Helper> helperPage = new PageImpl<>(helpers);

        when(helperRepository.findAll(Pageable.unpaged())).thenReturn(helperPage);

        Page<Helper> result = helperService.getHelpers(null, null, null, Pageable.unpaged());

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(helper.getName(), result.getContent().get(0).getName());

        verify(helperRepository, times(1)).findAll(Pageable.unpaged());
    }

    @Test
    void testInsertNewHelper() {
        when(helperRepository.save(helper)).thenReturn(helper);

        Helper result = helperService.insertNewHelper(helper);

        assertNotNull(result);
        assertEquals(helper.getName(), result.getName());

        verify(helperRepository, times(1)).save(helper);
    }

    @Test
    void testUploadImage() throws IOException {
        MultipartFile mockFile = mock(MultipartFile.class);
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getOriginalFilename()).thenReturn("profile.jpg");
        when(mockFile.getContentType()).thenReturn("image/jpeg");
        when(mockFile.getInputStream()).thenReturn(mock(InputStream.class));

        when(helperRepository.findById(1L)).thenReturn(Optional.of(helper));

        String result = helperService.uploadImage(1L, mockFile);

        assertNotNull(result);
        assertTrue(result.contains("uploads/helper/"));

        verify(helperRepository, times(1)).findById(1L);
        verify(helperRepository, times(1)).save(helper);
    }

    @Test
    void testUploadImageHelperNotFound() {
        MultipartFile mockFile = mock(MultipartFile.class);
        when(helperRepository.findById(1L)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> helperService.uploadImage(1L, mockFile));

        assertEquals("Helper not founded", exception.getMessage());
        verify(helperRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateHelper() {
        when(helperRepository.findById(1L)).thenReturn(Optional.of(helper));
        when(helperRepository.save(helper)).thenReturn(helper);

        Helper updatedHelper = new Helper();
        updatedHelper.setName("Updated Name");

        Helper result = helperService.updateHelper(1L, updatedHelper);

        assertNotNull(result);
        assertEquals("Updated Name", result.getName());

        verify(helperRepository, times(1)).findById(1L);
        verify(helperRepository, times(1)).save(helper);
    }

    @Test
    void testDeleteHelper() {
        when(helperRepository.existsById(1L)).thenReturn(true);

        boolean result = helperService.deleteHelper(1L);

        assertTrue(result);
        verify(helperRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteHelperNotExists() {
        when(helperRepository.existsById(1L)).thenReturn(false);

        boolean result = helperService.deleteHelper(1L);

        assertFalse(result);
        verify(helperRepository, times(0)).deleteById(1L);
    }
}
