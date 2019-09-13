

module.exports = {
    getInventory: (req, res, next) => {
        const db = req.app.get('db')
        db.get_inventory().then(results => {
            res.status(200).send(results)
        })
    },
    createProduct: (req, res, next) => {
        const db = req.app.get('db')
        const {name, price, imgurl} = req.body
        db.create_product([name, price, imgurl]).then(results => {
            res.status(200).send('success')
        })
    },
    deleteProduct: (req, res, next) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.delete_product([id]).then(results => {
            res.status(200).send('deleted successfully')
        })
    },
    updateProduct: (req, res, next) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {name, price, imgurl} = req.body
        db.update_product([id, name, price, imgurl]).then(results => {
            res.status(200).send('updated successfully')
        })
    }
}