import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export default class UserForm extends Component {
  state = { login: true };
  render() {
    return (
      <React.Fragment>
        {this.props.user._id ? (
          <button
            onClick={() => {
              Meteor.logout();
              this.props.client.resetStore();
            }}
          >
            Logout
          </button>
        ) : (
          <React.Fragment>
            {this.state.login ? (
              <LoginForm client={this.props.client} />
            ) : (
              <RegisterForm client={this.props.client} />
            )}
            <button
              onClick={() =>
                this.setState(prevState => {
                  return { login: !prevState.login };
                })
              }
            >
              {this.state.login ? "Register" : "Login"}
            </button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
