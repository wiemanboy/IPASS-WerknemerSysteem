package webservices;

import model.Klus;
import model.Werknemer;
import webservices.requests.CreateWerknemerRequest;
import webservices.requests.DeleteWerknemerRequest;
import webservices.requests.UpdatePasswordRequest;
import webservices.requests.UpdateWerknemerRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/werknemers")
public class WerknemerRecource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getWerknemers(){
        return Response.ok(Werknemer.getAllWerknemers()).build();
    }

    @GET
    @Path("/{naam}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getWerknemer(@PathParam("naam") String werknemerNaam){
        Werknemer werknemer = Werknemer.getWerknemerByNaam(werknemerNaam);
        if (werknemer != null) {return Response.status(200).entity(werknemer).build();}
        return Response.status(404).entity("Werknemer not found").build();
    }

    @POST
    @Path("/createwerknemer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createWerknemer(CreateWerknemerRequest request) {
        List<Werknemer> werknemersCopy = new ArrayList<Werknemer>(Werknemer.getAllWerknemers());
        Werknemer newWerknemer = new Werknemer(request.naam, request.uurloon, request.role);
        if (werknemersCopy.contains(newWerknemer)) {
            return Response.status(409).entity("Werknemer already exists").build();
        }
        return Response.status(201).entity(newWerknemer).build();
    }

    @PUT
    @Path("/updatewerknemer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateWerknemer(UpdateWerknemerRequest request){
        Werknemer werknemer = Werknemer.getWerknemerByNaam(request.naam);
        if (werknemer == null) {return Response.status(404).entity("Werknemer not found").build();}
        werknemer.changeUurloon(request.uurloon);
        werknemer.changeRole(request.role);
        return Response.status(200).entity(werknemer).build();
    }

    @PUT
    @Path("/updatepassword")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateWerknemer(UpdatePasswordRequest request){
        //if (request.password != null) {werknemer.generateNewPassword(request.password);System.out.println("update password");}
        return Response.status(200).build();
        }

    @DELETE
    @Path("/deletewerknemer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteWerknemer(DeleteWerknemerRequest request){
        Werknemer werknemer = Werknemer.getWerknemerByNaam(request.naam);
        if (werknemer == null) {return Response.status(404).entity("Werknemer not found").build();}
        Werknemer.removeWerknemer(werknemer);
        return Response.status(200).entity(werknemer).build();
    }
}
