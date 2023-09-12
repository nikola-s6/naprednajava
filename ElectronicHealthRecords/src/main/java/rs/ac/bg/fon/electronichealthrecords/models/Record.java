package rs.ac.bg.fon.electronichealthrecords.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long id;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.DETACH
    )
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.DETACH
    )
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.DETACH
    )
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    private String diagnosis;
    private String treatment;
    private String medication;
    private Date date;

    private String mediaDescription;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "record_id")
    private List<Image> media;

    public Record() {
        this.media = new ArrayList<>();
    }

    public Record(Patient patient, Doctor doctor, Hospital hospital, String diagnosis, String treatment, String medication, Date date, String mediaDescription) {
        this.patient = patient;
        this.doctor = doctor;
        this.hospital = hospital;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.medication = medication;
        this.date = date;
        this.mediaDescription = mediaDescription;
        this.media = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMediaDescription() {
        return mediaDescription;
    }

    public void setMediaDescription(String mediaDescription) {
        this.mediaDescription = mediaDescription;
    }

    public List<Image> getMedia() {
        return media;
    }

    public void setMedia(List<Image> media) {
        this.media = media;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Record record = (Record) o;
        return Objects.equals(id, record.id) && Objects.equals(patient, record.patient) && Objects.equals(doctor, record.doctor) && Objects.equals(hospital, record.hospital) && Objects.equals(diagnosis, record.diagnosis) && Objects.equals(treatment, record.treatment) && Objects.equals(medication, record.medication) && Objects.equals(date, record.date) && Objects.equals(mediaDescription, record.mediaDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, patient, doctor, hospital, diagnosis, treatment, medication, date, mediaDescription);
    }

    @Override
    public String toString() {
        return "Record{" +
                "id=" + id +
                ", patient=" + patient +
                ", doctor=" + doctor +
                ", hospital=" + hospital +
                ", diagnosis='" + diagnosis + '\'' +
                ", treatment='" + treatment + '\'' +
                ", medication='" + medication + '\'' +
                ", date=" + date +
                ", mediaDescription='" + mediaDescription + '\'' +
                ", media=" + media +
                '}';
    }
}
