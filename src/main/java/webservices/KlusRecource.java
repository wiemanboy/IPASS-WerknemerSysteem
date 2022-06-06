package webservices;

import model.Bedrijf;
import model.Klus;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.ArrayList;

@Path("/klussen")
public class KlusRecource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getKlussen() {
        Klus k1 = new Klus("klant","adres", LocalDate.now());
        ArrayList<Klus> klussen = Bedrijf.getBedrijf().getAllKlussen();
        return Response.ok(klussen).build();
    }

}
