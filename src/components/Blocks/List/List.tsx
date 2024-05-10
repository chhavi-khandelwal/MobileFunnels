import Accordion from '../../Accordion/Accordion';
import Textual from '../Textual/Textual';

interface ListItemProps {
	id: string;
	title: string;
	description: string;
	src: string;
}

const ListItem = ({ title, description, src }: ListItemProps) => {
	return (
		<div
			role='list-item'
			aria-label={title}
			className='flex items-center justify-start p-5 flex-col'
		>
			<Accordion title={title}>
				<div className='flex items-center justify-center flex-col bg-slate-50 py-5 rounded-lg mt-2'>
					<div className='rounded-md px-5'>
						<img
							src={src}
							alt={title}
							role='img'
							className='object-contain cursor-pointer'
						/>
					</div>
					<Textual
						color=''
						align='center'
						text={description}
						classes='text-slate-600 text-base font-medium'
					/>
				</div>
			</Accordion>
		</div>
	);
};

export interface ListProps {
	items: ListItemProps[];
}

const List = ({ items }: ListProps) => {
	return (
		<div
			className='w-full flex flex-col items-center'
			role='list'
		>
			{items.map((item) => (
				<ListItem
					key={item.id}
					{...item}
				/>
			))}
		</div>
	);
};

export default List;
