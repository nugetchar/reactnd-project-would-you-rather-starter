import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions/authedUser";

class Login extends Component {

    state = {
        id: null
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        const {id} = this.state;
        dispatch(login(id));
    }
    
    handleChange = (e) => {
        this.setState({id: e.target.value});
    }

    render() {
        const {users} = this.props;
        const {id} = this.state;
        return (
            <>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <select defaultValue="chose" onChange={this.handleChange}>
                    <option disabled value="chose">Choose a user</option>
                        {
                            users.map(({id, name}) => (<option key={id} value={id}>{name}</option>))
                        }
                    </select>
                    <button disabled={id === null}>Log In</button>
                </form>
            </>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.values(users).map(({id, name}) => ({id, name}))
    }
}

export default connect(mapStateToProps)(Login);