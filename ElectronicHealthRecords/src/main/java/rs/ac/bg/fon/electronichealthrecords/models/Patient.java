package rs.ac.bg.fon.electronichealthrecords.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class Patient implements UserDetails {

    @Id
    private Long jmbg; // unique citizens identity number
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private Gender gender;
    private String phoneNumber;
    private String residentialAddress;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "patient_role_junction",
            joinColumns = {@JoinColumn(name = "patient_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> authorities;

    @JsonIgnore
    @OneToMany(
            mappedBy = "patient",
            cascade = CascadeType.PERSIST
    )
    private Set<Record> records;

    public Patient() {
        this.records = new HashSet<>();
        this.authorities = new HashSet<>();
    }

    public Patient(String firstName, String lastName, String email, Gender gender, String phoneNumber, String residentialAddress, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.residentialAddress = residentialAddress;
        this.password = password;
        this.records = new HashSet<>();
        this.authorities = new HashSet<>();
    }

    public Patient(String firstName, String lastName, String email, Gender gender, String phoneNumber, String residentialAddress, String password, Set<Record> records, Set<Role> authorities) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.residentialAddress = residentialAddress;
        this.password = password;
        this.records = records;
        this.authorities = authorities;
    }

    public Long getJmbg() {
        return jmbg;
    }

    public void setJmbg(Long jmbg) {
        this.jmbg = jmbg;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getResidentialAddress() {
        return residentialAddress;
    }

    public void setResidentialAddress(String residentialAddress) {
        this.residentialAddress = residentialAddress;
    }

    public Set<Record> getRecords() {
        return records;
    }

    public void setRecords(Set<Record> records) {
        this.records = records;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAuthorities(Set<Role> authorities) {
        this.authorities = authorities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return Objects.equals(jmbg, patient.jmbg) && Objects.equals(firstName, patient.firstName) && Objects.equals(lastName, patient.lastName) && Objects.equals(email, patient.email) && gender == patient.gender && Objects.equals(phoneNumber, patient.phoneNumber) && Objects.equals(residentialAddress, patient.residentialAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jmbg, firstName, lastName, email, gender, phoneNumber, residentialAddress);
    }

    @Override
    public String toString() {
        return "Patient{" +
                "jmbg=" + jmbg +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", residentialAddress='" + residentialAddress +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.jmbg.toString();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
