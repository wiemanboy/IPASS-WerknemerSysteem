package persistance;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import model.Klus;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.io.*;
import java.util.ArrayList;

@WebListener
public class PersistanceManager implements ServletContextListener {
    private final static String ENDPOINT = "https://jarnoblobstorage.blob.core.windows.net/ipasscontainer";
    private final static String SASTOKEN = "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-08-07T19:35:55Z&st=2022-06-07T11:35:55Z&spr=https&sig=C74gelY0NXNwp6emqHrpO3khlBcH%2BNCN%2FDcA9yCfe9Y%3D";
    private final static String CONTAINER = "ipasscontainer";

    private static BlobContainerClient blobContainer = new BlobContainerClientBuilder().endpoint(ENDPOINT).sasToken(SASTOKEN).containerName(CONTAINER).buildClient();

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("Starting up!");
        if (blobContainer.exists()){
            BlobClient blob = blobContainer.getBlobClient("ipasscontainer");
            if (blob.exists()){
                try {
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    blob.download(baos);

                    ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());

                    ObjectInputStream ois = new ObjectInputStream(bais);

                    ArrayList<Klus> loadedBedrijf = (ArrayList<Klus>) ois.readObject();
                    Klus.setAllKlussen(loadedBedrijf);

                    System.out.println(loadedBedrijf);
                    System.out.println(Klus.getAllKlussen());

                    baos.close();
                    bais.close();
                    ois.close();

                } catch (IOException | ClassNotFoundException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("Shutting down!");
        if (!blobContainer.exists()){
            blobContainer.create();
        }
        try {

            BlobClient blob = blobContainer.getBlobClient("ipasscontainer");
            ArrayList<Klus> saveBedrijf = Klus.getAllKlussen();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(saveBedrijf);

            byte[] bytes = baos.toByteArray();

            ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
            blob.upload(bais, bytes.length, true);

            baos.close();
            oos.close();
            bais.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
