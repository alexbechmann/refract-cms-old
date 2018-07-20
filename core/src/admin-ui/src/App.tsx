import * as React from 'react';
import './App.css';

interface IState {
  schema: any[];
}

class App extends React.Component<{}, IState> {
   constructor(props: any) {
    super(props);
    this.state = {
      schema: []
    }
   }
  public componentDidMount() {
    fetch('/schema').then(result => result.json()).then(schema => {
      this.setState({
        schema
      })
    });
  }

  public render() {
    return (
      <div className="App">
        <h1>
          Admin
        </h1>
        {this.state.schema.map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>
    ); 
  }
}

export default App;
