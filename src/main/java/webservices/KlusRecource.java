package webservices;

import model.Klus;

import javax.ws.rs.*;
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
        ArrayList<Klus> klussenCopy = new ArrayList<>();
        for (Klus k : klussen){
            if (k.getId() != 1) {
                klussenCopy.add(k);
            }
        }
        return Response.ok(klussen).build();
    }

    @GET
    @Path("/klus")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getKlus() {
        return Response.ok().build();
    }

    @POST
    @Path("/addklus")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addKlus(){
        return Response.ok().build();
    }

    @PUT
    @Path("/klus/adduren")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addUren(){
        return Response.ok().build();
    }
}
