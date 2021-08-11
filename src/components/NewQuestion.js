import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleSaveQuestion } from "../actions/questions";
import './NewQuestion.css';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { optionOne, optionTwo } = this.state;
        const { dispatch, authedUser } = this.props;
        dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser));
    }

    handleChange = (e, option) => {
        this.setState((state) => ({ ...state, [option]: e.target.value }));
    }

    render() {
        const { optionOne, optionTwo } = this.state;
        const { nextUrl } = this.props;

        if (nextUrl) {
            return (<Redirect to={nextUrl}/>);
        }

        return (
            <>
                <h2>Add a question</h2>
                <p>Would you rather....</p>
                <form className="add-question-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={optionOne} onChange={(e) => this.handleChange(e, 'optionOne')} />
                    <input type="text" value={optionTwo} onChange={(e) => this.handleChange(e, 'optionTwo')} />
                    <button type="submit">Add Question</button>
                </form>
            </>
        )
    }
}

function mapStateToProps({ authedUser, routing: { nextUrl } }) {
    return {
        authedUser,
        nextUrl
    }
}

export default connect(mapStateToProps)(NewQuestion)