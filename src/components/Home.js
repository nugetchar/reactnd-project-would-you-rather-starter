import { Component } from "react";
import { connect } from "react-redux";
import QuestionList from "./QuestionList";

class Home extends Component {

    state = {
        displayedList: 0
    };

    getUnansweredQuestions = (questions, authedUser) => {
        return questions
        .filter(({ optionOne, optionTwo }) => ![...optionOne.votes, ...optionTwo.votes].includes(authedUser))
        .sort((a, b) => b.timestamp - a.timestamp);
    }

    getAnsweredQuestions = (questions, authedUser) => {
        return questions
        .filter(({ optionOne, optionTwo }) => [...optionOne.votes, ...optionTwo.votes].includes(authedUser))
        .sort((a, b) => b.timestamp - a.timestamp);
    }

    setDisplayedList = (displayedList) => {
        this.setState({ displayedList })
    }

    render() {
        const { questions, authedUser } = this.props;
        const { displayedList } = this.state;

        return (
            <div>
                <button disabled={displayedList === 0} onClick={() => this.setDisplayedList(0)}>Unwanswered</button>
                <button disabled={displayedList === 1} onClick={() => this.setDisplayedList(1)}>Answered</button>
                {displayedList === 0 && <QuestionList questions={this.getUnansweredQuestions(questions, authedUser)}/>}
                {displayedList === 1 && <QuestionList questions={this.getAnsweredQuestions(questions, authedUser)}/>}
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    return {
        questions: Object.values(questions),
        authedUser
    }
}

export default connect(mapStateToProps)(Home);