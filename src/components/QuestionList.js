import QuestionExcerpt from './QuestionExcerpt';

function QuestionList(props) {
    const {questions} = props;
    return (
        <>
            {questions.map(question => (<QuestionExcerpt key={question.id} question={question}/>))}
        </>
    )
}

export default QuestionList;