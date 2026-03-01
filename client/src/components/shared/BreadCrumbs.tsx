import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Icon } from './Icon';

const BreadCrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const formatSegment = (value: string) =>
        decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1));

    return (
        <nav className="flex flex-wrap dark:text-dark-text-primary items-center text-sm">
            <ol className="flex text-sm items-center text-secondary font-alata gap-2">
                <li className="flex justify-center gap-2 items-center">
                    <Link to="/">Home</Link>
                    <span className="">
                        <Icon icon={ChevronRight} />
                    </span>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const label = formatSegment(value);

                    return (
                        <li key={to}>
                            {isLast ? (
                                <span className="text-custom">{label}</span>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Link to={to}>
                                        {label}
                                    </Link>
                                    <span className="text-2xl">
                                        <ChevronRight />
                                    </span>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
