import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ProvideAuth } from './hooks/useAuth';

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
