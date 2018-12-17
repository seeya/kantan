import React from "react";
import { Table } from "reactstrap";
import { IMAGE_HOST } from "../libs/api";

// Display a table of item based on the selected category
export default class CategoryTable extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderTable = () => {
    if (this.props.categoryItems) {
      // Get the first item and extract the keys for the table headers
      const headers = Object.keys(this.props.categoryItems[0]);

      return (
        <Table>
          <thead>
            <tr>
              {headers.map(h => {
                return <th key={h}>{h}</th>;
              })}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.categoryItems
              .map((c, i, l) => {
                // We get the value since the array position is fixed
                const values = Object.values(c);
                // Format with row
                let temp = values.map(v => {
                  if (v.match(/\.(jpeg|jpg|gif|png)$/) != null)
                    v = (
                      <img className="thumbnail" src={`${IMAGE_HOST}/${v}`} />
                    );
                  return <td key={`${v}_${i}`}>{v}</td>;
                });
                temp.push(
                  <td
                    key={`edit_${i}`}
                    onClick={() => {
                      this.props.editHandler(i);
                    }}
                  >
                    🖊️
                  </td>
                );
                temp.push(
                  <td
                    key={`delete_${i}`}
                    onClick={() => {
                      this.props.deleteHandler(i);
                    }}
                  >
                    🗑️
                  </td>
                );
                return temp;
              })
              .map((td, i) => {
                return <tr key={i}>{td}</tr>;
              })}
          </tbody>
        </Table>
      );
    } else return null;
  };

  render() {
    return this._renderTable();
  }
}
