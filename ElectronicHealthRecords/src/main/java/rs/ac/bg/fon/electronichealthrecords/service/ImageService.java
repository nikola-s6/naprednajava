package rs.ac.bg.fon.electronichealthrecords.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.bg.fon.electronichealthrecords.models.Image;
import rs.ac.bg.fon.electronichealthrecords.repository.ImageRepository;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Image> saveImages(List<MultipartFile> images) throws IOException, URISyntaxException {
        List<Image> imgs = new ArrayList<>();
        for (MultipartFile image:
             images) {
            String path = ResourceUtils.getFile("classpath:images/").getPath() + "\\" + image.getOriginalFilename();

            image.transferTo(new File(path));

            Image img = imageRepository.save(
                    new Image(image.getOriginalFilename(), image.getContentType(), path)
            );
            imgs.add(img);
        }
        return imgs;
    }

    public byte[] getImage(Long cid) throws IOException {
        try {
            Image image = imageRepository.findById(cid).orElseThrow(EntityNotFoundException::new);

            File file = ResourceUtils.getFile("classpath:images/" + image.getFileName());

            return Files.readAllBytes(file.toPath());
        } catch (Exception exception){
            throw exception;
        }
    }
}
