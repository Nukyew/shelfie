import React from 'react'
import {Link} from 'react-router-dom'

class Product extends React.Component {
    render(){
        let imgStyle = {
            backgroundImage: `url(${this.props.product.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: "320px",
            height: "200px"
        }
        return(
            <div className="product">
                <div style={imgStyle}></div>
                <div className="product-desc">
                    <h2>{this.props.product.name}</h2>
                    <h3>${this.props.product.price}</h3>
                    <div className="product-desc-btns">
                        <button onClick={() => this.props.deleteProduct(this.props.product.id)}>Delete</button>
                        <Link to={`/edit/${this.props.product.id}`}><button>Edit</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product