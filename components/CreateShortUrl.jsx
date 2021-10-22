import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Toast from './Toast';

const CreateShortUrl = () => {
	const {
		state,
		getAllUrl,
		handleDeleteUrl,
		handleCopyToClipboard,
		shortenUrl,
	} = useGlobalContext();

	const { currentShortenedURl, toast } = state;

	const [nameForUrl, setNameForUrl] = useState('');
	const [longUrl, setLongUrl] = useState('');

	const handleShortenURL = async (e) => {
		e.preventDefault();
		await shortenUrl(nameForUrl, longUrl);
		await getAllUrl();
		setNameForUrl('');
		setLongUrl('');
	};

	return (
		<div className='flex flex-col gap-y-10'>
			<Toast
				text={toast.text}
				style={toast.style}
				isShowing={toast.isShowing}
			/>

			<form className='flex gap-x-2 items-center'>
				<input
					type='text'
					placeholder='Enter name for your link'
					className='focus:ring-2 text-gray-900 w-3/12 rounded'
					value={nameForUrl}
					onChange={(e) => setNameForUrl(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Enter your link here'
					className='focus:ring-2 flex-grow text-gray-900 rounded'
					value={longUrl}
					onChange={(e) => setLongUrl(e.target.value)}
				/>
				<button
					type='submit'
					onClick={handleShortenURL}
					className='px-4 py-2 bg-blue-600 text-white focus:border-0 focus:outline-none rounded'
				>
					Shorten your link
				</button>
			</form>
			{currentShortenedURl && currentShortenedURl.title && (
				<div className='flex justify-between bg-gray-800 p-3 rounded'>
					<div className='flex gap-x-10 items-center'>
						<span className='text-blue-500 font-bold'>
							{currentShortenedURl.description}
						</span>
						<span>{currentShortenedURl.title}</span>
					</div>

					<div className='flex items-center gap-x-8'>
						<a
							href={`https://${currentShortenedURl.title}`}
							target='_blank'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 text-blue-500'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
								/>
							</svg>
						</a>

						<button type='button' onClick={handleCopyToClipboard}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
								/>
							</svg>
						</button>

						<button
							type='button'
							onClick={() =>
								handleDeleteUrl(currentShortenedURl.id)
							}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 text-red-600'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
								/>
							</svg>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateShortUrl;
