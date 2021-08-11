import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/authedUser";

function Nav(props) {
  const { dispatch, user } = props;
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/question/add" activeClassName="active">
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            Leaderboard
          </NavLink>
        </li>
        <li>
          Hello {user.name}! <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

function mapStateToProps({ users, authedUser }) {
  return {
    user: users[authedUser],
  };
}
export default connect(mapStateToProps)(Nav);
