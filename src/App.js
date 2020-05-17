import React from 'react'
import Header from './components/Header'
import MyGrid from './components/fullGrid'
import 'semantic-ui-css/semantic.min.css'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <MyGrid/>
      </div>
    );
  }
}

export default App;
