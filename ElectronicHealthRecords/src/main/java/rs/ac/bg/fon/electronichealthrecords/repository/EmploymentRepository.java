package rs.ac.bg.fon.electronichealthrecords.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.electronichealthrecords.models.Employment;

import java.util.List;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Long> {
    List<Employment> findAllByDoctorId(Long id);
}
