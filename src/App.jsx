import { useState } from 'react';
import './App.css';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IMSContext from './Context/IMSContext';
import Home from './Pages/Home';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Verify from './Pages/Verify';
import Verifying from './Components/Verifing';
import Inventory from './Pages/Inventory';
import Profile from './Pages/Profile';
import Supplier from './Pages/Supplier';
import SupplierDetails from './Components/SupplierDetails';
import Purchases from './Pages/Purchases';
import Sale from './Pages/Sale';
import Report from './Pages/Report';
import Users from './Pages/Users';
import PurchaseDetails from './Pages/PurchaseDetails';
import SaleDetails from './Pages/SaleDetails';
import InventoryDetails from './Pages/InventoryDetails';

function App() {
  return (
    <IMSContext>
      <Router>
        <Routes>         
          <Route path="/" element={<Home />} />          
          <Route path="/login" element={<Login />} />          
          <Route path="/register" element={<Register />} />  
          <Route path="/verify" element={<Verify />} />  
          <Route path="/email-verification/:token" element={<Verifying />} />  
          <Route path="/inventory" element={<Inventory />} />  
          <Route path="/supplier" element={<Supplier />} />  
          <Route path="/supplier/:id" element={<SupplierDetails/>} />
          <Route path="/purchase" element={<Purchases/>} />
          <Route path="/purchase/:id" element={<PurchaseDetails/>} />
          <Route path="/sale" element={<Sale/>} />
          <Route path="/sale/:id" element={<SaleDetails/>} />
          <Route path="/report" element={<Report/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/inventory/:id" element={<InventoryDetails/>} />



          <Route path="/profile" element={<Profile />} />  
        </Routes>
      </Router>
    </IMSContext>
  );
}

export default App