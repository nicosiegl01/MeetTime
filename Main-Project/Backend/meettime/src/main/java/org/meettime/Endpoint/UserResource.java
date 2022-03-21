package org.meettime.Endpoint;

import org.meettime.Model.User;
import org.meettime.Services.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped
@Path("/user")
public class UserResource {

    @Inject
    UserRepository repo;

    public UserResource(UserRepository repo) {
        this.repo = repo;
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

    @GET
    @Path("/getMatchingUsers/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getMatchingUsers(@PathParam("id") String id) throws Exception {
        return repo.getMatchingUsers(id);
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Integer deleteUser(@PathParam("id") String id) throws Exception {
        repo.deleteUser(id);
        return 1;
    }

    @POST
    @Path("/{fname}/{lname}/{email}/{password}/{age}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Object addUser(@PathParam("fname") String fname,
                            @PathParam("lname") String lname,
                            @PathParam("email") String email,
                            @PathParam("password") String password,
                            @PathParam("age") String age) throws Exception {
        User user = new User(fname,lname,email,password,Integer.parseInt(age));
        if (repo.addUser(user) == 1) {
            return user;
        } else {
            return Response.Status.INTERNAL_SERVER_ERROR;
        }
    }

    @PUT
    @Path("/{fname}/{lname}/{email}/{password}/{age}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Object updateUser(@PathParam("fname") String fname,
                             @PathParam("lname") String lname,
                             @PathParam("email") String email,
                             @PathParam("password") String password,
                             @PathParam("age") String age) throws Exception {
        User user = new User(fname,lname,email,password,Integer.parseInt(age));
        if (repo.updateUser(user) == 1) {
            return user;
        } else {
            return Response.Status.INTERNAL_SERVER_ERROR;
        }
    }
}
