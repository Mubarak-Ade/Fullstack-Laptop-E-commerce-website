import { OrderSummary } from '@/components/Order/OrderSummary';
import { TrackOrder } from '@/components/Order/TrackOrder';
import { Icon } from '@/components/shared/Icon';
import { useOrder } from '@/features/order/hooks';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2Icon, CreditCard, MailQuestionMarkIcon, MapPin, MessageCircleQuestionMark } from 'lucide-react';
import { useParams } from 'react-router';

export const OrderPage = () => {

    const {id} = useParams()

    const {data: order, isLoading} = useQuery(useOrder(id as string))

    if (isLoading) {
        return <p></p>
    }    


    return (
        <div className="dark:bg-dark-bg bg-light-fg p-10">
            <div className="flex flex-col items-center justify-center w-full p-5 text-center">
                <span className="flex flex-col items-center justify-center gap-5 text-success bg-success/10 rounded-full size-15">
                    <Icon icon={CheckCircle2Icon} size={40} />
                </span>
                <h1 className="text-3xl font-bold dark:text-white text-coral-black mt-4">
                    Thank You For Your Order
                </h1>
                <h4 className="mt-2 text-secondary ">
                    Order #SHN-992834 . We've Sent a confirmation email to your registered email
                    address.
                </h4>
            </div>

            <div className="max-w-6xl w-full m-auto flex lg:flex-row flex-col mt-10 gap-10">
                <div className="max-w-2xl w-full h-full space-y-5">
                    <TrackOrder status={order.status} date={order.updatedAt} />
                    <OrderSummary products={order.products} shippingFee={order.shippingFee} subTotal={order.subTotal} tax={order.tax} total={order.total} />
                </div>
                <div className="">
                    <div className="bg-light-bg dark:bg-dark-surface p-5 rounded-xl shadow-lg shadow-light-fg dark:shadow-dark-bg w-full">
                        <h4 className='flex gap-2 font-bold items-center text-black dark:text-white'> <Icon icon={MapPin} className='text-primary' /> Shipping Address</h4>
                        <div className="text-secondary mt-5 space-y-1">
                            <h4 className='font-bold text-black dark:text-white'>Jane Doe</h4>
                            <p>123 Tech Avaneu Street</p>
                            <p>Sans Fransisco C1355</p>
                            <p>United States</p>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="bg-light-bg mt-5 dark:bg-dark-surface p-5 rounded-xl shadow-lg shadow-light-fg dark:shadow-dark-bg w-full">
                        <h4 className='flex gap-2 text-base font-bold items-center text-black dark:text-white'> <Icon icon={CreditCard} className='text-primary' /> Payment Method</h4>
                        <div className="text-secondary mt-5 flex items-center gap-5">
                            <span className="text-primary italic font-bold text-sm rounded bg-primary/20 px-2 py-1">VISA</span>
                            <div className="">
                                <h4 className='font-bold text-black dark:text-white'>Visa Ending in 4242</h4>
                                <p>Total Charged: $129.99</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary/20 border border-primary p-5 rounded-xl mt-5"> 
                        <h4 className='font-bold text-primary'>Need Help?</h4>
                        <p className='text-primary text-sm'>Contact our support team at support@laptopstore.com or call 1-800-LAPTOP</p>
                        <div className="mt-2 text-sm space-y-1">
                            <p className='flex items-center gap-2 text-black dark:text-white'><Icon icon={MailQuestionMarkIcon} /> Visit Help Center</p>
                            <p className='flex items-center gap-2 text-black dark:text-white'><Icon icon={MessageCircleQuestionMark} /> Live Chat</p>
                        </div>
                    </div>

                    <button className="bg-white dark:bg-dark-surface border border-primary text-primary py-3 px-5 rounded-xl w-full mt-5 font-semibold">Continue Shopping</button>
                </div>
            </div>
        </div>
    );
};
