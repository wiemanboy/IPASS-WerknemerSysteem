package webservices;

import model.Klus;
import model.Werknemer;
import webservices.requests.CreateWerknemerRequest;
import webservices.requests.DeleteWerknemerRequest;
import webservices.requests.UpdatePasswordRequest;
import webservices.requests.UpdateWerknemerRequest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
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
    @RolesAllowed("admin")
    @Path("/{naam}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getWerknemer(@PathParam("naam") String werknemerNaam){
        Werknemer werknemer = Werknemer.getWerknemerByNaam(werknemerNaam);

        if (werknemer != null) {return Response.status(200).entity(werknemer).build();}

        return Response.status(404).entity("Werknemer not found").build();
    }

    @GET
    @RolesAllowed({"user","admin"})
    @Path("/self")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSelf(@Context SecurityContext sc) {
        // get self
        if (sc.getUserPrincipal() instanceof Werknemer){
            Werknemer current = (Werknemer) sc.getUserPrincipal();
            return Response.ok(current).build();
        }
        return Response.status(404).build();
    }

    @POST
    @RolesAllowed("admin")
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
    @RolesAllowed("admin")
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
    @RolesAllowed({"user","admin"})
    @Path("/updatepassword")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateWerknemer(@Context SecurityContext sc, UpdatePasswordRequest request){
        // get self
        Werknemer current = null;
        if (sc.getUserPrincipal() instanceof Werknemer){
            current = (Werknemer) sc.getUserPrincipal();
        }

        if (current == null) {return Response.status(404).build();}
        current.generateNewPassword(request.password);

        return Response.status(200).build();
        }

    @DELETE
    @RolesAllowed("admin")
    @Path("/deletewerknemer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteWerknemer(DeleteWerknemerRequest request){
        Werknemer werknemer = Werknemer.getWerknemerByNaam(request.naam);

        if (werknemer == null) {return Response.status(404).entity("Werknemer not found").build();}

        Werknemer.removeWerknemer(werknemer);
        Klus.getKlusById(1).removeWerknemer(werknemer);

        return Response.status(200).entity(werknemer).build();
    }
}
