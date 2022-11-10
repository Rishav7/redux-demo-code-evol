const redux = require('redux');
const createStore = redux.createStore
const produce = require('immer').produce


const initialState = {
	name: 'rishav',
	age: '24',
	address: {
		street: '22 wall street',
		city: 'NY',
		state: 'USA'
	}
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
	return {
		type: STREET_UPDATED,
		payload: street
	}

}

const streetReducer = (state = initialState, action) => {
	switch (action.type) {
		case STREET_UPDATED:
			// return {
			// 	...state,
			// 	address: {
			// 		...state.address,
			// 		street: action.payload
			// 	}
			// }


			//using immer
			return produce(state, (draft) => {
				draft.address.street = action.payload
			})

		default:
			return state
	}
}

const store = createStore(streetReducer)
console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => {
	console.log('updated State : ', store.getState());
})


store.dispatch(updateStreet('ashfj'))
unsubscribe()