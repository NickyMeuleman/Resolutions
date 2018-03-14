import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const updateResolution = gql`
  mutation updateResolution($id: String!, $name: String!) {
    updateResolution(id: $id, name: $name) {
      _id
      name
    }
  }
`;

class UpdateResolutionForm extends Component {
  submitForm = () => {
    this.props
      .updateResolution({
        variables: {
          id: this.props.id,
          name: this.name.value
        }
      })
      .then(result => {
        console.log("EditResolutionForm:", result);
        this.props.refetch();
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <input type="text" ref={input => (this.name = input)} />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    );
  }
}

export default graphql(updateResolution, { name: "updateResolution" })(
  UpdateResolutionForm
);
