const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const orders = []


const checkOrdersId = (request, response, next) => {
    const {id} = request.params
    const index = orders.findIndex(order => order.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "User Not Found" })
    }
    request.userIndex = index
    request.ordersId = id
    next()
}


app.get('/orders', (request, response) => {
    
    return response.json(orders)
})

app.post('/orders', (request, response) => {
    const { order, clientName, price } = request.body
    const requests = { id: uuid.v4(), order, clientName, price }

    orders.push(requests)
    return response.status(201).json(orders)
})


app.put('/orders/:id', checkOrdersId, (request, response) => {
    const {order, clientName, price } = request.body
    const index = request.userIndex
    const id = request.ordersId
    const updatedOrder = { id, order, clientName, price }
    orders[index] = updatedOrder
    return response.json(updatedOrder)

})

app.delete('/orders/:id', checkOrdersId, (request, response) => {
    const index = request.userIndex
    orders.splice(index, 1)
    return response.status(204).json()
})

app.get('/orders/:id', (request, response) => {  
    return response.json(orders)
})

app.patch ('/orders/:id', (request, response) => {



})








app.listen(port, () => {
    console.log(`🚀Server Started on Port ${port}`)
})