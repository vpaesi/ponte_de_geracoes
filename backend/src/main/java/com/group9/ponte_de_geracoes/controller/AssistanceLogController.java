package com.group9.ponte_de_geracoes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group9.ponte_de_geracoes.model.AssistanceLog;
import com.group9.ponte_de_geracoes.service.AssistanceLogService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/assistance-logs")
@Tag(name = "AssistanceLog API", description = "Gerencia os registros de assistência entre ajudantes e assistidos.")
public class AssistanceLogController {

    @Autowired
    private AssistanceLogService assistanceLogService;

    @Operation(
        summary = "Cria um novo registro de assistência",
        description = "Este endpoint cria um novo log de assistência, registrando o encontro entre ajudante e assistido.",
        responses = {
            @ApiResponse(
                responseCode = "201",
                description = "Log de assistência criado com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = AssistanceLog.class)
                )
            ),
            @ApiResponse(
                responseCode = "400",
                description = "Erro ao criar o log de assistência",
                content = @Content
            )
        }
    )
    @PostMapping
    public ResponseEntity<AssistanceLog> createLog(@RequestBody AssistanceLog log) {
        AssistanceLog savedLog = assistanceLogService.createLog(log);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLog);
    }

    @Operation(
        summary = "Obtém um registro de assistência por ID",
        description = "Este endpoint retorna os detalhes de um log de assistência específico, buscando pelo ID do registro.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Log de assistência encontrado com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = AssistanceLog.class)
                )
            ),
            @ApiResponse(
                responseCode = "404",
                description = "Log de assistência não encontrado",
                content = @Content
            )
        }
    )
    @GetMapping("/{id}")
    public ResponseEntity<AssistanceLog> getLogById(@PathVariable Long id) {
        AssistanceLog log = assistanceLogService.findById(id);
        if (log != null) {
            return ResponseEntity.ok(log);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(
        summary = "Obtém uma lista paginada de logs de assistência",
        description = "Este endpoint retorna uma página de registros de assistência, permitindo a paginação.",
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
                description = "Critério de ordenação no formato `campo,asc` ou `campo,desc`.",
                in = ParameterIn.QUERY,
                schema = @Schema(type = "string", example = "id,desc")
            )
        },
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "Lista de logs de assistência retornada com sucesso",
                content = @Content(
                    mediaType = "application/json",
                    examples = {
                        @ExampleObject(
                            summary = "Exemplo de resposta com logs de assistência",
                            value = "[{\"id\": 1, \"helperId\": 1, \"assistedId\": 1, \"date\": \"2024-12-16\", \"status\": \"Completed\"}]"
                        )
                    }
                )
            )
        }
    )
    @GetMapping
    public ResponseEntity<Page<AssistanceLog>> getAllLogs(@Parameter(hidden = true) @PageableDefault(size = 10, sort = {"id"}) Pageable pageable) {
        Page<AssistanceLog> pageLogs = assistanceLogService.findAll(pageable);
        return ResponseEntity.ok(pageLogs);
    }
}
