package org.meettime.Services;

import org.meettime.Model.User;

import javax.enterprise.context.ApplicationScoped;
import javax.sql.DataSource;
import javax.ws.rs.core.Response;
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

    /*public Response updateUser(String email, String fname, String lname, String password, String currentPassword) throws Exception {
        User user = findByEmail(email);
        System.out.println(user);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.status(Response.Status.OK).build();

        if(fname!=null){
            user.setFname(fname);
        }
        if(lname!=null){
            user.setFname(fname);
        }
        if(password!=null){
            if (currentPassword.equals(user.getPassword())) {
                user.setPassword(password);
            }
        }

        //return Response.ok().build();
    }*/
}
