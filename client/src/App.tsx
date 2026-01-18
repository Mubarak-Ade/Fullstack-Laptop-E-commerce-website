import {useEffect} from 'react';
import {Route, Routes} from 'react-router';
import './App.css';
import {DashboardLayout} from './components/layout/DashboardLayout';
import {MainLayout} from './components/layout/MainLayout';
import {CartPage} from './pages/CartPage';
import {AddProductPage} from './pages/Dashboard/AddProductPage';
import {ProductManagement} from './pages/Dashboard/ProductManagement';
import {HomePage} from './pages/HomePage';
import {ProductDetail} from './pages/ProductDetail';
import {ProductPage} from './pages/ProductPage';
import {useThemeStore} from './store/ThemeStore';

function App () {

	const theme=useThemeStore(s => s.theme)

	useEffect(() => {
		const root=document.documentElement;
		root.classList.remove("light", "dark")
		root.classList.add(theme)
	}, [theme])

	return (
		<>
			<Routes>
				<Route id='main' path='/' Component={MainLayout}>
					<Route index Component={HomePage} />
					<Route path='/products/:slug' Component={ProductDetail} />
					<Route path='/products' Component={ProductPage} />
					<Route path='/carts' Component={CartPage} />
				</Route>
				<Route id='dashboard' path='dashboard' Component={DashboardLayout}>
					<Route index Component={ProductManagement} />
					<Route path='/dashboard/add' Component={AddProductPage} />
				</Route>
			</Routes>
		</>
	)
}

export default App
