import React, { Component } from 'react';
import axios from "axios";
import { Route, Link, Switch } from 'react-router-dom';
import './css/Normalize.css'
import './css/styles.css'
import './App.css';
import Repo from './Repo';

class App extends Component {

  state = {
    ownername : "",
    repos : []
  };
 
  handleSubmit = async event => {
    event.preventDefault();
    const query = this.state.ownername;
    const { data: repos } = await axios.get('https://api.github.com/legacy/repos/search/'+query);
    this.setState({ repos : repos.repositories });
    //console.log(this.state.repos[0].owner);
    this.setState({ ownername: ""});
  };

  handleChange = event => {
    this.setState({ ownername: event.target.value });
  };
  

  render() {
    return (
      <React.Fragment>
      <div className="container">
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
      <input 
      className="form-control mt-3"
      id="search" 
      type="text" 
      value = {this.state.ownername}
      onChange = {this.handleChange}
      placeholder="Enter git repository search"
      />     
      </div>
      <button type="submit" className="btn btn-primary mb-2">
       search
      </button>
      </form>
      

  <div className="panel panel-default panelstyle">
       <div className="panel-heading">
       <h2>List of repositories with given search</h2>
       </div>
      <table className="table table-dark">
      <thead>
        <tr>
          <th>Repository Name</th>
          <th>Owner Name</th>
        </tr>
      </thead>
      <tbody>
        {this.state.repos.map(repo => (
          <tr key={repo.created} >
           <td><Link to={`/${repo.name}/${repo.owner}`}>{repo.name}</Link></td>
           <td><Link to={`/${repo.name}/${repo.owner}`}>{repo.owner}</Link></td>
          </tr>
        ))}
      </tbody>
      </table>
   </div>
      
      <div id="overlay-container">
      <Switch>
        <Route path="/:reponame/:ownername" 
        render={(props) => <Repo data={this.state.repos} {...props} />}
      />
      </Switch>
      </div>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
