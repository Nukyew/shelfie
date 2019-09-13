import React from 'react'

class Product extends React.Component {
    render(){
        return(
            <div className="product">
                <img src={this.props.product.img} alt={this.props.name}/>
                <div className="product-desc">
                    <h2>{this.props.product.name}</h2>
                    <h3>{this.props.product.price}</h3>
                    <button onClick={() => this.props.deleteProduct(this.props.product.id)}>Delete</button>
                    <button onClick={() => this.props.selectedProduct(this.props.product)}>Edit</button>
                </div>
            </div>
        )
    }
}

export default Product