import { useEffect, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import { AdminDashboardLayout } from './components/layout/AdminDashboardLayout';
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
import { OrderPage } from './pages/OrderPage';
import { Overview } from './pages/Dashboard/Overview';
import { ProfilePage } from './pages/Dashboard/ProfilePage';
import { UserDashboardLayout } from './components/layout/UserDashboardLayout';

function App() {
    const theme = useThemeStore(s => s.theme);
    const setGuestId = useAuthStore(s => s.setGuestId);
    const identity = useAuthStore(s => s.identity);

    useEffect(() => {
        setGuestId();
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    const ProtectedRoute = ({ children }: { children: ReactNode }) => {
        return identity.type === 'user' && identity.user.token ? (
            children
        ) : (
            <Navigate to="/login" replace />
        );
    };
    const AdminRoute = ({ children }: { children: ReactNode }) => {
        return identity.type === 'user' && identity.user.role === "admin" ? (
            children
        ) : (
            <Navigate to="/" replace />
        );
    };
    return (
        <>
            <Routes>
                <Route id="main" path="/" Component={MainLayout} HydrateFallback={RouteSkeleton}>
                    <Route
                        index
                        loader={HomeSkeleton}
                        HydrateFallback={HomeSkeleton}
                        Component={HomePage}
                    />
                    <Route path="/products/:slug" Component={ProductDetail} />
                    <Route path="/products" Component={ProductPage} />
                    <Route
                        path="/carts"
                        loader={CartSkeleton}
                        HydrateFallback={CartSkeleton}
                        Component={CartPage}
                    />
                    <Route
                        path="/checkout"
                        loader={CartSkeleton}
                        HydrateFallback={CartSkeleton}
                        element={
                            <ProtectedRoute>
                                <CheckoutPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/order/:id"
                        element={
                            <ProtectedRoute>
                                <OrderPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/login" Component={Login} HydrateFallback={RouteSkeleton} />
                <Route path="/signup" Component={SignUp} HydrateFallback={RouteSkeleton} />
                <Route
                    id="admin"
                    path="admin/dashboard"
                    element={<AdminRoute><AdminDashboardLayout /></AdminRoute>}
                    HydrateFallback={RouteSkeleton}
                >
                    <Route index Component={ProductManagement} />
                    <Route path="add" Component={AddProductPage} />
                </Route>
                <Route
                    id="user"
                    path="dashboard"
                    element={<ProtectedRoute><UserDashboardLayout /></ProtectedRoute>}
                    HydrateFallback={RouteSkeleton}
                >
                    <Route index Component={Overview} />
                    <Route path="me" Component={ProfilePage} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
