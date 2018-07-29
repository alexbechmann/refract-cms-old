import * as React from 'react';

export interface AdminProps {
  serverUrl: string;
}

export interface State {
  schema: any[];
}

class Admin extends React.Component<AdminProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      schema: []
    };
  }
  componentDidMount() {
    fetch(`${this.props.serverUrl}/schema`)
      .then(result => result.json())
      .then(schema => {
        this.setState({
          schema
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
        {this.state.schema.map(item => (
          <div key={item.alias}>
            <div> {item.alias}</div>
            <div>{JSON.stringify(item.properties)}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Admin;
