import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import ReactLoading from "react-loading";
import { uploadWebsite } from "../libs/api";

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
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

  _onFormChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    this.setState({ isLoading: true });
    const res = await uploadWebsite(formData);
    this.setState({ isLoading: false });
    alert(res.message);
  }

  _renderWebpageUploader = () => {
    return (
      <ListGroupItem key="websiteuploader">
        Website Uploader 📤 <input type="file" onChange={this._onFormChange} />
      </ListGroupItem>
    )
  }

  render() {
    return (
      <div>
        <h1>Website</h1>
        <p style={{ fontSize: 12 }}>*Upload a zip file containing all the website source code in the root path (no folder). The file will then be accessible at <a href={window.location.origin}>here</a>.</p>
        <ListGroup>{this._renderWebpageUploader()}</ListGroup>

        {this.state.isLoading && (
          <ReactLoading type="spin" color="#000" width={32} height={32} />
        )}

        <hr className="my-2" />
        <h1>Tables</h1>
        <p style={{ fontSize: 12 }}>*Select a table to see the data available currently.</p>
        <ListGroup>{this._renderCategories()}</ListGroup>

      </div>
    );
  }
}
