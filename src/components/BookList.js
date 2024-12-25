import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookTableRow from './BookTableRow';

export default class BookList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/books/')
      .then((res) => {
        console.log(res.data);  // Log the response data to check if _id is included
        this.setState({
          books: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }



  DataTable() {
    return this.state.books.map((res, i) => {
      // Ensure that res contains the _id and all necessary fields
      console.log(res);  // Log res to check the structure of the object
      return (
        <BookTableRow
          obj={res} // Passing the entire book object with _id
          key={i}
          deleteBook={this.deleteBook}  // Passing the deleteBook function to handle deletion
        />
      );
    });
  }



  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </div>
    );
  }
}
