import { useFilterProductStore } from '@/store/FilterProductStore';
import { priceFormat } from '@/utils/format';
import React from 'react';
import { Icon } from '../shared/Icon';
import { X } from 'lucide-react';


interface Props {
    show: boolean,
    close: () => void
}
export const FilterSideBar = ({show, close}: Props) => {
    const MIN = 100000;
    const MAX = 5000000;
    const cpus = ['INTEL Ultra i9 185H', 'INTEL Ultra i7 155H', 'Apple Silicon', 'Snapdragon X Elite'];
    const brands = ['Apple', 'Hp', 'Dell', 'Acer', 'Toshiba'];
    const storageOptions = ['128GB', '256GB', '512GB', '1TB'];
    const ramOptions = ['4GB', '8GB', '16GB', '32GB'];

    const { toggleFilter, setPrice, filter } = useFilterProductStore();
    const minValue = filter.min ?? MIN;
    const maxValue = filter.max ?? MAX;

    const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setPrice('min', value);
    };

    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setPrice('max', value);
    };

    return (
        <form className={`dark:bg-dark-surface ${show ? 'fixed inset-0 z-50' : 'lg:static lg:block hidden'} bg-light-fg h-screen overflow-auto rounded-xl p-5 max-w-xs w-full`}>
            <button onClick={close} className="absolute top-5 lg:hidden block right-5 text-secondary dark:text-white">
                <Icon icon={X} />
            </button>
            <div className="">
                <h2 className="text-xl dark:text-white font-bold">Brands</h2>
                <ul className="space-y-2 mt-5 block text-secondary">
                    {brands.map(brand => (
                        <li key={brand}>
                            <label htmlFor={brand} className="w-full">
                                <input
                                    type="checkbox"
                                    checked={filter.brands.includes(brand)}
                                    onChange={() => toggleFilter('brands', brand)}
                                    className="mr-4"
                                    name={brand}
                                    id={brand}
                                />
                                {brand}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-5">
                <h2 className="text-xl dark:text-white font-bold">CPU</h2>
                <ul className="space-y-2 mt-5 block text-secondary">
                    {cpus.map(cpu => (
                        <li key={cpu}>
                            <label htmlFor={cpu} className="w-full">
                                <input
                                    type="checkbox"
                                    checked={filter.cpu.includes(cpu)}
                                    onChange={() => toggleFilter('cpu', cpu)}
                                    className="mr-4"
                                    name={cpu}
                                    id={cpu}
                                />
                                {cpu}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-5">
                <h2 className="text-xl dark:text-white font-bold">Storage</h2>
                <ul className="space-y-2 mt-5 block text-secondary">
                    {storageOptions.map(store => (
                        <li key={store}>
                            <label htmlFor={store} className="w-full">
                                <input
                                    type="checkbox"
                                    value={store}
                                    checked={filter.storage.includes(store)}
                                    onChange={() => toggleFilter('storage', store)}
                                    className="mr-4"
                                    name={store}
                                    id={store}
                                />
                                {store}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-5">
                <h2 className="text-xl dark:text-white font-bold">RAM</h2>
                <ul className="space-y-2 mt-5 block text-secondary">
                    {ramOptions.map(ram => (
                        <li key={ram}>
                            <label htmlFor={ram} className="w-full">
                                <input
                                    type="checkbox"
                                    checked={filter.ram.includes(ram)}
                                    onChange={() => toggleFilter('ram', ram)}
                                    className="mr-4"
                                    name={ram}
                                    id={ram}
                                />
                                {ram}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-5">
                <h2 className="text-xl dark:text-white font-bold">Price Range</h2>
                <div className="">
                    <div className="flex bg-light-bg dark:bg-dark-fg h-4 rounded-full">
                        <input
                            type="range"
                            className="w-full appearance-none not-in-range:bg-primary"
                            name="min-range"
                            min={MIN}
                            max={MAX}
                            value={minValue}
                            onChange={handleMinValueChange}
                            id="min-range"
                        />
                        <input
                            type="range"
                            className="w-full appearance-none"
                            name="max-range"
                            min={MIN}
                            max={MAX}
                            onChange={handleMaxValueChange}
                            value={maxValue}
                            id="max-range"
                        />
                    </div>
                    <div className="flex mt-4 justify-between">
                        <button
                            type="button"
                            className="flex flex-col gap-1 text-secondary dark:bg-dark-fg rounded-xl bg-light-bg border-2 border-light-border px-4 py-2 text-xs font-bold dark:border-dark-border "
                        >
                            <span>MIN</span>
                            <span>{priceFormat(minValue)}</span>
                        </button>
                        <button
                            type="button"
                            className="flex flex-col gap-1 text-secondary dark:bg-dark-fg rounded-xl bg-light-bg border-2 border-light-border px-4 py-2 text-xs font-bold dark:border-dark-border "
                        >
                            <span>MAX</span>
                            <span>{priceFormat(maxValue)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
