import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { handleInitData } from "./actions/shared";
import "./App.css";
import NotFound from "./components/errors/NotFound";
import Home from "./components/Home";
import Login from "./components/Login";
import QuestionDetails from "./components/QuestionDetails";
import NewQuestion from "./components/NewQuestion";
import LeaderBoard from "./components/LeaderBoard";
import Nav from "./components/Nav";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitData());
  }

  render() {
    const { loggedIn, loading } = this.props;

    if (!loggedIn) {
      return <Login />;
    }

    return (
      <>
        <LoadingBar />
        <div>
          {!loading && (
            <BrowserRouter>
              <header>
                <Nav />
              </header>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/leaderboard" exact component={LeaderBoard} />
                <Route path="/question/add" exact component={NewQuestion} />
                <Route path="/question/:id" exact component={QuestionDetails} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    loggedIn: authedUser !== null,
    loading: !questions || !users,
  };
}
export default connect(mapStateToProps)(App);
