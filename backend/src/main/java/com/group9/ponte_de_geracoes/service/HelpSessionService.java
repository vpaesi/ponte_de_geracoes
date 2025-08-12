package com.group9.ponte_de_geracoes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group9.ponte_de_geracoes.exception.EntityNotFoundException;
import com.group9.ponte_de_geracoes.model.HelpSession;
import com.group9.ponte_de_geracoes.model.User;
import com.group9.ponte_de_geracoes.repository.HelpSessionRepository;
import com.group9.ponte_de_geracoes.repository.UserRepository;


@Service
public class HelpSessionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HelpSessionRepository assistanceLogRepository;

    public HelpSession createLog(HelpSession log) {
        if (log.getHelper() != null && log.getHelper().getId() != null) {
            Optional<User> helper = userRepository.findById(log.getHelper().getId());

            if (helper.isEmpty() || !"helper".equals(helper.get().getUserType())) {
                throw new EntityNotFoundException("Helper not found", List.of("O Ajudante informado não foi encontrado."));
            }
            log.setHelper(helper.get());
        }

        if (log.getAssisted() != null && log.getAssisted().getId() != null) {
            Optional<User> assisted = userRepository.findById(log.getAssisted().getId());
            if (assisted.isEmpty() || !"assisted".equals(assisted.get().getUserType())) {
                throw new EntityNotFoundException("Assisted not found", List.of("O Ajudado informado não foi encontrado."));
            }
            log.setAssisted(assisted.get());
        }
        return assistanceLogRepository.save(log);
    }

    public HelpSession findById(Long id) {
        Optional<HelpSession> assistanceLog = assistanceLogRepository.findById(id);

        if (assistanceLog.isEmpty()) {
            throw new EntityNotFoundException("Log not found", List.of("O registro de encontro informado não foi encontrado."));
        }
        return assistanceLog.get();
    }

    public Page<HelpSession> findAll(Pageable pageable) {
        return assistanceLogRepository.findAll(pageable);
    }
}


