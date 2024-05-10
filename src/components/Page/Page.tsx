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

const Page = ({ blocks, index }: PageProps) => {
	const allBlocks = blocks.map(() => useRef<HTMLDivElement>(null));
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
							<button
								className='absolute rotate-180 top-1 flex items-center justify-center bg-gray-400 hover:bg-gray-500 bg-opacity-50 text-white h-8 w-8 rounded-full z-10'
								onClick={() => {
									allBlocks[index - 1].current?.scrollIntoView({
										behavior: 'smooth',
									});
								}}
								aria-label='Previous slide'
								style={{ left: 'calc(50% - 16px)' }}
							>
								<ChevronDoubleDownIcon />
							</button>
						)}
						<PageContent block={block} />
						{index < blocks.length - 1 && (
							<button
								className='absolute bottom-1 flex items-center justify-center bg-gray-400 bg-opacity-50 hover:bg-gray-500 text-white h-8 w-8 rounded-full z-10'
								onClick={() => {
									allBlocks[index + 1].current?.scrollIntoView({
										behavior: 'smooth',
									});
								}}
								aria-label='Previous slide'
								style={{ left: 'calc(50% - 16px)' }}
							>
								<ChevronDoubleDownIcon />
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Page;
