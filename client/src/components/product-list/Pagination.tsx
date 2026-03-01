import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationBarProps) {
    const goToPrevPage = () => {
        onPageChange(currentPage === 1 ? totalPages : currentPage - 1);
    };

    const goToNextPage = () => {
        onPageChange(currentPage === totalPages ? 1 : currentPage + 1);
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="ml-4 cursor-pointer text-black dark:text-white">
                    <PaginationPrevious onClick={goToPrevPage} />
                </PaginationItem>
                {pages.map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currentPage}
                            className={page === currentPage ? 'bg-primary text-white' : 'text-black dark:text-white'}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem className="mr-4 cursor-pointer text-black dark:text-white">
                    <PaginationNext onClick={goToNextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
