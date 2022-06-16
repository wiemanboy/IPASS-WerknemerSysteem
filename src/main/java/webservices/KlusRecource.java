package webservices;

import model.Klus;
import model.Werkbon;
import model.Werknemer;
import webservices.requests.AddMateriaalRequest;
import webservices.requests.AddWerknemerRequest;
import webservices.requests.CreateKlusRequest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.ArrayList;
import java.util.List;

@Path("/klussen")
public class KlusRecource {

    @GET
    @RolesAllowed({"user","admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getKlussen() {
        ArrayList<Klus> klussen = Klus.getAllKlussen();

        return Response.ok(klussen).build();
    }

    @GET
    @RolesAllowed({"user","admin"})
    @Path("/klus{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getKlus(@PathParam("id") int klusId) {
        Klus klus = Klus.getKlusById(klusId);

        if (klus != null) {return Response.status(200).entity(klus).build();}

        return Response.status(404).entity("Klus not found").build();
    }

    @POST
    @RolesAllowed({"user","admin"})
    @Path("/createklus")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createKlus(CreateKlusRequest request) {
        List<Klus> klussenCopy = new ArrayList<Klus>(Klus.getAllKlussen());
        Klus newKlus = new Klus(request.klant, request.adres, request.getBegindatum());

        if (klussenCopy.contains(newKlus)) {
            return Response.status(409).entity("Klus already exists").build();
        }

        return Response.status(201).entity(newKlus).build();
    }

    @POST
    @RolesAllowed("admin")
    @Path("/klus{id}/addwerknemer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addWerknemer(@PathParam("id") int klusID, AddWerknemerRequest request) {
        Werknemer werknemer = Werknemer.getWerknemerByNaam(request.naam);
        Klus klus = Klus.getKlusById(klusID);

        if (klus == null) {return Response.status(404).entity("Klus not found!").build();}
        if (werknemer == null) {return Response.status(404).entity("Werknemer not found!").build();}
        for (Werkbon wb : klus.getWerknemers()) {
            if (wb.getWerknemer().equals(werknemer)) {
                return Response.status(409).entity("Werknemer already added!").build();
            }
        }
        klus.addWerknemer(werknemer);

        return Response.status(200).entity(klus).build();
    }

    @POST
    @RolesAllowed("admin")
    @Path("/klus{id}/addself")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addSelf(@PathParam("id") int klusID, @Context SecurityContext sc) {
        // get self
        Werknemer werknemer = null;
        if (sc.getUserPrincipal() instanceof Werknemer){
            werknemer = (Werknemer) sc.getUserPrincipal();
        }

        Klus klus = Klus.getKlusById(klusID);

        if (klus == null) {return Response.status(404).entity("Klus not found!").build();}
        if (werknemer == null) {return Response.status(404).entity("Werknemer not found!").build();}
        for (Werkbon wb : klus.getWerknemers()) {
            if (wb.getWerknemer().equals(werknemer)) {
                return Response.status(409).entity("Werknemer already added!").build();
            }
        }

        klus.addWerknemer(werknemer);

        return Response.status(200).entity(klus).build();
    }

    @POST
    @RolesAllowed({"user","admin"})
    @Path("/klus{id}/addmateriaal")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addMateriaal(@PathParam("id") int klusID, AddMateriaalRequest request) {
        String materiaal = request.materiaal;
        Klus klus = Klus.getKlusById(klusID);

        if (klus == null) {return Response.status(404).entity("Klus not found!").build();}
        if (klus.getMaterialen().contains(materiaal)) {return Response.status(409).entity("Materiaal already added!").build();}

        klus.addMateriaal(materiaal);

        return Response.status(200).entity(klus).build();
    }
}
