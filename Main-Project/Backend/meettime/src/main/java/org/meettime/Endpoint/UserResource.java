package org.meettime.Endpoint;

import org.meettime.Model.User;
import org.meettime.Services.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
@Path("/user")
public class UserResource {

    @Inject
    private UserRepository repo;

    public UserResource(UserRepository repo) {
        this.repo = repo;
    }

    @GET
    @Path("/hello")
    public String hello() throws Exception {
        return "hello";
    }

    @GET
    @Path("/findbyId/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User getUserById(@PathParam("id") String id) throws Exception {
        return repo.findById(id);
    }

    @GET
    @Path("/findbyMail/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public User getUserByEmail(@PathParam("mail") String mail) throws Exception {
        return repo.findByEmail(mail);
    }

    @GET
    @Path("/getAllUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getUserById() throws Exception {
        return repo.getAll();
    }

    @GET
    @Path("/{email}/{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean login(@PathParam("email") String email, @PathParam("password") String password) throws Exception {
        return repo.login(email, password);
    }


    @POST
    @Path("/{fname}/{lname}/{email}/{password}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(@PathParam("fname") String fname,
                            @PathParam("lname") String lname,
                            @PathParam("email") String email,
                            @PathParam("password") String password) throws Exception {
        repo.addUser(new User(fname,lname,email,password));
        return Response.ok().build();
    }
}
