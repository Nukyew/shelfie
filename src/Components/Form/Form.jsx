import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Form extends React.Component{
    state = {
        name: '',
        price: 0,
        imgurl: '',
        currentProdId: null,
        toggleEdit: false
    }

    componentDidMount = () => {
        if (this.props.match.url.includes('edit')){
            this.getOneProduct()
        }
    }

    getOneProduct = () => {
        axios.get(`/api/inventory/${this.props.match.params.id}`).then(res => {
            // console.log(res.data)
            this.setState({
                name: res.data[0].name,
                price: res.data[0].price,
                imgurl: res.data[0].img,
                currentProdId: res.data[0].id,
                toggleEdit: true
            })
        }).catch(err => console.log(err))
    }

    componentDidUpdate = (test, prevState) => {
        // console.log(prevState.name)
        // if (prevProps.currentProduct[0] !== this.props.currentProduct[0]){
        //     // console.log(prevProps)
        //     // console.log(this.props.currentProduct)
        //     this.setState({
        //         name: this.props.currentProduct[0].name,
        //         price: this.props.currentProduct[0].price,
        //         imgurl: this.props.currentProduct[0].img,
        //         currentProdId: this.props.currentProduct[0].id,
        //         toggleEdit: true
        //     })
        // }
        // if (this.props.match.url.includes('add') === prevState){
        //     this.resetState()
        // }
        // if (prevState.name && test.match.path.includes('edit') && this.toggleEdit2 === false){
            //     this.resetState()
            //     this.setState({
                //         toggleEdit2: true
                //     })
                // }
        // console.log(test)
        if (prevState === this.state){
            this.resetState()
        }
    }

    handleName = e => {
        this.setState({
            name: e.target.value
        })
    }

    handlePrice = e => {
        this.setState({
            price: e.target.value
        })
    }

    handleImg = e => {
        this.setState({
            imgurl: e.target.value
        })
    }

    resetState = () => {
        this.setState({
            name: '',
            price: 0,
            imgurl: '',
            currentProdId: null,
            toggleEdit: false
        })
    }

    addToInventory = () => {
        axios.post('/api/product', this.state)
        this.resetState()
    }

    updateProduct = () => {
        axios.put(`/api/product/${this.state.currentProdId}`, {name: this.state.name, price: this.state.price, imgurl: this.state.imgurl}).then(res => {
            this.props.history.goBack()
        }).catch(err => console.log(`Could not find product to update. Reason: ${err}`))
    }

    cancelBtn = () => {
        this.resetState()
    }

    saveChanges = () => {
        this.updateProduct()
    }

    render(){
        let formFilledStyle = {
            backgroundImage: `url(${this.state.imgurl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: "320px",
            height: "200px",
            alignSelf: 'center'
        }
        return(
            <div className="form">
                {!this.state.imgurl ? <img width="320px" height="200px" src="https://via.placeholder.com/320x200" alt="placeholder box"/> : <div className="form-filled" style={formFilledStyle} /* src={this.state.imgurl} *//>}
                Image URL: <input onChange={e => this.handleImg(e)} value={this.state.imgurl} type="text"/>
                Product Name: <input onChange={e => this.handleName(e)} value={this.state.name} type="text"/>
                Price: <input onChange={e => this.handlePrice(e)} value={this.state.price} type="number"/>
                <div className="form-btns">
                    <Link to='/'><button onClick={() => this.cancelBtn()}>Cancel</button></Link>
                    {
                    this.state.toggleEdit
                    ? <button onClick={() => this.saveChanges()}>Save Changes</button>
                    : <Link to="/"><button onClick={() => this.addToInventory()}>Add To Inventory</button></Link>
                    }
                </div>
            </div>
        )
    }
}

export default Form