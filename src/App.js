import React, { Component } from "react";
import styles from "./App.module.css";

class App extends Component {
  state = {
    userData: null,
    total: null,
    per_page: null,
    current_page: 1,
  };

  componentDidMount() {
    this.fetchUserData(1);
  }

  fetchUserData = async (pageNumber) => {
    const response = await fetch(
      ` https://reqres.in/api/users?page=${pageNumber}`
    );

    const data = await response.json();
     console.log(data)
    // console.log(data.data)

    this.setState({
      userData: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page,
    });
  };

  render() {
    let userData, renderPageNumbers;

    if (this.state.userData !== null) {
      userData = this.state.userData.map((user) => {
        console.log(user);
        return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>
              <img src={user.avatar} />
            </td>
          </tr>
        );
      });
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.total / this.state.per_page);
        i++
      ) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map((number) => {
        let classes = this.state.current_page === number ? styles.active : "";

        return (
          <span
            key={number}
            className={classes}
            onClick={() => this.fetchUserData(number)}
          >
            {number}
          </span>
        );
      });
    }

    return (
      <div className={styles.app}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>{userData}</tbody>
        </table>

        <div className={styles.pagination}>{renderPageNumbers}</div>
      </div>
    );
  }
}

export default App;
