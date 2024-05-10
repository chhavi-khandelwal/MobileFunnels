import React from 'react';
import CrossIcon from '../../assets/Cross';

interface FileUploadButtonProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
	data: any;
	onFileRemove: () => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
	onChange,
	onClick,
	data,
	onFileRemove,
}) => {
	return (
		<>
			<input
				type='file'
				className='hidden'
				accept='.json'
				onChange={onChange}
				aria-label='Upload JSON file'
				onClick={onClick}
				id='fileInput'
			/>
			<label
				htmlFor='fileInput'
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg cursor-pointer'
			>
				Choose JSON file
			</label>
			{data && (
				<button
					className=' bg-gray-400 hover:bg-gray-700 text-white font-bold p-1 rounded-full shadow-lg cursor-pointer'
					onClick={onFileRemove}
					aria-label='Remove file'
				>
					<CrossIcon />
				</button>
			)}
		</>
	);
};

export default FileUploadButton;
