export interface ImageProps {
	src: string;
	alt: string;
}

const Image = ({ src, alt }: ImageProps) => {
	return (
		<div
			className='image-block p-2'
			role='img'
			aria-label={alt}
		>
			<img
				src={src}
				alt={alt}
				className='object-contain h-full w-full rounded-lg'
			/>
		</div>
	);
};

export default Image;
