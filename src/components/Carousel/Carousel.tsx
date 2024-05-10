import { useState } from 'react';
import ChevronLeftIcon from '../../assets/ChevronLeft';
import ChevronRightIcon from '../../assets/ChevronRight';

interface CarouselProps {
	items: JSX.Element[];
}

const Carousel = ({ items }: CarouselProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === items.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? items.length - 1 : prevIndex - 1
		);
	};

	return (
		<div
			className='overflow-hidden w-full h-full'
			aria-live='polite'
		>
			<div
				className='flex w-full h-full transition-transform duration-500 linear'
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{items.map((item, index) => (
					<div
						key={index}
						className='w-full full'
						aria-hidden={index !== currentIndex}
					>
						{item}
					</div>
				))}
			</div>
			{currentIndex > 0 && (
				<button
					className='absolute left-0 flex items-center justify-start bg-gray-400 hover:bg-gray-500 bg-opacity-50 text-white h-20 w-10 inset-y-1/2 z-10 rounded-r-full'
					onClick={prevSlide}
					aria-label='Previous slide'
				>
					<ChevronLeftIcon />
				</button>
			)}
			{currentIndex < items.length - 1 && (
				<button
					className='absolute right-0 flex items-center justify-end bg-gray-400 hover:bg-gray-500 bg-opacity-50 text-white  h-20 w-10 inset-y-1/2 z-10 rounded-l-full'
					onClick={nextSlide}
					aria-label='Next slide'
				>
					<ChevronRightIcon />
				</button>
			)}
		</div>
	);
};

export default Carousel;
