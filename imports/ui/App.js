import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose, withApollo } from "react-apollo";
import ResolutionForm from "./ResolutionForm";
import GoalForm from "./GoalForm";
import UpdateResolutionForm from "./UpdateResolutionForm";

import Goal from "./resolutions/Goal";
import UserForm from "./UserForm";

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
    const { loading, resolutions, refetch, user, client } = this.props;
    return (
      !loading && (
        <div>
          <UserForm user={user} client={client} />
          {user._id && (
            <React.Fragment>
              <ResolutionForm />
              <ul>
                {resolutions.map(resolution => (
                  <React.Fragment key={resolution._id}>
                    <li>
                      <span
                        style={{
                          textDecoration: resolution.completed
                            ? "line-through"
                            : "none"
                        }}
                      >
                        {resolution.name}
                      </span>
                    </li>
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
                    <UpdateResolutionForm
                      id={resolution._id}
                      refetch={refetch}
                    />
                    <GoalForm resolutionId={resolution._id} />
                  </React.Fragment>
                ))}
              </ul>
            </React.Fragment>
          )}
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
      completed
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
