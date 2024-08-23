// src/redux/store.js
import { legacy_createStore as createStore } from 'redux';

// Estado inicial
const initialState = {
    className: 'bgx-white',
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CLASS_NAME':
            return { ...state, className: action.payload };
        default:
            return state;
    }
};

// Crear el store
const store = createStore(reducer);

export default store;
