import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import Dashboard from './Components/Dashboard/Dashboard'
import Form from './Components/Form/Form'
import axios from 'axios'
import routes from './routes'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      inventory: [],
      currentProduct: []
    }
    this.getInventory = this.getInventory.bind(this)
    this.selectedProduct = this.selectedProduct.bind(this)
  }

  getInventory() {
    axios.get('/api/inventory').then(res => {
      this.setState({
        inventory: res.data
      })
    })
  }

  selectedProduct(product) {
    this.setState({
      currentProduct: [product]
    })
  }

  componentDidMount = () => {
    this.getInventory()
  }

  removeSelectedProduct = () => {
    this.setState({
      currentProduct: []
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
          <main>
            {routes}
            <Dashboard
              getInventory={this.getInventory}
              inventory={this.state.inventory}
              selectedProduct={this.selectedProduct}
            />
            <Form
              currentProduct={this.state.currentProduct}
              getInventory={this.getInventory}
            />
          </main>
      </div>
    );
  }
}

export default App;
