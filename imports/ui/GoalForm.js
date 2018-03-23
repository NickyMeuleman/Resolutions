import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
      name
    }
  }
`;

class GoalForm extends Component {
  submitForm = () => {
    console.log("client side:", this.name.value);
    this.props
      .createGoal({
        variables: {
          name: this.name.value,
          resolutionId: this.props.resolutionId
        }
      })
      .then(result => {
        this.name.value = "";
        console.log("goalForm:", result);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <input type="text" ref={input => (this.name = input)} />
        <button onClick={this.submitForm}>Submit Goal</button>
      </div>
    );
  }
}

export default graphql(createGoal, {
  name: "createGoal",
  options: {
    refetchQueries: ["resolutionsQuery"]
  }
})(GoalForm);
