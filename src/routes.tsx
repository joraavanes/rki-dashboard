import * as React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
 } from 'react-router-dom'
import Dashboard from './containers/Dashboard';
import Navbar from './components/Navbar';

export const AppRoutes: React.FC = () => {
    return (
    <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        </Routes>
    </Router>);
};