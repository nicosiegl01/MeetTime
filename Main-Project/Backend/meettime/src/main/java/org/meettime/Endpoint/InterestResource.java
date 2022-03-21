package org.meettime.Endpoint;

import org.meettime.Model.Interest;
import org.meettime.Model.User;
import org.meettime.Services.InterestRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped
@Path("/interest")
public class InterestResource {

    @Inject
    InterestRepository repo;

    public InterestResource(InterestRepository repo) {
        this.repo = repo;
    }

    @GET
    @Path("/getAllInterests")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Interest> getUserById() throws Exception {
        return repo.getAll();
    }

    @GET
    @Path("/findbyId/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Interest getUserById(@PathParam("id") String id) throws Exception {
        return repo.findById(id);
    }

    @POST
    @Path("/add/{userid}/{interestid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Integer addUserInterest(@PathParam("userid") String userid, @PathParam("interestid") String interestid) throws Exception {
        return repo.addUserInterest(userid, interestid);
    }

    @DELETE
    @Path("/delete/{userid}/{interestid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Integer deleteUserInterest(@PathParam("userid") String userid, @PathParam("interestid") String interestid) throws Exception {
        return repo.deleteUserInterest(userid, interestid);
    }
}
