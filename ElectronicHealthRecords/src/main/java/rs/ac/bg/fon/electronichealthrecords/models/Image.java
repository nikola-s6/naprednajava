package rs.ac.bg.fon.electronichealthrecords.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid; // content indentifier
    private String fileName;
    private String contentType;
    private String path;

    public Image() {
    }

    public Image(String fileName, String contentType, String path) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.path = path;
    }

    public Long getCid() {
        return cid;
    }

    public void setCid(Long cid) {
        this.cid = cid;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return Objects.equals(cid, image.cid) && Objects.equals(fileName, image.fileName) && Objects.equals(contentType, image.contentType) && Objects.equals(path, image.path);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cid, fileName, contentType, path);
    }

    @Override
    public String toString() {
        return "Image{" +
                "cid=" + cid +
                ", fileName='" + fileName + '\'' +
                ", contentType='" + contentType + '\'' +
                ", path='" + path + '\'' +
                '}';
    }
}
