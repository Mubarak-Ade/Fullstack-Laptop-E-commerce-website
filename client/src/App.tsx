import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { MainLayout } from './components/layout/MainLayout';
import { HomeSkeleton } from './components/layout/skeleton/HomeSkeleton';
import { Login } from './pages/AuthPages/Login';
import { SignUp } from './pages/AuthPages/SignUp';
import { CartPage } from './pages/CartPage';
import { AddProductPage } from './pages/Dashboard/AddProductPage';
import { ProductManagement } from './pages/Dashboard/ProductManagement';
import { HomePage } from './pages/HomePage';
import { ProductDetail } from './pages/ProductDetail';
import { ProductPage } from './pages/ProductPage';
import { useAuthStore } from './store/AuthStore';
import { useThemeStore } from './store/ThemeStore';

function App() {
    const theme = useThemeStore(s => s.theme);
    const setGuestId = useAuthStore(s => s.setGuestId);

    useEffect(() => {
        setGuestId();
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <>
            <Routes>
                <Route id="main" path="/" Component={MainLayout}>
                    <Route index loader={HomeSkeleton} Component={HomePage} />
                    <Route path="/products/:slug" Component={ProductDetail} />
                    <Route path="/products" Component={ProductPage} />
                    <Route path="/carts" Component={CartPage} />
                </Route>
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={SignUp} />
                <Route id="dashboard" path="dashboard" Component={DashboardLayout}>
                    <Route index Component={ProductManagement} />
                    <Route path="/dashboard/add" Component={AddProductPage} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
