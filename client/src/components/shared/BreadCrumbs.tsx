import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import {Icon} from "./Icon";

const BreadCrumbs = () => {
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="flex flex-wrap dark:text-dark-text-primary items-center px-4 py-2 space-x text-sm">
            <ol className="flex text-sm items-center text-secondary font-alata gap-2">
                <li className="flex justify-center gap-2 items-center">
                    <Link to="/">Home</Link>
                    <span className="">
                        <Icon icon={ChevronRight} />
                    </span>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li key={to}>
                            {isLast ? (
                                <span className="text-custom">
                                    {decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
                                </span>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <Link to={to}>
                                    {decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
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
