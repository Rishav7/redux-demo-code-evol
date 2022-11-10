
const redux = require('redux');
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default

const axios = require('axios');

const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED'
const FETCH_USER_SUCCESSED = 'FETCH_USER_SUCCESSED'
const FETCH_USER_FAILED = 'FETCH_USER_FAILED'



const initialState = {
	loading: false,
	data: [],
	error: ''
}

const fetchUserRequest = () => {
	return {
		type: FETCH_USER_REQUESTED,
	}
}
const fetchUserSuccess = (users) => {
	return {
		type: FETCH_USER_SUCCESSED,
		payload: users
	}
}
const fetchUserfailed = (error) => {
	return {
		type: FETCH_USER_FAILED,
		payload: error
	}
}

//reducers

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_REQUESTED:
			return {
				...state,
				loading: true
			}

		case FETCH_USER_SUCCESSED:
			return {
				loading: false,
				users: action.payload,


			}
		case FETCH_USER_FAILED:
			return {
				loading: false,
				users: [],
				error: action.payload
			}
	}
}

const fetchUser = () => {
	return function (dispatch) {
		dispatch(fetchUserRequest())
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				const users = response.data.map((user) => user.id)
				dispatch(fetchUserSuccess(users))
			})
			.catch((error) => {
				dispatch(fetchUserfailed(error.message))
			})

	}
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => {
	console.log('initial state:', store.getState());
})

store.dispatch(fetchUser())