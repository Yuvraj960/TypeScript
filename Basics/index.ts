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


// =================================================================================================
// Nested Custom Types
// =================================================================================================

// type Address = {
//     street: string
//     city: string
//     country: string
// }

// type Person = {
//     name: string
//     age: number
//     isStudent: boolean
//     address?: Address
// }

// let person1: Person = {
//     name: "Joe",
//     age: 42,
//     isStudent: true,
// }

// let person2: Person = {
//     name: "Jane",
//     age: 35,
//     isStudent: false,
//     address: {
//         street: "123 Main St",
//         city: "Springfield",
//         country: "USA"
//     }
// }

// function displayInfo(person: Person) {
//     console.log(`Name: ${person.name}`)
//     console.log(`Age: ${person.age}`)
//     console.log(`Is student: ${person.isStudent}`)
//     if (person.address) {
//         console.log(`Address: ${person.address.street}, ${person.address.city}, ${person.address.country}`)
//     }
// }

// displayInfo(person1)
// displayInfo(person2)

// =================================================================================================
// TS-Specific: Function Return Types
// =================================================================================================

// type UserRole = "guest" | "member" | "admin"

// type User = {
//     username: string
//     role: UserRole
// }

// const users: User[] = [
//     { username: "john_doe", role: "member" },
//     { username: "jane_doe", role: "admin" },
//     { username: "guest_user", role: "guest" }
// ]

// function fetchUserDetails(username: string): User {
//     const user = users.find(user => user.username === username)
//     if (!user) {
//         throw new Error('User with username ${username} not found')
//     }
//     return user
// }

// =================================================================================================
// TS Specific types: any
// =================================================================================================

// In typescript, the 'any' type is used to represent any type of value. It can be used to bypass the type checking system of typescript. So this is used when you just think that you know better than typescript about the type of the value😅.
// This is not recommended to use in your production code as it defeats the purpose of using typescript. But it can be used in some cases where you are not sure about the type of the value at compile time. And it is also used when you are migrating your codebase from javascript to typescript and you don't want to fix all the type errors at once.
//  SO DON'T USE THIS IN YOUR PRODUCTION CODE

// let value: any = 5
// value.toLowerCase()
// value = "Hello, World!"
// value.map((char: string) => char.toUpperCase())

// =================================================================================================
// TypeScript Utility Types: Partial
// =================================================================================================

// type User = {
//     id: number
//     username: string
//     role: "member" | "contributor" | "admin"
// }

// // type UpdatedUser = {
// //     id?: number
// //     username?: string
// //     role?: "member" | "contributor" | "admin"
// // }

// type UpdatedUser = Partial<User> // Partial is a utility type that makes all properties of a type optional. Will perform the same as UpdatedUser type above

// const users: User[] = [
//     { id: 1, username: "john_doe", role: "member" },
//     { id: 2, username: "jane_smith", role: "contributor" },
//     { id: 3, username: "alice_jones", role: "admin" },
//     { id: 4, username: "charlie_brown", role: "member" },
// ];

// function updateUser(id: number, updates: UpdatedUser) {
//     const foundUser = users.find(user => user.id === id);
//     if (!foundUser) {
//         console.log(`User with id ${id} not found`)
//         return
//     }
//     Object.assign(foundUser, updates)
// }

// updateUser(1, { username: "new_john_doe" });
// updateUser(4, { role: "contributor" });

// console.log(users)

// =================================================================================================
// TypeScript Utility Types: Omit
// =================================================================================================

// Omit is a utility type that creates a new type by omitting specific properties from an existing type. It is useful when you want to create a new type that is similar to an existing type but without some properties. For example, you can create a new type that is similar to the User type but without the id property. And then you can add the id property later when creating a new user.

// type User = {
//     id: number
//     username: string
//     role: "member" | "contributor" | "admin"
// }

// type UpdatedUser = Partial<User>

// let nextUserId = 1

// const users: User[] = [
//     { id: nextUserId++, username: "john_doe", role: "member" },
//     { id: nextUserId++, username: "jane_smith", role: "contributor" },
//     { id: nextUserId++, username: "alice_jones", role: "admin" },
//     { id: nextUserId++, username: "charlie_brown", role: "member" },
// ];

// function updateUser(id: number, updates: UpdatedUser) {
//     const foundUser = users.find(user => user.id === id);
//     if (!foundUser) {
//         console.log(`User with id ${id} not found`)
//         return
//     }
//     Object.assign(foundUser, updates)
// }

// function addNewUser(newUser: Omit<User, "id" | "user"): User {
//     const user: User = {
//         id: nextUserId++,
//         ...newUser
//     }
//     users.push(user)
//     return user
// }

// addNewUser({ username: "jane_schmoe", role: "member" })

// console.log(users)

// =================================================================================================
// TypeScript Generics
// =================================================================================================

// const gameScores = [14, 21, 33, 42, 59]
// const favoriteThings = ["raindrops on roses", "whiskers on kittens", "bright copper kettles", "warm woolen mittens"];
// const voters = [{ name: "Alice", age: 42 }, { name: "Bob", age: 77 }]

// function getLastItem<T>(array: T[]): T | undefined {
//     return array[array.length - 1]
// }

// console.log(getLastItem(gameScores))
// console.log(getLastItem(favoriteThings))
// console.log(getLastItem(voters))