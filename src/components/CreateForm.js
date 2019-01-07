import React, { Component } from "react";
import Form from "react-jsonschema-form";

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderForm = () => {
    if (this.props.schema) {
      let defaultValues = Object.assign({}, this.props.schemaValues);

      // Remove default value assigned to file type to prevent errors
      for (let k in this.props.schema.properties) {
        if (this.props.schema.properties[k].format == "data-url") {
          delete defaultValues[k];
        }
      }
      return (
        <Form
          schema={this.props.schema}
          formData={defaultValues}
          onSubmit={({ formData }) => {
            this.props.onSaveHandler(formData);
          }}
        />
      );
    } else return null;
  };

  render() {
    return this._renderForm();
  }
}
