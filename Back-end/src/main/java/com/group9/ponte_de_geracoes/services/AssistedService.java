package com.group9.ponte_de_geracoes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group9.ponte_de_geracoes.model.Assisted;
import com.group9.ponte_de_geracoes.repository.AssistedRepository;

@Service
public class AssistedService {

    @Autowired
    private AssistedRepository assistedRepository;

    public Page<Assisted> getAssisteds(Boolean needsHelp, String city, String day, Pageable pageable) {
        if (city != null && day != null) {
            return assistedRepository.findByAddress_CityAndNeedsHelp(city, needsHelp, pageable);
        } else if (day != null) {
            return assistedRepository.findByAvailableDaysContainsAndNeedsHelp(day, needsHelp, pageable);
        } else if (needsHelp != null) {
            return assistedRepository.findByNeedsHelp(needsHelp, pageable);
        } else {
            return assistedRepository.findAll(pageable);
        }
    }

    public Assisted insertNewAssisted(Assisted assisted) {
        assisted.setId(null);
        return assistedRepository.save(assisted);
    }

    public Assisted updateAssisted(Long id, Assisted requestAssisted) {
        return assistedRepository.findById(id).map(assistedToUpdate -> {
            if (requestAssisted.getName() != null) {
                assistedToUpdate.setName(requestAssisted.getName());
            }
            if (requestAssisted.getBirthDate() != null) {
                assistedToUpdate.setBirthDate(requestAssisted.getBirthDate());
            }
            if (requestAssisted.getEmail() != null) {
                assistedToUpdate.setEmail(requestAssisted.getEmail());
            }
            if (requestAssisted.getPhone() != null) {
                assistedToUpdate.setPhone(requestAssisted.getPhone());
            }
            if (requestAssisted.getAddress() != null) {
                assistedToUpdate.setAddress(requestAssisted.getAddress());
            }
            if (requestAssisted.getNeeds() != null) {
                assistedToUpdate.setNeeds(requestAssisted.getNeeds());
            }
            if (requestAssisted.getNeedsHelp() != null) {
                assistedToUpdate.setNeedsHelp(requestAssisted.getNeedsHelp());
            }
            if (requestAssisted.getRg() != null) {
                assistedToUpdate.setRg(requestAssisted.getRg());
            }
            if (requestAssisted.getCpf() != null) {
                assistedToUpdate.setCpf(requestAssisted.getCpf());
            }
            if (requestAssisted.getPassword() != null) {
                assistedToUpdate.setPassword(requestAssisted.getPassword());
            }
            if (requestAssisted.getAvailableDays() != null) {
                assistedToUpdate.setAvailableDays(requestAssisted.getAvailableDays());
            }
            if (requestAssisted.getAboutYou() != null) {
                assistedToUpdate.setAboutYou(requestAssisted.getAboutYou());
            }
    
            return assistedRepository.save(assistedToUpdate);
        }).orElse(null);
    }    

    public boolean deleteAssisted(Long id) {
        if (assistedRepository.existsById(id)) {
            assistedRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
