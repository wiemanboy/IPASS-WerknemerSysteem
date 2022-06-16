package webservices;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import model.Werknemer;
import webservices.requests.LoginRequest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.security.Key;
import java.util.AbstractMap;
import java.util.Calendar;

@Path("/authenticate")
public class AuthenticationRecource {
    final static public Key key = MacProvider.generateKey();

    private String createToken(String username, String role) throws JwtException {
        Calendar expiration = Calendar.getInstance();
        expiration.add(Calendar.MINUTE,30);

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(expiration.getTime())
                .claim("role", role)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateUser(LoginRequest loginRequest){
        try {
            Werknemer user = Werknemer.getWerknemerByNaam(loginRequest.name);

            if (user == null) {return Response.status(Response.Status.UNAUTHORIZED).build();}
            if (user.checkPassword(loginRequest.password) == false) {return Response.status(Response.Status.UNAUTHORIZED).build();}

            String role = user.getRole();

            if (role == null) throw new IllegalArgumentException("User not found");

            String token = createToken(loginRequest.name, role);

            return Response.ok(new AbstractMap.SimpleEntry<>("JWT", token)).build();
        }
        catch (Exception e){
            System.out.println(e);
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}
