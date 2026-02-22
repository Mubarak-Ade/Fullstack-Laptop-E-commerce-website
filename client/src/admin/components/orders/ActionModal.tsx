import { useDeleteManyOrders, useUpdateManyOrderStatus } from '@/admin/features/orders/hooks';
import { Icon } from '@/components/shared/Icon';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/context/ToastContext';
import { status } from '@/utils/constants';
import { resolveStatus } from '@/utils/format';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Props {
    // You can add props here if needed, such as a callback for when the status is updated
    selectedRows: string[];
    closeModal: () => void;
}

export const ConfirmationModal: React.FC<Props> = ({ selectedRows, closeModal }) => {
    const deleteOrders = useMutation(useDeleteManyOrders());
    const { showToast } = useToast();

    const handleDeleteOrders = () => {
        deleteOrders.mutate(selectedRows, {
            onSuccess: () => {
                showToast('success', 'Orders deleted successfully');
                closeModal();
            },
            onError: error => {
                showToast('error', error.message || 'Failed to delete orders');
                console.error('Failed to delete orders:', error);
            },
        });
    };

    return (
        <div className="">
            <div className="w-full  h-screen fixed top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-light-fg relative dark:bg-dark-bg rounded-xl w-full max-w-md">
                    <div className="border-b border-gray-300 dark:border-gray-600 p-5 mb-4">
                        <h2 className="text-xl font-medium text-black dark:text-white mb-2">
                            Confirm Delete Orders
                        </h2>
                    </div>
                    <div className="">
                        <p className="text-sm text-secondary dark:text-gray-400 p-5 mb-4">
                            Are you sure you want to delete {selectedRows.length} selected orders?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-5 border-t border-gray-300 dark:border-gray-600 p-5">
                            <button
                                onClick={closeModal}
                                className="px-4 py-3 cursor-pointer bg-gray-300 dark:bg-gray-600 text-sm rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteOrders}
                                className="px-4 py-3 cursor-pointer bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                            >
                                Delete Orders
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <Icon icon={X} />
                    </button>
                </div>
            </div>{' '}
        </div>
    );
};

export const UpdateStatusModal: React.FC<Props> = ({ selectedRows, closeModal }) => {
    const updateStatuses = useMutation(useUpdateManyOrderStatus());
    const [selectedStatus, setSelectedStatus] = useState<(typeof status)[number] | null>(null);
    const { showToast } = useToast();

    const handleStatusChange = () => {
        if (!selectedStatus) {
            showToast('error', 'Please select a status to update');
            return;
        }
        updateStatuses.mutate(
            { orderIds: selectedRows, status: selectedStatus },
            {
                onSuccess: () => {
                    showToast('success', 'Order statuses updated successfully');
                    closeModal();
                },
                onError: error => {
                    showToast('error', error.message || 'Failed to update order statuses');
                },
            }
        );
    };

    return (
        <div className="w-full  h-screen fixed top-0 left-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-light-fg relative dark:bg-dark-bg rounded-xl w-full max-w-md">
                <div className="border-b border-gray-300 dark:border-gray-600 p-5 mb-4">
                    <h2 className="text-xl font-medium text-black dark:text-white mb-2">
                        Batch Update Status
                    </h2>
                    <h4 className="text-sm text-secondary dark:text-gray-400">
                        Updating {selectedRows.length} Selected Orders.
                    </h4>
                </div>
                <div className="">
                    <div className="mb-4 p-5">
                        <label
                            htmlFor="status"
                            className="block font-semibold text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Select New Status
                        </label>
                        <Select
                            value={selectedStatus ?? undefined}
                            onValueChange={value =>
                                setSelectedStatus(value as (typeof status)[number])
                            }
                        >
                            <SelectTrigger className="py-6 rounded-xl border border-primary bg-light-bg dark:bg-dark-bg text-black dark:text-white mt-4 w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-light-bg cursor-pointer dark:bg-dark-bg border border-primary rounded-xl shadow-lg text-white shadow-light-fg dark:shadow-dark-bg">
                                {status.map(orderStatus => (
                                    <SelectItem key={orderStatus} value={orderStatus}>
                                        {resolveStatus(orderStatus).label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end gap-3 mt-5 border-t border-gray-300 dark:border-gray-600 p-5">
                        <button
                            onClick={closeModal}
                            className="px-4 py-3 cursor-pointer bg-gray-300 dark:bg-gray-600 text-sm rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleStatusChange}
                            className="px-4 py-3 cursor-pointer bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                        >
                            Update Status
                        </button>
                    </div>
                </div>
                <button
                    onClick={closeModal}
                    className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    <Icon icon={X} />
                </button>
            </div>
        </div>
    );
};
