package rs.ac.bg.fon.electronichealthrecords.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hospital_id")
    private Long id;
    private String name;
    private String address;

    @JsonIgnore
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.MERGE)
    private Set<Employment> doctors;

    public Hospital() {
        this.doctors = new HashSet<>();
    }

    public Hospital(String name, String address, Set<Employment> doctors) {
        this.name = name;
        this.address = address;
        this.doctors = doctors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Employment> getDoctors() {
        return doctors;
    }

    public void setDoctors(Set<Employment> doctors) {
        this.doctors = doctors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hospital hospital = (Hospital) o;
        return Objects.equals(id, hospital.id) && Objects.equals(name, hospital.name) && Objects.equals(address, hospital.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address);
    }

    @Override
    public String toString() {
        return "Hospital{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", doctors=" + doctors +
                '}';
    }
}
