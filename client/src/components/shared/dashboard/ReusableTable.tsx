import { useTableSelectionStore } from '@/admin/store/TableStore';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    type PaginationState,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Table } from 'lucide-react';

interface TableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];

    pageCount?: number;
    pagination?: PaginationState;
    onPaginationChange?: (
        updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => void;
    isLoading?: boolean;
}

export const ReusableTable = <T,>({
    columns,
    data,
    pageCount = 1,
    pagination,
    onPaginationChange,
    isLoading,
}: TableProps<T>) => {
    const { selectedIds, setSelectedIds } = useTableSelectionStore();
    const tableColumns: ColumnDef<T>[] = [...columns];
    const safePagination: PaginationState = pagination ?? { pageIndex: 0, pageSize: 10 };
    const table = useReactTable<T>({
        data: data ?? [],
        columns: tableColumns,
        manualPagination: true,
        manualSorting: true,
        pageCount: pageCount,
        state: {
            rowSelection: Object.fromEntries(Array.from(selectedIds).map(id => [id, true])),
            pagination: safePagination,
        },
        enableRowSelection: true,
        onPaginationChange,
        getRowId: (row: any) => row._id, // Assuming each row has a unique _id field
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: updater => {
            const newSelection =
                typeof updater === 'function' ? updater(table.getState().rowSelection) : updater;

            setSelectedIds(new Set(Object.keys(newSelection)));
        },
    });

    return (
        <div className="w-full  space-y-4">
            <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border">
                <Table className="max-w-5xl w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow
                                className="bg-light-fg dark:bg-dark-surface border-b border-light-border dark:border-dark-border hover:border-light-border/50 hover:dark:border-dark-border/50"
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map(header => (
                                    <TableHead
                                        key={header.id}
                                        className="px-6 py-4 text-secondary font-semibold text-xs uppercase tracking-wide"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center py-12 text-secondary/60"
                                >
                                    Loading orders...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    className="border-b border-light-border dark:border-dark-border transition-colors duration-200"
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-6 py-4 text-coral-black dark:text-white"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center py-10 text-secondary/60"
                                >
                                    No results found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4">
                <div className="text-sm text-secondary/80">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={event => table.setPageSize(Number(event.target.value))}
                        disabled={isLoading}
                        className="h-9 rounded-lg border border-light-border dark:border-dark-border bg-transparent px-2 text-sm text-secondary outline-none"
                    >
                        {[5, 10, 20, 50].map(size => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={isLoading || !table.getCanPreviousPage()}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-btn/30 text-secondary hover:bg-secondary-btn/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={isLoading || !table.getCanNextPage()}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-btn/30 text-secondary hover:bg-secondary-btn/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
