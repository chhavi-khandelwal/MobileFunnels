import { Resolution } from '../../FunnelPreview/FunnelPreview';

export interface ButtonProps {
	color: string;
	text: string;
	bgColor: string;
}

const Button = ({ text, color, bgColor }: ButtonProps) => {
	return (
		<div className='m-auto flex items-center justify-center'>
			<button
				type='button'
				aria-label={text}
				title={text}
				className='h-12 rounded-md py-2 px-4 truncate text-xl font-bold'
				style={{
					color,
					backgroundColor: bgColor,
					maxWidth: Resolution.paddedWidth,
				}}
			>
				{text}
			</button>
		</div>
	);
};

export default Button;
