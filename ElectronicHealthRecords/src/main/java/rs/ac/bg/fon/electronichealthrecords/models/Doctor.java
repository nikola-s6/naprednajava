package rs.ac.bg.fon.electronichealthrecords.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class Doctor implements UserDetails {

    @Id
    @Column(name = "doctor_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private DoctorSpecialization specialization;
    private Gender gender;
    @Column(unique = true)
    private String email;
    private String password;
    private String phoneNumber;
    private String residentialAddress;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "doctor_role_junction",
            joinColumns = {@JoinColumn(name = "doctor_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> authorities;

    @JsonIgnore
    @OneToMany(mappedBy = "doctor")
    private Set<Employment> worksAt;

    public Doctor() {
        this.worksAt = new HashSet<>();
    }

    public Doctor(String firstName, String lastName, DoctorSpecialization specialization, Gender gender, String email, String password, String phoneNumber, String residentialAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.residentialAddress = residentialAddress;
        this.worksAt = new HashSet<>();
        this.authorities = new HashSet<>();
    }

    public Doctor(String firstName, String lastName, DoctorSpecialization specialization, Gender gender, String email, String password, String phoneNumber, String residentialAddress, Set<Employment> worksAt, Set<Role> authorities) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.residentialAddress = residentialAddress;
        this.worksAt = worksAt;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public DoctorSpecialization getSpecialization() {
        return specialization;
    }

    public void setSpecialization(DoctorSpecialization specialization) {
        this.specialization = specialization;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Set<Employment> getWorksAt() {
        return worksAt;
    }

    public void setWorksAt(Set<Employment> worksAt) {
        this.worksAt = worksAt;
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
        Doctor doctor = (Doctor) o;
        return Objects.equals(id, doctor.id) && Objects.equals(firstName, doctor.firstName) && Objects.equals(lastName, doctor.lastName) && specialization == doctor.specialization && gender == doctor.gender && Objects.equals(email, doctor.email) && Objects.equals(phoneNumber, doctor.phoneNumber) && Objects.equals(residentialAddress, doctor.residentialAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, specialization, gender, email, phoneNumber, residentialAddress);
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", specialization=" + specialization +
                ", gender=" + gender +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", residentialAddress='" + residentialAddress + '\'' +
                ", worksAt=" + worksAt +
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
        return this.email;
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
