import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppTheme from './theme';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ChakraProvider theme={AppTheme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ChakraProvider>,
);

