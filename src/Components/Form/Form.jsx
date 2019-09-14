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
        })
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
        axios.post('/api/product', this.state).then(result => {
            console.log("Frontend: Added to DB!")
        })
        this.resetState()
    }

    updateProduct = () => {
        axios.put(`/api/product/${this.state.currentProdId}`, {name: this.state.name, price: this.state.price, imgurl: this.state.imgurl}).then(res => {
            this.props.history.goBack()
        })
    }

    cancelBtn = () => {
        this.resetState()
    }

    saveChanges = () => {
        this.updateProduct()
    }

    render(){
        return(
            <div className="form">
                <h1>Form</h1>
                {!this.state.imgurl ? <img src="https://via.placeholder.com/320x200"/> : <img width="320px" height="200px" src={this.state.imgurl}/>}
                Image URL: <input type="url" onChange={e => this.handleImg(e)} value={this.state.imgurl} type="text"/>
                Product Name: <input onChange={e => this.handleName(e)} value={this.state.name} type="text"/>
                Price: <input onChange={e => this.handlePrice(e)} value={this.state.price} type="number"/>
                <Link to='/'><button onClick={() => this.cancelBtn()}>Cancel</button></Link>
                {
                this.state.toggleEdit
                ? <button onClick={() => this.saveChanges()}>Save Changes</button>
                : <Link to="/"><button onClick={() => this.addToInventory()}>Add To Inventory</button></Link>
                }
            </div>
        )
    }
}

export default Form