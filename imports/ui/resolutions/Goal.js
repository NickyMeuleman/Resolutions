import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Goal extends Component {
  handleChange = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id
      }
    });
  };
  render() {
    return (
      <li>
        <input
          id={this.props.goal._id}
          type="checkbox"
          checked={this.props.goal.completed}
          onChange={this.handleChange}
        />
        <label htmlFor={this.props.goal._id}>
          <span
            style={{
              textDecoration: this.props.goal.completed
                ? "line-through"
                : "none"
            }}
          >
            {this.props.goal.name}
          </span>
        </label>
      </li>
    );
  }
}

const toggleGoal = gql`
  mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
      _id
    }
  }
`;

export default graphql(toggleGoal, {
  name: "toggleGoal",
  options: {
    refetchQueries: ["resolutionsQuery"]
  }
})(Goal);
