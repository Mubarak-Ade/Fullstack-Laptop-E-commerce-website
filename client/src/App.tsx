import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { MainLayout } from './components/layout/MainLayout';
import { HomeSkeleton } from './components/layout/skeleton/HomeSkeleton';
import { RouteSkeleton } from './components/layout/skeleton/RouteSkeleton';
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
import { CartSkeleton } from './components/layout/skeleton/CartSkeleton';
import { CheckoutPage } from './pages/CheckoutPage';

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
                <Route id="main" path="/" Component={MainLayout} HydrateFallback={RouteSkeleton}>
                    <Route index loader={HomeSkeleton} HydrateFallback={HomeSkeleton} Component={HomePage} />
                    <Route path="/products/:slug" Component={ProductDetail} />
                    <Route path="/products" Component={ProductPage} />
                    <Route path="/carts" loader={CartSkeleton} HydrateFallback={CartSkeleton}  Component={CartPage} />
                    <Route path="/checkout" loader={CartSkeleton} HydrateFallback={CartSkeleton}  Component={CheckoutPage} />
                </Route>
                <Route path="/login" Component={Login} HydrateFallback={RouteSkeleton} />
                <Route path="/signup" Component={SignUp} HydrateFallback={RouteSkeleton} />
                <Route id="dashboard" path="dashboard" Component={DashboardLayout} HydrateFallback={RouteSkeleton}>
                    <Route index Component={ProductManagement} />
                    <Route path="/dashboard/add" Component={AddProductPage} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
