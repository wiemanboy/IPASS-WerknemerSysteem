package webservices;

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
        ArrayList<Klus> klussen = Klus.getAllKlussen();
        return Response.ok(klussen).build();
    }

}
