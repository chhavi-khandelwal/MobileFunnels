import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainScreen from './MainScreen';

const FunnelData =
	'{"name":"Test Funnel","bgColor":"#FFFFFF","pages":[{"id": "b6b05e20d3a1486585bb889b3c5b6e9f","blocks": [{"id" : "b5e08d664867419a85c40d333ca4a00e","type": "text","text": "Welcome!","color": "#202020","align": "center"}]}]}';

describe('Main Screen', () => {
	test('renders upload file button', () => {
		render(<MainScreen />);
		const uploadButton = screen.getByLabelText('Upload JSON file');
		expect(uploadButton).toBeInTheDocument();
	});

	test('renders correct message after uploading a JSON file', async () => {
		render(<MainScreen />);
		const uploadButton = screen.getByLabelText('Upload JSON file');

		const file = new File([FunnelData], 'test.json', {
			type: 'application/json',
		});

		fireEvent.change(uploadButton, { target: { files: [file] } });

		await waitFor(() => {
			const message = screen.getByText('Welcome!');
			expect(message).toBeInTheDocument();
		});
	});

	test('renders error message for incorrect file format', async () => {
		render(<MainScreen />);
		const uploadButton = screen.getByLabelText('Upload JSON file');

		const file = new File(['invalid content'], 'test.txt', {
			type: 'text/plain',
		});

		fireEvent.change(uploadButton, { target: { files: [file] } });

		await waitFor(() => {
			const errorMessage = screen.getByText('Please upload a JSON file.');
			expect(errorMessage).toBeInTheDocument();
		});
	});

	test('renders error message for incorrect file content', async () => {
		render(<MainScreen />);
		const uploadButton = screen.getByLabelText('Upload JSON file');

		const file = new File(['invalid JSON content'], 'test.json', {
			type: 'application/json',
		});

		fireEvent.change(uploadButton, { target: { files: [file] } });

		await waitFor(() => {
			const errorMessage = screen.getByText('Incorrect file format');
			expect(errorMessage).toBeInTheDocument();
		});
	});

	test('removes file and error message on clicking remove file button', async () => {
		render(<MainScreen />);
		const uploadButton = screen.getByLabelText('Upload JSON file');

		const file = new File([FunnelData], 'test.json', {
			type: 'application/json',
		});

		fireEvent.change(uploadButton, { target: { files: [file] } });

		await waitFor(() => {
			const message = screen.getByText('Welcome!');
			expect(message).toBeInTheDocument();
		});

		const removeButton = screen.getByLabelText('Remove file');
		fireEvent.click(removeButton);

		expect(uploadButton).toBeInTheDocument();
		expect(screen.queryByText('Welcome!')).toBeNull();
	});
});
