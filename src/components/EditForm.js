import React, { Component } from "react";
import Form from "react-jsonschema-form";

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("Edit Form Rendered");
  }

  _renderForm = () => {
    if (this.props.schema && this.props.schemaValues) {
      // We update default values of schema
      const schema = JSON.parse(this.props.schema);

      for (let k in this.props.schemaValues) {
        schema.properties[k] = this.props.schemaValues[k];
      }

      console.log(schema);

      return (
        <Form
          schema={schema}
          onChange={console.log("changed")}
          onSubmit={console.log("submitted")}
          onError={console.log("errors")}
        />
      );
    } else return null;
  };

  render() {
    return this._renderForm();
  }
}
