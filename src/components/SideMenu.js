import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCategories = () => {
    if (this.props.categories) {
      return this.props.categories.map((category, index) => {
        return (
          <ListGroupItem
            key={category}
            onClick={() => {
              this.props.clickHandler(category);
            }}
          >
            {index + 1}. {category}
          </ListGroupItem>
        );
      });
    } else return null;
  };

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <hr className="my-2" />
        <ListGroup>{this._renderCategories()}</ListGroup>
      </div>
    );
  }
}
