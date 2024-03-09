import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { ChakraProvider } from '@chakra-ui/react';
// import reportWebVitals from './reportWebVitals';


//     Todo App
// import App from './Todo_App/App';
//----------------------------------------------




//     Amazaun
// import App from './Amazaun/App';
// import { Provider } from 'react-redux';
// import { store } from './Amazaun/redux/store';
// import { store } from './Amazaun/redux/store';
//----------------------------------------------



//     MMDevelopers
import App from './MMDevelopers/App';
import { Provider } from 'react-redux';
import { store } from './MMDevelopers/redux/store';
//----------------------------------------------


// dotenv.config();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
