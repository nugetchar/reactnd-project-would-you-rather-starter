import './Stat.css';

export default function Stat(props) {
  const { stat } = props;
  return (
    <div>
      <div className="stat-avatar">
        <figure>
          <img src={`../../${stat.avatarURL}`} alt={`Avatar of ${stat.name}`} />
        </figure>
      </div>
      <div>
        <h3>{stat.name}</h3>
        <p>Answered questions: {stat.nbAnswered}</p>
        <p>Created questions: {stat.nbCreated}</p>
        <p>Score: {stat.score}</p>
      </div>
    </div>
  );
}
