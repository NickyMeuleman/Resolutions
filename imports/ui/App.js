import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import ResolutionForm from "./ResolutionForm";
import UpdateResolutionForm from "./UpdateResolutionForm";

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
    const { loading, resolutions, refetch } = this.props;
    return (
      !loading && (
        <div>
          <ResolutionForm />
          <ul>
            {resolutions.map(resolution => (
              <React.Fragment key={resolution._id}>
                <li>{resolution.name}</li>
                <button
                  onClick={() => {
                    this.deleteHandler(resolution._id);
                  }}
                >
                  Delete
                </button>
                <UpdateResolutionForm id={resolution._id} refetch={refetch} />
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
    }
  }
`;

export default compose(
  graphql(resolutionsQuery, {
    props: ({ data }) => ({ ...data })
  }),
  graphql(deleteResolution, { name: "deleteResolution" })
)(App);
