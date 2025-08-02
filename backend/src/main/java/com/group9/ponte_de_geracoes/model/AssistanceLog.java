package com.group9.ponte_de_geracoes.model;

import java.time.LocalDate;

import com.group9.ponte_de_geracoes.model.enums.ProgressStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AssistanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate meetingDate;

    @Enumerated(EnumType.STRING)
    private ProgressStatus status;

    @ManyToOne
    @JoinColumn(name = "helper_id", nullable = false)
    private Helper helper;

    @ManyToOne
    @JoinColumn(name = "assisted_id", nullable = false)
    private Assisted assisted;

    public AssistanceLog(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(LocalDate meetingDate) {
        this.meetingDate = meetingDate;
    }

    public ProgressStatus getStatus() {
        return status;
    }

    public void setStatus(ProgressStatus status) {
        this.status = status;
    }

    public Helper getHelper() {
        return helper;
    }

    public void setHelper(Helper helper) {
        this.helper = helper;
    }

    public Assisted getAssisted() {
        return assisted;
    }

    public void setAssisted(Assisted assisted) {
        this.assisted = assisted;
    }
}
