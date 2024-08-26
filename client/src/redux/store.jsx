// src/redux/store.js
import { legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // puedes cambiar a sessionStorage si prefieres

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

// Configuración de persistencia
const persistConfig = {
    key: 'root',
    storage,
};

// Reducer persistente
const persistedReducer = persistReducer(persistConfig, reducer);

// Crear el store con el reducer persistente
const store = createStore(persistedReducer);

// Crear el persistor
const persistor = persistStore(store);

export { store, persistor };
