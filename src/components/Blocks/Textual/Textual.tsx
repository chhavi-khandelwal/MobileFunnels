export interface TextualProps {
	text: string;
	color: string;
	align: 'left' | 'center' | 'right';
	classes?: string;
}

const Textual = ({ text, color, align, classes }: TextualProps) => {
	return (
		<span
			className={`text-block ${
				align === 'center'
					? 'text-center'
					: align === 'left'
					? 'text-left'
					: 'text-right'
			} text-3xl font-bold w-full ${classes}`}
			aria-label={text}
			style={{ color }}
		>
			{text}
		</span>
	);
};

export default Textual;
