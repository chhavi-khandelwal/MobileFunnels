import React, { ReactNode, useState } from 'react';

type AccordionProps = {
	title: string;
	children: ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<h3
				className='cursor-pointer text-3xl font-bold text-slate-600 hover:text-gray-800'
				onClick={toggleAccordion}
			>
				{title}
			</h3>
			<div
				className={`overflow-hidden transition-[max-height] duration-500 ease-in ${
					isOpen ? 'max-h-screen' : 'max-h-0'
				}`}
			>
				{children}
			</div>
		</>
	);
};

export default Accordion;
