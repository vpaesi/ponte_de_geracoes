package com.group9.ponte_de_geracoes.controller;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.service.HelperService;
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
@RequestMapping("/helper")
@Tag(name = "Helper API", description = "Gerencia o objeto de Helper dentro do sistema")
public class HelperController {

    @Autowired
    private HelperService helperService;

    private URI createNewURIById(Helper helper) {
        return ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(helper.getId())
                .toUri();
    }

    @Operation(
        summary = "Lista de helpers cadastrados",
        description = "Retorna uma página de helpers cadastrados no sistema.",
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
                description = "Helpers retornados com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    examples = {
                        @ExampleObject(
                            summary = "Lista populada",
                            name = "Exemplo de resposta com helpers cadastrados",
                            value = SwaggerJsonExamplesUtil.HELPERS_PAGE_POPULATED_LIST_EXAMPLE
                        ),
                        @ExampleObject(
                            summary = "Lista vazia",
                            name = "Exemplo de resposta sem helpers cadastrados",
                            value = SwaggerJsonExamplesUtil.HELPERS_PAGE_EMPTY_LIST_EXAMPLE
                        )
                    }
                )
            )
        }
    )
    @GetMapping
    public ResponseEntity<Page<Helper>> getHelpers(@Parameter(hidden = true)
            @PageableDefault(size = 10, sort = {"id"}) Pageable pageable,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String day
    ) {
        Page<Helper> page = helperService.getHelpers(isAvailable, city, day, pageable);
        
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Helper> getHelperById(@PathVariable Long userId) {
        Optional<Helper> helper = helperService.getHelperById(userId);
        if (helper.isPresent()) {
            return ResponseEntity.ok(helper.get());
        }
        throw new EntityNotFoundException("Helper not founded", List.of("O Ajudante informado não foi encontrado."));
    }

    @Operation(
        summary = "Insere um novo helper",
        description = "Adiciona um novo helper ao sistema.",
        responses = {
            @ApiResponse(
                responseCode = "201",
                description = "Helper inserido com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Helper.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Erro ao inserir helper",
                content = @Content
            )
        }
    )
    @PostMapping
    public ResponseEntity<Helper> insertNewHelper(@RequestBody Helper helper) {     
        Helper insertedHelper = helperService.insertNewHelper(helper);
        URI locator = createNewURIById(insertedHelper);

        return ResponseEntity.created(locator).body(insertedHelper);
    }

    @Operation(
        summary = "Faz upload de imagem para um helper",
        description = "Permite o upload de uma imagem associada ao helper.",
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
    @PostMapping("/upload-image/{helperId}")
    public ResponseEntity<?> uploadImage(@PathVariable Long helperId, @RequestParam("file") MultipartFile file) {
        String fileUrl = helperService.uploadImage(helperId, file);

        return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
    }

    @Operation(
        summary = "Atualiza um helper",
        description = "Atualiza as informações de um helper existente.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Helper atualizado com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Helper.class)
                )
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Helper não encontrado",
                content = @Content
            )
        }
    )
    @PutMapping("/{id}")
    public ResponseEntity<Helper> updateHelper(@PathVariable Long id, @Validated @RequestBody Helper requestHelper) {
        Helper updatedHelper = helperService.updateHelper(id, requestHelper);
        if (updatedHelper != null) {
            return ResponseEntity.ok(updatedHelper);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
        summary = "Deleta um helper",
        description = "Remove um helper do sistema.",
        responses = {
            @ApiResponse(
                responseCode = "204",
                description = "Helper deletado com sucesso",
                content = @Content
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Helper não encontrado",
                content = @Content
            )
        }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelper(@PathVariable Long id) {
        if (helperService.deleteHelper(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
