package com.group9.ponte_de_geracoes.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.group9.ponte_de_geracoes.model.Helper;
import com.group9.ponte_de_geracoes.repository.HelperRepository;

@Service
public class HelperService {

    @Autowired
    private HelperRepository helperRepository;

    public Page<Helper> getHelpers(Pageable pageable) {
        return helperRepository.findAll(pageable);
    }

    public Helper insertNewHelper(Helper helper) {
        helper.setId(null);
        return helperRepository.save(helper);
    }

    public Helper updateHelper(Long id, Helper requestHelper) {
        return helperRepository.findById(id).map(helperToUpdate -> {
            if (requestHelper.getName() != null) {
                helperToUpdate.setName(requestHelper.getName());
            }
            if (requestHelper.getBirthDate() != null) {
                helperToUpdate.setBirthDate(requestHelper.getBirthDate());
            }
            if (requestHelper.getEmail() != null) {
                helperToUpdate.setEmail(requestHelper.getEmail());
            }
            if (requestHelper.getPhone() != null) {
                helperToUpdate.setPhone(requestHelper.getPhone());
            }
            if (requestHelper.getAddress() != null) {
                helperToUpdate.setAddress(requestHelper.getAddress());
            }
            if (requestHelper.getSkills() != null) {
                helperToUpdate.setSkills(requestHelper.getSkills());
            }
            return helperRepository.save(helperToUpdate);
        }).orElse(null);
    }

    public boolean deleteHelper(Long id) {
        if (helperRepository.existsById(id)) {
            helperRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
