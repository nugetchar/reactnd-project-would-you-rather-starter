import { Component } from "react";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { handleVote } from "../actions/questions";
import { hasVoted, percentage } from "../utils/polls.utils";

import './QuestionDetails.css';

class QuestionDetails extends Component {
    state = {
        choice: null
    }

    handleSubmit = (e) => {
        const { question: { id }, authedUser, dispatch } = this.props;
        e.preventDefault();
        dispatch(handleVote(authedUser, id, this.state.choice));
    }

    handleChange = (e) => {
        this.setState({ choice: e.target.value });
    }

    render() {
        const { question, authedUser } = this.props;
        if (!question) {
            return (<p>This poll does not exist.</p>)
        }
        
        const { author, optionOne, optionTwo, answered } = question;
        return (
            <section className="question-container">
                <h3 className="question-title">{author.name} {authedUser === author.id && ('(you)')} asks:</h3>
                <div className="question">
                    <figure>
                        <img className="avatar" src={`../../${author.avatarURL}`} alt={`Avatar of ${author.name}`} />
                    </figure>
                    <div className="question-content">
                        <h4>Would you rather</h4>
                        {
                            !answered && (<form className="question-form" onSubmit={this.handleSubmit}>
                                <div>
                                    <input type="radio" id="optionOne" name="choice" value="optionOne" onChange={this.handleChange} />
                                    <label htmlFor="optionOne">{optionOne.text}</label>
                                </div>
                                <div>
                                    <input type="radio" id="optionTwo" name="choice" value="optionTwo" onChange={this.handleChange} />
                                    <label htmlFor="optionTwo">{optionTwo.text}</label>
                                </div>
                                <button className="question-submit" disabled={this.state.choice === null}>Submit</button>
                            </form>)
                        }

                        {answered && (
                            <>
                            <p className={hasVoted(optionOne, authedUser) ? 'choosen-option' : null}>{optionOne.text}: {optionOne.votes.length} votes - {percentage(optionOne, optionTwo)}%</p>
                            <p className={hasVoted(optionTwo, authedUser) ? 'choosen-option' : null}>{optionTwo.text}: {optionTwo.votes.length} votes - {percentage(optionTwo, optionOne)}%</p>
                            </>
                        )}

                    </div>
                </div>
            </section>
        )
    }

}

function mapStateToProps({ questions, users, authedUser }, props) {
    const { id } = props.match.params;
    const question = questions[id];

    if (!question) {
        return {}
    }

    const author = users[question.author];


    return {
        question: {
            ...(question),
            author,
            answered: question.optionOne.votes.concat(question.optionTwo.votes).includes(authedUser)
        },
        authedUser
    }
}
export default connect(mapStateToProps)(withRouter(QuestionDetails));