import BreadCrumbs from '../shared/BreadCrumbs'
import { SidebarTrigger } from '../ui/sidebar';

interface Props {
	title: string,
	actions?: React.ReactNode
}

export const DashboardHeader=({title="Title",actions}: Props) => {
	return (
		<div className='py-2 px-4 border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-surface'>
			<BreadCrumbs />
			<div className="flex px-4 items-center justify-between">
				<div className="flex gap-2 items-center">
					<SidebarTrigger className='text-white cursor-pointer' size={"icon-lg"} />
					<h1 className='text-4xl font-bold dark:text-white text-black '>{title}</h1>
				</div>
				<div className="flex gap-5">
					{actions}
				</div>
			</div>
		</div>
	)
}
