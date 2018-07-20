import * as React from 'react';

interface State {
  schema: any[];
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      schema: []
    }
  }
  componentDidMount() {
    fetch('/schema').then(result => result.json()).then(schema => {
      this.setState({
        schema
      })
    });
  }

  render() {
    return (
      <div>
        <h2>
          Admin
        </h2>
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

export default App;
