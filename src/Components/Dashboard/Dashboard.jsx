import React from 'react'
import Product from '../Product/Product'
import axios from 'axios'


class Dashboard extends React.Component {
    state = {
    }

    deleteProduct = id => {
        axios.delete(`/api/inventory/${id}`).then(res => {
            this.props.getInventory()
        })
    }

    render(){
        let list = this.props.inventory.map((el, i) => {
            return(
                <Product
                    deleteProduct={this.deleteProduct}
                    key={i + el.name}
                    product={el}
                    selectedProduct={this.props.selectedProduct}
                />
            )
        })
        return(
            <div className="dashboard">
                <h1>Dashboard</h1>
                {list}
            </div>
        )
    }
}

export default Dashboard