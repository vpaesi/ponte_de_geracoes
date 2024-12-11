package com.group9.ponte_de_geracoes.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group9.ponte_de_geracoes.model.AssistanceLog;
import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.repository.AssistanceLogRepository;
import com.group9.ponte_de_geracoes.repository.AssistedRepository;
import com.group9.ponte_de_geracoes.repository.HelperRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AssistanceLogService {

    @Autowired
    private HelperRepository helperRepository;

    @Autowired
    private AssistedRepository assistedRepository;

    @Autowired
    private AssistanceLogRepository assistanceLogRepository;

    public AssistanceLog createLog(AssistanceLog log) {
        if (log.getHelper() != null && log.getHelper().getId() != null) {
            Optional<Helper> helper = helperRepository.findById(log.getHelper().getId());

            if (helper.isEmpty()){
                throw new EntityNotFoundException("Helper not founded");
            }
            log.setHelper(helper.get());
        }

        if (log.getAssisted() != null && log.getAssisted().getId() != null) {
            Optional<Assisted> assisted = assistedRepository.findById(log.getAssisted().getId());
            if (assisted.isEmpty()){
                throw new EntityNotFoundException("Assisted not founded");
            }
            log.setAssisted(assisted.get());
        }
        return assistanceLogRepository.save(log);
    }

    public AssistanceLog findById(Long id) {
        Optional<AssistanceLog> assitanceLog = assistanceLogRepository.findById(id);

        if (assitanceLog.isEmpty()){
            throw new EntityNotFoundException("Log not founded");
        }
        return assitanceLog.get();
    }

    public Page<AssistanceLog> findAll(Pageable pageable) {
        return assistanceLogRepository.findAll(pageable);
    }
}


