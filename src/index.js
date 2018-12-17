import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import React, { Component } from "react";
import { render } from "react-dom";
import { Alert, Button, Container, Col, Row } from "reactstrap";
import ReactLoading from "react-loading";
import * as API from "./libs/api";

import SideMenu from "./components/SideMenu";
import CategoryTable from "./components/CategoryTable";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: undefined, // Stores all categories based on schema file name
      selectedCategory: undefined, // Keep track of currently selected category
      selectedSchema: undefined, // For generating forms of current category schema
      selectedIndex: undefined, // For editing values
      response: "" // For displaying responses from server
    };
  }

  componentWillMount = () => {
    this._getCategories();
  };

  _getCategories = () => {
    this.setState({ isLoading: true });
    API.getCategories().then(categories => {
      this.setState({
        categories: categories
      });

      this.setState({ isLoading: false });
    });
  };

  _getCategoryItems = category => {
    this.setState({ isLoading: true });

    API.getCategoryItems(category).then(categoryItems => {
      this.setState({
        selectedCategory: category,
        categoryItems: categoryItems.length > 0 ? categoryItems : undefined,
        selectedSchemaValues: undefined,
        selectedSchema: undefined
      });

      this.setState({ isLoading: false });
    });
  };

  // On click Create button to generate CreateForm
  _getCategorySchema = () => {
    this.setState({ isLoading: true });
    API.getCategorySchema(this.state.selectedCategory).then(schema => {
      schema = JSON.parse(schema);
      this.setState({
        selectedSchema: schema,
        response: ""
      });

      this.setState({ isLoading: false });
    });
  };

  _getItemValue = index => {
    // Get the selected item using index
    const item = this.state.categoryItems[index];
    if (this.state.selectedSchema == undefined) {
      this._getCategorySchema();
    }
    this.setState({
      selectedSchemaValues: item,
      selectedIndex: index
    });
  };

  _createItem = data => {
    this.setState({ isLoading: true });
    API.createItem(this.state.selectedCategory, data).then(res => {
      this.setState({ response: res.message });
      this._getCategoryItems(this.state.selectedCategory);
    });
  };

  _editItem = data => {
    this.setState({ isLoading: true });
    API.editItem(
      this.state.selectedCategory,
      this.state.selectedIndex,
      data
    ).then(res => {
      this.setState({ response: res.message });
      this._getCategoryItems(this.state.selectedCategory);
    });
  };

  _deleteItem = index => {
    this.setState({ isLoading: true });
    API.deleteItem(this.state.selectedCategory, index).then(res => {
      this.setState({ response: res.message });
      this._getCategoryItems(this.state.selectedCategory);
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="4">
            <SideMenu
              categories={this.state.categories}
              clickHandler={this._getCategoryItems}
            />
          </Col>
          <Col md="8">
            <div>
              <h1>
                Database{" "}
                {this.state.selectedCategory && (
                  <Button
                    color="primary"
                    size="sm"
                    onClick={this._getCategorySchema}
                  >
                    📝 Create {this.state.selectedCategory}
                  </Button>
                )}
              </h1>
              <hr className="my-2" />
              {this.state.response && (
                <Alert color="success">{this.state.response}</Alert>
              )}

              {this.state.isLoading && (
                <ReactLoading type="spin" color="#000" width={32} height={32} />
              )}

              <CreateForm
                schema={this.state.selectedSchema}
                schemaValues={this.state.selectedSchemaValues}
                onSaveHandler={
                  this.state.selectedSchemaValues
                    ? this._editItem
                    : this._createItem
                }
              />
              <CategoryTable
                categoryItems={this.state.categoryItems}
                editHandler={this._getItemValue}
                deleteHandler={this._deleteItem}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

render(<App />, document.getElementById("app"));
