package persistance;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobContainerClientBuilder;
import model.Bedrijf;
import model.Werknemer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.io.*;

@WebListener
public class PersistanceManager implements ServletContextListener {
    private final static String ENDPOINT = "https://jarnoblobstorage.blob.core.windows.net/ipasscontainer";
    private final static String SASTOKEN = "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-06-06T17:24:09Z&st=2022-06-06T09:24:09Z&spr=https&sig=gII49IaNhYeJLJAlRc264vYEnTYlGRA%2Bjcas5TIDMaE%3D";
    private final static String CONTAINER = "ipasscontainer";

    private static BlobContainerClient blobContainer = new BlobContainerClientBuilder().sasToken(SASTOKEN).containerName(CONTAINER).endpoint(ENDPOINT).buildClient();

    //@Override
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

                    Bedrijf loadedBedrijf = (Bedrijf) ois.readObject();
                    Bedrijf.setBedrijf(loadedBedrijf);

                    System.out.println(loadedBedrijf.getAllWerknemers());

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
            Bedrijf saveBedrijf = Bedrijf.getBedrijf();

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
