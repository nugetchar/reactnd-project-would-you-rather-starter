import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './QuestionExcerpt.css';

function QuestionExcerpt(props) {
    const {question: {id, author, getExcerpt}, authedUser} = props;

    return (
        <section className="excerpt-container">
            <h3 className="excerpt-title">{author.name} {authedUser === author.id && ('(you)')} asks:</h3>
            <div className="excerpt">
                <figure>
                    <img className="excerpt-avatar" src={author.avatarURL} alt={`Avatar of ${author.name}`}/>
                </figure>
                <div className="excerpt-content">
                <h4>Would you rather</h4>
                <p>{getExcerpt()}</p>
                <Link to={`/question/${id}`}>
                    View Poll
                </Link> 
                </div>
            </div>
        </section>
    )
}

function mapStateToProps({users, authedUser}, {question}) {
    const author = users[question.author];
    return {
        authedUser,
        question: {
            ...question,
            author,
            getExcerpt: () => {
                const text = question.optionOne.text;
                const textSplit = text.split(' ');
                const excerpt = textSplit.length > 2 ? `...${textSplit[1]}...` : `${textSplit[0]}...`;
                return excerpt;
            }
        }
    }
}
export default connect(mapStateToProps)(QuestionExcerpt);