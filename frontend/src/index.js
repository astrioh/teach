import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ProvideAuth } from './hooks/useAuth';
import { ProvideSocket } from './hooks/useSocket';

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider>
      <ProvideAuth>
        <ProvideSocket>
          <App />
        </ProvideSocket>
      </ProvideAuth>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
