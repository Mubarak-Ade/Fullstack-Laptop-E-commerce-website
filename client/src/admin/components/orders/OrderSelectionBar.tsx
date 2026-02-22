import { useDeleteManyOrders } from '@/admin/features/orders/hooks';
import { Icon } from '@/components/shared/Icon';
import { useMutation } from '@tanstack/react-query';
import { EditIcon, Trash2, X, XCircle } from 'lucide-react';
import { motion, type Variants } from 'motion/react';

type SelectedOrdersBarProps = {
    selectedCount: number;
    onClear: () => void;
    variants: Variants;
    showModal: (type: "updateStatus" | "deleteMany") => void;
};

export const SelectedOrdersBar = ({
    selectedCount,
    onClear,
    variants,
    showModal,
}: SelectedOrdersBarProps) => {

    if (selectedCount === 0) return null;

    

    return (
        <div className="max-w-4xl gap-5 z-40 items-center p-5 text-white w-full shadow-[0_0_45px] shadow-black/50 h-20 fixed bg-primary bottom-10 left-1/2 -translate-x-1/2 rounded-xl flex ">
            <h4 className="font-bold flex-1 flex gap-2  items-center border-r-2">
                <span className="text-primary bg-white rounded-full text-xl mr-2 flex items-center justify-center size-10">
                    {selectedCount}
                </span>{' '}
                Order Selected
            </h4>
            <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => showModal("updateStatus")}
                className="flex gap-1 font-semibold cursor-pointer border py-3 px-4 rounded-xl border-white/20 items-center"
            >
                <Icon icon={EditIcon} />
                <span>Change Status</span>
            </motion.button>
            <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => showModal("deleteMany")}
                className="flex gap-1 font-semibold cursor-pointer border py-3 px-4 rounded-xl border-white/20 items-center"
            >
                <Icon icon={Trash2} />
                <span>Delete Order</span>
            </motion.button>
            <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                className="flex gap-1 font-semibold cursor-pointer border py-3 px-4 rounded-xl border-white/20 items-center"
            >
                <Icon icon={XCircle} />
                <span>Cancel Order</span>
            </motion.button>

            <button onClick={onClear}>
                <Icon icon={X} />
            </button>
        </div>
    );
};
