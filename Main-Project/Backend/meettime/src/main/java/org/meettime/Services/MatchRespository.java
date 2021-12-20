package org.meettime.Services;

import io.vertx.mutiny.ext.auth.User;
import org.meettime.Model.Matche;

import javax.enterprise.context.ApplicationScoped;
import javax.sql.DataSource;
import java.util.List;

@ApplicationScoped
public class MatchRespository {
    private final DataSource dataSource;

    public MatchRespository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private List<Matche> getMatchesFromUser(Integer userId) {
        return null;
    }

    public List<User> getMatchingPeople(User user) {
        return null;
    }

    private List<User> matchingPeople() {
        return null;
    }
}
