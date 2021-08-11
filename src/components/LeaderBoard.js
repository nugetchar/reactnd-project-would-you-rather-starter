import { connect } from "react-redux";
import Stat from "./Stat.js";
import './LeaderBoard.css';

function LeaderBoard(props) {
  const { stats } = props;
  return (
    <>
      <h2>LeaderBoard</h2>
      <section className="leaderboard">
      {stats.sort((a, b) => b.score - a.score).map((stat) => (
        <Stat key={stat.id} stat={stat} />
      ))}
      </section>
    </>
  );
}

function mapStateToProps({ users }) {
  return {
    stats: Object.values(users).map(
      ({ id, name, avatarURL, questions, answers }) => ({
        id,
        name,
        avatarURL,
        nbAnswered: Object.values(answers).length,
        nbCreated: questions.length,
        get score() {
            return this.nbAnswered + this.nbCreated
        }
      })
    ),
  };
}
export default connect(mapStateToProps)(LeaderBoard);
