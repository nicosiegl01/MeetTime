package org.meettime.Services;

import io.agroal.api.AgroalDataSource;
import org.meettime.Model.User;

import javax.enterprise.context.ApplicationScoped;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class UserRepository {

    private final DataSource dataSource;

    public UserRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public User findById(String id) throws Exception {
        final String sql = "select id, fname, lname, email, password" +
                " from \"Meettime\".\"Meettime\".\"User\" " +
                "where id = 1";

        try (Connection connection = dataSource.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                   return new User(
                           resultSet.getString("id"),
                           resultSet.getString("fname"),
                           resultSet.getString("lname"),
                           resultSet.getString("email"),
                           resultSet.getString("password")
                   );
                }
            }
        } catch (SQLException e) {
            throw new Exception(e);
        }
        return null;
    }

    public User findByEmail(String mail) throws Exception {
        final String sql = "select id, fname, lname, email, password" +
                " from \"Meettime\".\"Meettime\".\"User\" " +
                "where mail = " + mail + ";";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new User(
                            resultSet.getString("id"),
                            resultSet.getString("fname"),
                            resultSet.getString("lname"),
                            resultSet.getString("email"),
                            resultSet.getString("password")
                    );
                }
            }
        } catch (SQLException e) {
            throw new Exception(e);
        }
        return null;
    }

    public List<User> getAll() throws Exception {
        final String sql = "select id, fname, lname, email, password" +
                " from \"Meettime\".\"Meettime\".\"User\" ;";

        List<User> users = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                while(resultSet.next()) {
                     users.add(new User(
                            resultSet.getString("id"),
                            resultSet.getString("fname"),
                            resultSet.getString("lname"),
                            resultSet.getString("email"),
                            resultSet.getString("password")
                    ));
                }
            }
            return users;
        } catch (SQLException e) {
            throw new Exception(e);
        }
    }

    public boolean addUser(User user) throws Exception {
        if (findByEmail(user.getEmail()) != null) {
            return false;
        }

        final String sql = "insert into \"Meettime\".\"Meettime\".\"User\" (fname, lname, email, password) " +
                "values('" + user.getFname() +"'," +
                " '" + user.getLname() + "'," +
                " '" + user.getEmail() + "'," +
                " '" + user.getPassword() + "')";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
                 statement.executeQuery();
                 return true;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public boolean login(String email, String password) throws Exception {
        User user = findByEmail(email);
        if (user == null) return false;

        if (password.equals(user.getPassword())) {
            return true;
        }

        return false;
    }
}
