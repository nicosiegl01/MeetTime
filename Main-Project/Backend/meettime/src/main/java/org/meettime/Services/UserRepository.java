package org.meettime.Services;

import org.meettime.Model.Interest;
import org.meettime.Model.User;

import javax.enterprise.context.ApplicationScoped;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UserRepository {

    private final DataSource dataSource;

    public UserRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public User findById(String id) throws Exception {
        final String sql = "select id, fname, lname, email, password, age" +
                " from \"Meettime\".\"Meettime\".\"User\" " +
                "where id = " + id + ";";

        try (Connection connection = dataSource.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                   return new User(
                           resultSet.getString("id"),
                           resultSet.getString("fname"),
                           resultSet.getString("lname"),
                           resultSet.getString("email"),
                           resultSet.getString("password"),
                           Integer.parseInt(resultSet.getString("age"))
                   );
                }
            }
        } catch (SQLException e) {
            throw new Exception(e);
        }
        return null;
    }

    public Integer deleteUser(String id) throws Exception {
        final String sql = "delete from \"Meettime\".\"Meettime\".\"User\"" +
                "where id = " + id + ";";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             return statement.executeUpdate();
        } catch (SQLException e) {
            throw new Exception(e);
        }
    }

    public User findByEmail(String mail) throws Exception {
        final String sql = "select id, fname, lname, email, password, age" +
                " from \"Meettime\".\"Meettime\".\"User\" " +
                "where email = '" + mail + "';";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new User(
                            resultSet.getString("id"),
                            resultSet.getString("fname"),
                            resultSet.getString("lname"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            Integer.parseInt(resultSet.getString("age"))
                    );
                }
            }
        } catch (SQLException e) {
            throw new Exception(e);
        }
        return null;
    }

    public List<User> getAll() throws Exception {
        final String sql = "select id, fname, lname, email, password, age" +
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
                            resultSet.getString("password"),
                             Integer.parseInt(resultSet.getString("age"))
                    ));
                }
            }
            return users;
        } catch (SQLException e) {
            throw new Exception(e);
        }
    }

    public Integer addUser(User user) throws Exception {
        if (findByEmail(user.getEmail()) != null) {
            return -1;
        }

        final String sql = "insert into \"Meettime\".\"Meettime\".\"User\" (fname, lname, email, password, age) " +
                "values('" + user.getFname() +"'," +
                " '" + user.getLname() + "'," +
                " '" + user.getEmail() + "'," +
                " '" + user.getPassword() + "'," +
                " " + user.getAge() + ")";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             return statement.executeUpdate();
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

    public List<String> getUserInterests(String id) throws Exception {
        final String sql = "select ui.\"InterestId\" from \"Meettime\".\"Meettime\".\"User_Interest\" ui where ui.\"UserId\" = " + id + ";";

        List<String> interestId = new ArrayList<>();

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            try (ResultSet resultSet = statement.executeQuery()) {
                while(resultSet.next()) {
                    interestId.add(resultSet.getString("InterestId"));
                }
            }
            return interestId;
        } catch (SQLException e) {
            throw new Exception(e);
        }
    }

    public List<User> getMatchingUsers(String id) throws Exception {
        List<String> interestId = getUserInterests(id);
        List<User> matchingUsers = new ArrayList<>();

        for (String currentId: interestId) {
            String sql = "select u.id, u.fname, u.lname, u.email, u.password, u.age from \"Meettime\".\"Meettime\".\"User_Interest\" u_i, \"Meettime\".\"Meettime\".\"User\" u where u_i.\"InterestId\" = " + currentId + " and u.id = u_i.\"UserId\" and u_i.\"UserId\" != " + id + ";";
            try (Connection connection = dataSource.getConnection();
                 PreparedStatement statement = connection.prepareStatement(sql)) {
                try (ResultSet resultSet = statement.executeQuery()) {
                    while(resultSet.next()) {
                        matchingUsers.add(new User(
                                resultSet.getString("id"),
                                resultSet.getString("fname"),
                                resultSet.getString("lname"),
                                resultSet.getString("email"),
                                resultSet.getString("password"),
                                Integer.parseInt(resultSet.getString("age"))
                        ));
                    }
                }
            } catch (SQLException e) {
                throw new Exception(e);
            }
        }

        for (User user: matchingUsers) {
            if (user.getId().equals(id)) {
                matchingUsers.remove(user);
            }
        }
        return matchingUsers;
    }
}
