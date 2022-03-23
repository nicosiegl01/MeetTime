package org.meettime.Services;

import org.meettime.Model.Interest;
import org.meettime.Model.User;

import javax.enterprise.context.ApplicationScoped;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class InterestRepository {
    private final DataSource dataSource;

    public InterestRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Interest findById(String id) throws Exception {
        final String sql = "select Id, Name," +
                " from \"Meettime\".\"Meettime\".\"Interest\" " +
                "where id = " + id + ";";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Interest(
                            resultSet.getString("id"),
                            resultSet.getString("name")
                    );
                }
            }
        } catch (SQLException e) {
            throw new Exception(e);
        }
        return null;
    }

    public List<Interest> getAll() throws Exception {
        final String sql = "select id, name" +
                " from \"Meettime\".\"Meettime\".\"Interest\" ;";

        List<Interest> interests = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                while(resultSet.next()) {
                    interests.add(
                            new Interest(resultSet.getString("id"),
                                    resultSet.getString("namr"))
                    );
                }
            }
            return interests;
        } catch (SQLException e) {
            throw new Exception(e);
        }
    }
}
