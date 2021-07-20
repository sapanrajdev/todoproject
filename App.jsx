import React, { PureComponent } from 'react';
import { getUsers, getTodos, filterUsers } from './service';
// import './css/App.css';
export default class App extends PureComponent {
  defaultDomainIndex = 0;
  domains = [
    'all',
    '.biz',
    '.tv',
    '.net',
    '.org',
    '.ca',
    '.info',
    '.me',
    '.io',
  ];

  state = {
    users: [],
    filter: this.domains[this.defaultDomainIndex],
  };

  async componentDidMount() {
    let users = await getUsers();
    users = getTodos(users)
    this.setState({ users });
  }

  listUsers(users) {
    return (
      <ul className="todo">
        {users.map((user) => {
          return <li className="todo-item" key={user.name}><strong>{user.name}</strong> has completed <strong>{user.todos}</strong> todos</li>;
        })}
      </ul>
    );
  }

  handleChange = async (e) => {
    let { users } = this.state;
    const { value } = e.target
    users = await filterUsers(value)
    users = getTodos(users)
    this.setState({
      users
    })
  }

  renderDropDown() {
    return (
      <div className="flex align-center">
        <strong className="domain-selection"> Select Domain: </strong>
        <select className="dropdown dropdown-menu" onChange={this.handleChange}>
          {this.domains.map((domain) => (
            <option className="dropdown-items" key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    const { users } = this.state;
    return (
      <div className="todo-body">
        <h2 className="header">TODO APP</h2>
        {this.renderDropDown()}
        {this.listUsers(users)}
      </div>
    );
  }
}
