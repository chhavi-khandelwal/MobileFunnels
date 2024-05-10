import React, { useMemo, useState } from 'react';

import { PageBlockProps } from '../Page/Page';
import FileUploadButton from '../FileUploadButton/FileUploadButton';
import FunnelScreen from '../FunnelPreview/FunnelPreview';

interface FunnelPage {
	id: string;
	blocks: PageBlockProps[];
}

export interface FunnelData {
	name: string;
	bgColor: string;
	pages: FunnelPage[];
}

const MainScreen: React.FC = () => {
	const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		const file = event.target.files && event.target.files[0];
		if (file) {
			if (file.type !== 'application/json') {
				setError('Please upload a JSON file.');
				setFunnelData(null); // Reset funnel data
				setLoading(false);
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const content = e.target?.result as string;
					const data = JSON.parse(content) as FunnelData;
					setFunnelData(data);
					setLoading(false);
					setError(null);
				} catch (e) {
					setLoading(false);
					setError('Incorrect file format');
					setFunnelData(null);
				}
			};
			reader.readAsText(file);
		}
	};

	const handleRemoveFile = () => {
		setFunnelData(null);
		setError(null);
	};

	const funnelMessage = useMemo(() => {
		if (error) {
			return error;
		} else if (!funnelData && !loading) {
			return 'Upload file to create funnels';
		} else if (loading) {
			return 'Loading funnels';
		} else {
			return '';
		}
	}, [loading, error, funnelData]);

	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
		e.currentTarget.value = '';
		setError('');
		setLoading(true);
	};

	return (
		<div className='h-screen flex flex-col items-center justify-center'>
			<div className='flex gap-2 items-center justify-center'>
				<FileUploadButton
					onChange={handleFileChange}
					onClick={handleClick}
					onFileRemove={handleRemoveFile}
					data={funnelData}
				/>
			</div>

			<FunnelScreen
				funnelMessage={funnelMessage}
				funnels={funnelData}
				setError={setError}
			/>
		</div>
	);
};

export default MainScreen;
