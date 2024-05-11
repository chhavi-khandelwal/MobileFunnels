import { useMemo } from 'react';
import Carousel from '../Carousel/Carousel';
import { FunnelData } from '../MainScreen/MainScreen';
import Page from '../Page/Page';

export const Resolution = {
	width: '365px',
	height: '600px',
	paddedWidth: '355px',
};

interface FunnelPreviewProps {
	funnels: FunnelData | null;
	funnelMessage: string;
	setError: (message: string) => void;
}

const FunnelPreview = ({
	funnels,
	funnelMessage,
	setError,
}: FunnelPreviewProps) => {
	const getCarouselItems = () => {
		if (funnels && !funnels?.pages) {
			setError('File is not in proper format');
			return;
		}
		return funnels?.pages.map((page, index) => (
			<Page
				index={index}
				blocks={page.blocks}
				key={page.id}
			/>
		));
	};
	const carouseItems = useMemo(() => getCarouselItems(), [funnels]);

	return (
		<div className='mobile-container border-4 border-slate-800 rounded-3xl shadow-lg relative mt-4'>
			<div style={Resolution}>
				{carouseItems?.length && <Carousel items={carouseItems} />}

				{funnelMessage && (
					<div className='w-full h-full flex items-center justify-center font-bold text-slate-700 bg-slate-50 rounded-3xl'>
						{funnelMessage}
					</div>
				)}
			</div>
		</div>
	);
};

export default FunnelPreview;
