package com.group9.ponte_de_geracoes.controller;

import java.net.URI;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.service.AssistedService;
import com.group9.ponte_de_geracoes.util.SwaggerJsonExamplesUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/assisted")
@Tag(name = "Assisted API", description = "Gerencia o objeto de Assisted dentro do sistema")
public class AssistedController {

    @Autowired
    private AssistedService assistedService;

    private URI createNewURIById(Assisted assisted) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(assisted.getId())
                .toUri();
    }

    @Operation(
        summary = "Lista de assisted cadastrados",
        description = "Retorna uma página de assisted cadastrados no sistema.",
        parameters = {
            @Parameter(
                name = "page",
                description = "Número da página.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "integer", defaultValue = "0")
            ),
            @Parameter(
                name = "size",
                description = "Quantidade de itens por página.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "integer", defaultValue = "10")
            ),
            @Parameter(
                name = "sort",
                description = "Ordenação no formato `campo,asc` ou `campo,desc`.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "name,id")
            ),
            @Parameter(
                name = "city",
                description = "Filtro por cidade.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "São Paulo")
            ),
            @Parameter(
                name = "day",
                description = "Filtro por dia da semana.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "Monday")
            )
        },
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Assisted retornados com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    examples = {
                        @ExampleObject(
                            summary = "Lista populada",
                            name = "Exemplo de resposta com assisted cadastrados",
                            value = SwaggerJsonExamplesUtil.ASSISTEDS_PAGE_POPULATED_LIST_EXAMPLE
                        ),
                        @ExampleObject(
                            summary = "Lista vazia",
                            name = "Exemplo de resposta sem assisted cadastrados",
                            value = SwaggerJsonExamplesUtil.ASSISTEDS_PAGE_EMPTY_LIST_EXAMPLE
                        )
                    }
                )
            )
        }
    )
    @GetMapping
    public ResponseEntity<Page<Assisted>> getAssisteds(
            @Parameter(hidden = true)
            @PageableDefault(size = 10, sort = {"id"}) Pageable pageable,
            @RequestParam(required = false) Boolean needsHelp,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String day
    ) {
        Page<Assisted> page = assistedService.getAssisteds(needsHelp, city, day, pageable);
        
        return ResponseEntity.ok(page);
    }

    @Operation(
        summary = "Insere um novo assisted",
        description = "Adiciona um novo assisted ao sistema.",
        responses = {
            @ApiResponse(
                responseCode = "201",
                description = "Assisted inserido com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Assisted.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Erro ao inserir assisted",
                content = @Content
            )
        }
    )
    @PostMapping
    public ResponseEntity<Assisted> insertNewAssisted(@RequestBody Assisted assisted) {     
        Assisted insertedAssisted = assistedService.insertNewAssisted(assisted);
        URI locator = createNewURIById(insertedAssisted);

        return ResponseEntity.created(locator).body(insertedAssisted);
    }

    @Operation(
        summary = "Faz upload de imagem para um assisted",
        description = "Permite o upload de uma imagem associada ao assisted.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Imagem carregada e salva com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = String.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Erro no upload da imagem",
                content = @Content
            )
        }
    )
    @PostMapping("/upload-image/{assistedId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long assistedId, @RequestParam("file") MultipartFile file) {
        String fileUrl = assistedService.uploadImage(assistedId, file);

        return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
    }

    @Operation(
        summary = "Atualiza um assisted",
        description = "Atualiza as informações de um assisted existente.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Assisted atualizado com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Assisted.class)
                )
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Assisted não encontrado",
                content = @Content
            )
        }
    )
    @PutMapping("/{id}")
    public ResponseEntity<Assisted> updateAssisted(@PathVariable Long id, @Validated @RequestBody Assisted requestAssisted) {
        Assisted updatedAssisted = assistedService.updateAssisted(id, requestAssisted);
        if (updatedAssisted != null) {
            return ResponseEntity.ok(updatedAssisted);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
        summary = "Deleta um assisted",
        description = "Remove um assisted do sistema.",
        responses = {
            @ApiResponse(
                responseCode = "204",
                description = "Assisted deletado com sucesso",
                content = @Content
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Assisted não encontrado",
                content = @Content
            )
        }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssisted(@PathVariable Long id) {
        if (assistedService.deleteAssisted(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
