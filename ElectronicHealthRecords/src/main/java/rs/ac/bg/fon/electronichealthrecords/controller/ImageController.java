package rs.ac.bg.fon.electronichealthrecords.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rs.ac.bg.fon.electronichealthrecords.service.ImageService;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/image")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/{cid}")
    public ResponseEntity<?> getImage(@PathVariable Long cid){
        try {
            byte[] img = imageService.getImage(cid);
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.valueOf("image/png"))
                    .body(img);
        }catch (EntityNotFoundException e){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Image not found", e);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't load the image", e);
        }
    }
}
