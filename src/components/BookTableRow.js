import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class BookTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
  }

  deleteBook() {
    const { _id } = this.props.obj;  // Destructure _id to ensure it's available
    if (!_id) {
      console.error('Book ID is missing!');
      return;  // Avoid proceeding if _id is not available
    }

    axios
      .delete('http://localhost:4000/books/delete-book/' + _id)
      .then((res) => {
        console.log('Book successfully deleted!');
        this.props.deleteBook(_id);  // Pass the _id to parent component
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.authors ? this.props.obj.authors.join(", ") : "N/A"}</td>
        <td>{this.props.obj.isbn}</td>
        <td>
          <div className="action-buttons">
            <Link
              className="btn btn-primary btn-sm"
              to={'/edit-book/' + this.props.obj._id}
            >
              Edit
            </Link>
            <Button onClick={this.deleteBook} size="sm" variant="danger">
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  }
}
