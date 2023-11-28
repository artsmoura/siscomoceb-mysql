import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './modules/Events/redux/eventsReducer';
import logger from 'redux-logger';
import authReducer from './modules/Auth/redux/authReducer';
import layoutReducer from './reduxLayout/layoutReducer';

export const store = configureStore({
    reducer: {
        eventState: eventReducer,
        authState: authReducer,
        layoutState: layoutReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger),
});