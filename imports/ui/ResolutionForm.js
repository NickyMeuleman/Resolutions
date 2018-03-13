import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
      name
    }
  }
`;

class ResolutionForm extends Component {
  submitForm = () => {
    console.log("client side:", this.name.value);
    this.props
      .createResolution({
        variables: {
          name: this.name.value
        }
      })
      .then(result => {
        console.log("resolutionForm:", result);
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

export default graphql(createResolution, { name: "createResolution" })(
  ResolutionForm
);
