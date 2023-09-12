package rs.ac.bg.fon.electronichealthrecords.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.electronichealthrecords.models.Record;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findAllByPatientJmbg(Long jmbg);
}
