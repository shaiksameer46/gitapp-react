import React, { Component } from 'react';
import _ from 'lodash';

class Repo extends Component {
    render() { 
        const repos = _.find(this.props.data,
         {name: this.props.match.params.reponame, 
          owner: this.props.match.params.ownername
        })
        const language = _.pick(repos, ['language']);
        const followers = _.pick(repos, ['followers']);
        const url = _.pick(repos, ['url']);
        const description = _.pick(repos, ['description']);

        return(   
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>Selected Repository Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Repository language</td>
                            <td>{language.language}</td>
                        </tr>
                        <tr>
                            <td>Repository url</td>
                            <td>{url.url}</td>
                        </tr>
                        <tr>
                            <td>Repository followers</td>
                            <td>{followers.followers}</td>
                        </tr>
                        <tr>
                            <td>Repository description</td>
                            <td>{description.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Repo;