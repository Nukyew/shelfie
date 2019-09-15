import React from 'react'
import Product from '../Product/Product'
import axios from 'axios'


class Dashboard extends React.Component {
    constructor(){
        super()

        this.state = {
            inventory: []
        }
        this.deleteProduct = this.deleteProduct.bind(this)
    }
        

    componentDidMount = () => {
        this.getInventory()
    }

    getInventory() {
        axios.get('/api/inventory').then(res => {
          this.setState({
            inventory: res.data
          })
        })
      }

    deleteProduct(id) {
        axios.delete(`/api/inventory/${id}`).then(res => {
            this.getInventory()
        })
    }

    render(){
        let list = this.state.inventory.map((el, i) => {
            return(
                <Product
                    deleteProduct={this.deleteProduct}
                    key={i + el.name}
                    product={el}
                    // selectedProduct={this.props.selectedProduct}
                />
            )
        })
        return(
            <div className="dashboard">
                {list}
            </div>
        )
    }
}

export default Dashboard