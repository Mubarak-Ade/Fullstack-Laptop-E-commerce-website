import {motion} from 'motion/react'
import {NavLink, useNavigate} from 'react-router'
import {Icon} from './Icon'
import {Heart,Moon,Search,ShoppingCart,Star,User} from 'lucide-react'
import {useEffect,useState} from 'react'
import {useThemeStore} from '@/store/ThemeStore'
import {useProductStore} from '@/store/ProductStore'

const links=[
    {name: "Home",link: "/"},
    {name: "Laptops",link: "products"},
    {name: "Accessories",link: "access"},
]

const Link=motion.create(NavLink)

export const Navbar=() => {

    const navigate = useNavigate()
    const [isFixed,setIsFixed]=useState<boolean>(false)
    const cart = useProductStore(s => s.cart)

    const {theme,toggleTheme}=useThemeStore()

    useEffect(() => {
        const handleScroll=() => {
            if(window.scrollY>=10) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }
        window.addEventListener("scroll",handleScroll)

    },[isFixed])


    return (
        <header className={`flex ${isFixed? "fixed top-0 shadow-2xl":"static"} z-50 w-full bg-light-bg/3 backdrop-blur-md border-b dark:border-dark-border border-light-border justify-between items-center px-8 py-4`}>
            <div className="">
                <h1 className='text-4xl font dark:text-light-bg font-semibold'>SHINA<span className='text-primary'>STORE</span></h1>
            </div>
            <ul className='lg:flex hidden gap-5'>
                {links.map(link => (
                    <Link
                        whileHover={{
                            color: "var(--color-primary)",
                        }}
                        className="text-base px-2 text-secondary flex flex-col " key={link.name} to={link.link}>
                        {link.name}
                    </Link>
                ))}
            </ul>
            <div className="lg:flex hidden items-center gap-4 bg-light-fg dark:bg-dark-accent dark:text-secondary pl-4 overflow-hidden rounded-full max-w-xs w-full">
                <Icon icon={Search} />

                <input type="text" placeholder='Search for laptops and accessories' className='text-sm outline-0 py-3 w-full h-full' />
            </div>
            <div className="flex gap-4 w-20 h-10 relative bg-light-fg dark:bg-dark-fg shadow-2xl px-2 py-1 overflow-hidden rounded-full border dark:border-light-border border-dark-border items-center">
                <button onClick={toggleTheme} className={`p-2 ${theme==="light"? "left-0":"right-0"} absolute className='fill-coral-black' bg-dark-fg text-light-bg dark:text-dark-bg dark:bg-light-fg rounded-full text-light-soft`}>
                    {theme==="light"? <Icon icon={Moon} />:<Icon icon={Star} />}
                </button>
            </div>
            <div className="flex  dark:text-dark-text-primary gap-6">
                <button onClick={() => navigate("/carts")} className='relative'>
                    <span className='absolute text-white -right-2 -top-2 bg-primary size-5 font-bold block rounded-full text-sm'>{cart.length}</span>
                    <Icon icon={ShoppingCart} className='fill-coral-black dark:fill-none dark:text-light-bg' />
                </button>
                <button>
                    <Icon icon={Heart} className='fill-coral-black dark:fill-none dark:text-light-bg' />
                </button>
                <button>
                    <Icon icon={User} className='fill-coral-black dark:fill-none dark:text-light-bg' />
                </button>
            </div>
        </header>
    )
}
