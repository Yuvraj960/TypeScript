type Pizza = {
    id: number
    name: string
    price: number
}

type Order = {
    id: number
    pizza: Pizza
    status: "ordered" | "completed"
}

let cashInRegister = 100
let nextOrderId = 1
let nextPizzaId = 1

const menu: Pizza[] = [
    { id: nextPizzaId++, name: 'Pepperoni', price: 15 },
    { id: nextPizzaId++, name: 'Margarita', price: 10 },
    { id: nextPizzaId++, name: 'Hawaiian', price: 20 },
    { id: nextPizzaId++, name: 'Meat Feast', price: 25 }
]

const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza: Pizza = {
        id: nextPizzaId++,
        ...pizzaObj
    }
    menu.push(newPizza)
    return newPizza
}

function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} do not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: 'ordered' }
    orderQueue.push(newOrder)
    return newOrder
}

function addToArray<T>(array:T[], item:T):T[] {
    array.push(item)
    return array
}

addToArray<Pizza>(menu, {id: nextPizzaId, name: 'Veggie', price: 18})
addToArray<Order>(orderQueue, {id: nextOrderId, pizza: menu[2], status: 'completed'})

function completeOrder(orderId: number): Order | undefined {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`Order with id ${orderId} not found`)
        return
    }
    order.status = 'completed'
    return order
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === 'string') {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else if (typeof identifier === 'number') {
        return menu.find(pizza => pizza.id === identifier)
    } else {
        throw new TypeError("Parameter 'identifier' must be a string or a number")
    }
}

addNewPizza({ name: 'Veggie', price: 18 })
addNewPizza({ name: 'BBQ Chicken', price: 22 })
addNewPizza({ name: 'Seafood', price: 30 })

placeOrder('Pepperoni')
completeOrder(1)

console.log("Menu: ", menu)
console.log("Cash in register: ", cashInRegister)
console.log("Order queue: ", orderQueue);