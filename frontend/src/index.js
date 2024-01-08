import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ProductProviderDetails } from './context/ProductContext';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductProviderDetails>
<App></App>
</ProductProviderDetails>
);


