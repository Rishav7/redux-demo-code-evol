const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const applyMiddleware = redux.applyMiddleware

//for combine reducers
const combineReducers = redux.combineReducers

//for middleware => redux-loogger // logging the 
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()



const ORDER_CAKE = 'ORDER_CAKE'
const RESTOCK_CAKE = 'RESTOCK_CAKE'

const ORDER_ICECREAM = 'ORDER_ICECREAM'
const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM'


function order() {
	return {
		type: ORDER_CAKE,
		payload: 1
	}
}

function restock(qty) {
	return {
		type: RESTOCK_CAKE,
		payload: qty

	}
}

function orderIcecream(qty) {
	return {
		type: ORDER_ICECREAM,
		payload: qty
	}
}

function restockIcecream(qty) {
	return {
		type: RESTOCK_ICECREAM,
		paylaod: qty
	}
}

// Reducer function
// (previousState , action)

const initialCakeState = {
	noOfCake: 10,
}

const initialIceCreamState = {
	noOfIceCream: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case ORDER_CAKE:
			return {
				...state,//IF MORE THAN ONE INITIAL STATE ARE THERE
				noOfCake: state.noOfCake - action.payload
			}
		case RESTOCK_CAKE:
			return {
				...state,
				noOfCake: state.noOfCake + action.payload
			}

		default:
			return state
	}
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
	switch (action.type) {
		case ORDER_ICECREAM:
			return {
				...state,//IF MORE THAN ONE INITIAL STATE ARE THERE
				noOfIceCream: state.noOfIceCream - action.payload
			}
		case RESTOCK_ICECREAM:
			return {
				...state,
				noOfIceCream: state.noOfIceCream + action.payload

			}
		default:
			return state
	}
}

//combining the reducers
const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer
})


//connecting store
const store = createStore(rootReducer, applyMiddleware(logger)) //applyMiddleware logger
console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {
	console.log('updated State : ', store.getState());
})
/* 
store.dispatch(order())
store.dispatch(order())
store.dispatch(order())
store.dispatch(restock(4))
store.dispatch(order())
*/

const actions = bindActionCreators({ order, restock, orderIcecream, restockIcecream }, store.dispatch)
actions.order()
actions.order()
actions.order()
actions.restock(3)
actions.orderIcecream(1)
actions.orderIcecream(1)
actions.restockIcecream(2)
actions.restockIcecream(2)



unsubscribe()

