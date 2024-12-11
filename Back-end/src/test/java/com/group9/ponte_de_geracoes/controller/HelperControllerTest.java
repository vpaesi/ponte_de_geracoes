package com.group9.ponte_de_geracoes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.services.HelperService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class HelperControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private HelperService helperService;

    @InjectMocks
    private HelperController helperController;

    private Helper helper;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        // Criando um objeto Helper para testes
        helper = new Helper();
        helper.setId(1L);
        helper.setName("John Doe");
    }

    // Teste do método GET /helper
    @Test
    public void testGetHelpers_EmptyPage() throws Exception {
        Page<Helper> page = new PageImpl<>(Collections.emptyList(), PageRequest.of(0, 10), 0);

        when(helperService.getHelpers(any())).thenReturn(page);

        mockMvc.perform(get("/helper")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isEmpty())  
                .andExpect(jsonPath("$.page.totalElements").value(0))  
                .andExpect(jsonPath("$.page.totalPages").value(0));  
    } 

    @Test
    public void testGetHelpers_WithContent() throws Exception {
        Helper helper = new Helper();
        helper.setId(1L);
        helper.setName("John Doe");

        Page<Helper> page = new PageImpl<>(Collections.singletonList(helper), PageRequest.of(0, 10), 1);

        when(helperService.getHelpers(any())).thenReturn(page);

        mockMvc.perform(get("/helper")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value(helper.getName())) 
                .andExpect(jsonPath("$.content[0].id").value(helper.getId()))  
                .andExpect(jsonPath("$.page.totalElements").value(1))  
                .andExpect(jsonPath("$.page.totalPages").value(1));  
    }


    // Teste do método POST /helper (inserção de um novo helper)
    @Test
    public void testInsertNewHelper() throws Exception {
        when(helperService.insertNewHelper(any(Helper.class))).thenReturn(helper);

        mockMvc.perform(post("/helper")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(helper)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(helper.getName())); // Verificando se o nome foi corretamente retornado
    }

    // Teste de falha no POST /helper (quando o helper é inválido)
    @Test
    public void testInsertNewHelper_InvalidData() throws Exception {
        Helper invalidHelper = new Helper(); // Sem dados válidos

        mockMvc.perform(post("/helper")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidHelper)))
                .andExpect(status().isBadRequest());
    }

    // Teste do método PUT /helper/{id} (atualização de um helper)
    @Test
    public void testUpdateHelper() throws Exception {
        when(helperService.updateHelper(eq(1L), any(Helper.class))).thenReturn(helper);

        mockMvc.perform(put("/helper/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(helper)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(helper.getName())); // Verificando se o nome foi atualizado
    }

    // Teste de falha no PUT /helper/{id} (quando o helper não é encontrado)
    @Test
    public void testUpdateHelper_NotFound() throws Exception {
        when(helperService.updateHelper(eq(999L), any(Helper.class))).thenReturn(null);

        mockMvc.perform(put("/helper/{id}", 999L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(helper)))
                .andExpect(status().isNotFound());
    }

    // Teste do método DELETE /helper/{id} (exclusão de um helper)
    @Test
    public void testDeleteHelper() throws Exception {
        when(helperService.deleteHelper(eq(1L))).thenReturn(true);

        mockMvc.perform(delete("/helper/{id}", 1L))
                .andExpect(status().isNoContent());
    }

    // Teste de falha no DELETE /helper/{id} (quando o helper não é encontrado)
    @Test
    public void testDeleteHelper_NotFound() throws Exception {
        when(helperService.deleteHelper(eq(999L))).thenReturn(false);

        mockMvc.perform(delete("/helper/{id}", 999L))
                .andExpect(status().isNotFound());
    }
}
