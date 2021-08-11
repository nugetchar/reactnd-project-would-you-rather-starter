import { Component } from "react";
import { connect } from "react-redux";
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
        const { dispatch, authedUser, history } = this.props;
        dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser));
        history.push('/');
    }

    handleChange = (e, option) => {
        this.setState((state) => ({ ...state, [option]: e.target.value }));
    }

    render() {
        const { optionOne, optionTwo } = this.state;
        return (
            <>
                <h2>Add a question</h2>
                <p>Would you rather....</p>
                <form className="add-question-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={optionOne} onChange={(e) => this.handleChange(e, 'optionOne')} />
                    <input type="text" value={optionTwo} onChange={(e) => this.handleChange(e, 'optionTwo')} />
                    <button type="submit" disabled={!optionOne || !optionTwo}>Add Question</button>
                </form>
            </>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion)