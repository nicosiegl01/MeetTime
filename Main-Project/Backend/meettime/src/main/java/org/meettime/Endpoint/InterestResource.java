package org.meettime.Endpoint;

import org.meettime.Model.Interest;
import org.meettime.Model.User;
import org.meettime.Services.InterestRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
}
