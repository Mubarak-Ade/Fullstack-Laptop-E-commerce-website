import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../Icon';
import { useSearchStore } from '@/store/SearchStore';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

export const NavbarSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const { query, setQuery, open, close } = useSearchStore();
    const [value, setValue] = useState(query);
    const isSearchPage = location.pathname === '/search';

    useEffect(() => {
        setValue(query);
    }, [query]);

    useEffect(() => {
        if (isSearchPage) {
            const q = params.get('q') ?? '';
            setValue(q);
            setQuery(q);
            return;
        }

        close();
    }, [close, isSearchPage, params, setQuery]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const keyword = value.trim();
        setQuery(keyword);
        close();

        if (!keyword) {
            navigate('/search');
            return;
        }

        navigate(`/search?q=${encodeURIComponent(keyword)}`);
    };

    const handleFocus = () => {
        if (value.trim()) {
            open();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            close();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        setValue(nextValue);
        setQuery(nextValue);

        if (nextValue.trim()) {
            open();
        } else {
            close();
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-xs items-center gap-4 overflow-hidden rounded-full bg-light-fg pl-4 dark:bg-dark-accent dark:text-secondary flex"
        >
            <Icon icon={Search} />
            <motion.input
                type="text"
                value={value}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                placeholder="Search for laptops and accessories"
                className="h-full w-full py-3 md:text-sm text-xs outline-0"
            />
        </motion.form>
    );
};
