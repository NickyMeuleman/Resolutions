import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose, withApollo } from "react-apollo";
import ResolutionForm from "./ResolutionForm";
import GoalForm from "./GoalForm";
import UpdateResolutionForm from "./UpdateResolutionForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Goal from "./resolutions/Goal";

const deleteResolution = gql`
  mutation deleteResolution($id: String!) {
    deleteResolution(id: $id) {
      _id
      name
    }
  }
`;

class App extends Component {
  deleteHandler = id => {
    this.props
      .deleteResolution({ variables: { id: id.toString() } })
      .then(result => {
        console.log("delete result:", result);
        this.props.refetch();
        console.log(this.props.data);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { loading, resolutions, refetch, user } = this.props;
    return (
      !loading && (
        <div>
          {user._id ? (
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
              <RegisterForm client={this.props.client} />
              <LoginForm client={this.props.client} />
            </React.Fragment>
          )}
          <ResolutionForm />
          <ul>
            {resolutions.map(resolution => (
              <React.Fragment key={resolution._id}>
                <li>{resolution.name}</li>
                <ul>
                  {resolution.goals.map(goal => (
                    <Goal goal={goal} key={goal._id} />
                  ))}
                </ul>
                <button
                  onClick={() => {
                    this.deleteHandler(resolution._id);
                  }}
                >
                  Delete
                </button>
                <UpdateResolutionForm id={resolution._id} refetch={refetch} />
                <GoalForm resolutionId={resolution._id} />
              </React.Fragment>
            ))}
          </ul>
        </div>
      )
    );
  }
}

const resolutionsQuery = gql`
  query resolutionsQuery {
    resolutions {
      _id
      name
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`;

export default compose(
  graphql(resolutionsQuery, {
    props: ({ data }) => ({ ...data })
  }),
  graphql(deleteResolution, { name: "deleteResolution" })
)(withApollo(App));
