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
import com.group9.ponte_de_geracoes.services.AssistanceLogService;

@RestController
@RequestMapping("/assistance-logs")
public class AssistanceLogController {

    @Autowired
    private AssistanceLogService assistanceLogService;

    @PostMapping
    public ResponseEntity<AssistanceLog> createLog(@RequestBody AssistanceLog log) {
        AssistanceLog savedLog = assistanceLogService.createLog(log);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLog);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssistanceLog> getLogById(@PathVariable Long id) {
        AssistanceLog log = assistanceLogService.findById(id);
        return ResponseEntity.ok(log);
    }

    @GetMapping
    public ResponseEntity<Page<AssistanceLog>> getAllLogs(@PageableDefault(size = 10, sort = {"id"}) Pageable pageable) {
        Page<AssistanceLog> pageLogs = assistanceLogService.findAll(pageable);
        return ResponseEntity.ok(pageLogs);
    }
}

