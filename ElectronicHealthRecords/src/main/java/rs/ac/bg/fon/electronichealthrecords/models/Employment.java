package rs.ac.bg.fon.electronichealthrecords.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
public class Employment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    private Date since;

    public Employment() {
    }

    public Employment(Doctor doctor, Hospital hospital, Date since) {
        this.doctor = doctor;
        this.hospital = hospital;
        this.since = since;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

    public Date getSince() {
        return since;
    }

    public void setSince(Date since) {
        this.since = since;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employment that = (Employment) o;
        return Objects.equals(id, that.id) && Objects.equals(doctor, that.doctor) && Objects.equals(hospital, that.hospital) && Objects.equals(since, that.since);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, doctor, hospital, since);
    }
}
