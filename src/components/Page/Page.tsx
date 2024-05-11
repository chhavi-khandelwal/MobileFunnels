import Textual, { TextualProps } from '../Blocks/Textual/Textual';
import Image, { ImageProps } from '../Blocks/Image/Image';
import Button, { ButtonProps } from '../Blocks/Button/Button';
import List, { ListProps } from '../Blocks/List/List';
import ChevronDoubleDownIcon from '../../assets/ChevronDoubleDown';
import { useRef } from 'react';
import { Resolution } from '../FunnelPreview/FunnelPreview';

export type PageBlockProps =
	| (ButtonProps & { type: 'button'; id: string })
	| (ImageProps & { type: 'image'; id: string })
	| (ListProps & { type: 'list'; id: string })
	| (TextualProps & { type: 'text'; id: string });

interface PageProps {
	index: number;
	blocks: PageBlockProps[];
}

interface ChevroIconProps {
	onClick: () => void;
	ariaLabel: string;
	facingUp?: boolean;
}

const PageContent = ({ block }: { block: PageBlockProps }) => {
	let content = null;

	switch (block.type) {
		case 'text':
			content = (
				<Textual
					key={block.id}
					{...block}
				/>
			);
			break;
		case 'image':
			content = (
				<Image
					key={block.id}
					{...block}
				/>
			);
			break;
		case 'button':
			content = (
				<Button
					key={block.id}
					{...block}
				/>
			);
			break;
		case 'list':
			content = (
				<List
					key={block.id}
					{...block}
				/>
			);
			break;
		default:
			content = null;
			break;
	}
	return content;
};

const ChevronIcon = ({ onClick, ariaLabel, facingUp }: ChevroIconProps) => {
	return (
		<button
			className={`absolute ${
				facingUp ? ' rotate-180 top-1 ' : ' bottom-1'
			} flex items-center justify-center text-gray-400 h-8 w-8 rounded-full z-10`}
			onClick={onClick}
			aria-label={ariaLabel}
			style={{ left: 'calc(50% - 16px)' }}
		>
			<ChevronDoubleDownIcon />
		</button>
	);
};

const Page = ({ blocks, index }: PageProps) => {
	const allBlocks = blocks.map(() => useRef<HTMLDivElement>(null));

	const scrollIntoViewOnChevronClick = (index: number) => {
		allBlocks[index].current?.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<div
			className='overflow-auto w-full h-full'
			role='region'
			aria-label={`Page ${index + 1}`}
		>
			{blocks.map((block, index) => {
				return (
					<div
						key={block.id}
						className='flex w-full h-auto items-center py-5 relative gap-1'
						style={{ width: Resolution.width, minHeight: Resolution.height }}
						ref={allBlocks[index]}
					>
						{index > 0 && (
							<ChevronIcon
								onClick={() => {
									scrollIntoViewOnChevronClick(index - 1);
								}}
								ariaLabel='Previous page'
								facingUp
							/>
						)}
						<PageContent block={block} />
						{index < blocks.length - 1 && (
							<ChevronIcon
								onClick={() => {
									scrollIntoViewOnChevronClick(index + 1);
								}}
								ariaLabel='Next page'
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Page;
