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
import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.repository.AssistedRepository;
import com.group9.ponte_de_geracoes.util.AssistedCreator;

class AssistedServiceTest {

    @InjectMocks
    private AssistedService assistedService;

    @Mock
    private AssistedRepository assistedRepository;

    private Assisted assisted;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        assisted = AssistedCreator.createAssistedToBeSaved();
    }

    @Test
    void testGetHelpers() {
        List<Assisted> assisteds = Collections.singletonList(assisted);
        Page<Assisted> assistedPage = new PageImpl<>(assisteds);

        when(assistedRepository.findAll(Pageable.unpaged())).thenReturn(assistedPage);

        Page<Assisted> result = assistedService.getAssisteds(null, null, null, Pageable.unpaged());

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(assisted.getName(), result.getContent().get(0).getName());

        verify(assistedRepository, times(1)).findAll(Pageable.unpaged());
    }

    @Test
    void testInsertNewHelper() {
        when(assistedRepository.save(assisted)).thenReturn(assisted);

        Assisted result = assistedService.insertNewAssisted(assisted);

        assertNotNull(result);
        assertEquals(assisted.getName(), result.getName());

        verify(assistedRepository, times(1)).save(assisted);
    }

    @Test
    void testUploadImage() throws IOException {
        MultipartFile mockFile = mock(MultipartFile.class);
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getOriginalFilename()).thenReturn("profile.jpg");
        when(mockFile.getContentType()).thenReturn("image/jpeg");
        when(mockFile.getInputStream()).thenReturn(mock(InputStream.class));

        when(assistedRepository.findById(1L)).thenReturn(Optional.of(assisted));

        String result = assistedService.uploadImage(1L, mockFile);

        assertNotNull(result);
        assertTrue(result.contains("uploads/assisted/"));

        verify(assistedRepository, times(1)).findById(1L);
        verify(assistedRepository, times(1)).save(assisted);
    }

    @Test
    void testUploadImageHelperNotFound() {
        MultipartFile mockFile = mock(MultipartFile.class);
        when(assistedRepository.findById(1L)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> assistedService.uploadImage(1L, mockFile));

        assertEquals("Assisted not founded", exception.getMessage());
        verify(assistedRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateHelper() {
        when(assistedRepository.findById(1L)).thenReturn(Optional.of(assisted));
        when(assistedRepository.save(assisted)).thenReturn(assisted);

        Assisted updatedAssisted = new Assisted();
        updatedAssisted.setName("Updated Name");

        Assisted result = assistedService.updateAssisted(1L, updatedAssisted);

        assertNotNull(result);
        assertEquals("Updated Name", result.getName());

        verify(assistedRepository, times(1)).findById(1L);
        verify(assistedRepository, times(1)).save(assisted);
    }

    @Test
    void testDeleteHelper() {
        when(assistedRepository.existsById(1L)).thenReturn(true);

        boolean result = assistedService.deleteAssisted(1L);

        assertTrue(result);
        verify(assistedRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteHelperNotExists() {
        when(assistedRepository.existsById(1L)).thenReturn(false);

        boolean result = assistedService.deleteAssisted(1L);

        assertFalse(result);
        verify(assistedRepository, times(0)).deleteById(1L);
    }
}
