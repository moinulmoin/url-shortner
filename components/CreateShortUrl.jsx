import axios from 'axios';
import { useState } from 'react';
import Toast from './Toast';

const CreateShortUrl = () => {
	const [nameForUrl, setNameForUrl] = useState('');
	const [longUrl, setLongUrl] = useState('');
	const [shortenedUrlData, setShortUrlData] = useState({});
	const [showToast, setShowToast] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastStyle, setToastStyle] = useState('');

	const makeShortenUrl = async (e) => {
		e.preventDefault();

		if (nameForUrl === '' || longUrl === '') {
			alert('Enter valid name/url to shorten');
			return;
		}

		const data = {
			domain: { fullName: 'link.moinulmoin.com' },
			destination: longUrl,
			title: nameForUrl,
		};

		const headers = {
			apikey: process.env.NEXT_PUBLIC_REBRANDLY_API_KEY,
		};

		try {
			const response = await axios.post(
				'https://api.rebrandly.com/v1/links',
				data,
				{
					headers,
				}
			);
			console.log(response.data);
			const { id, shortUrl: url, title: name } = response.data;

			setShortUrlData({ id, url, name });

			setShowToast(true);
			setToastText('URL Shortened!');
			setToastStyle('success');
			setTimeout(() => {
				setShowToast(false);
				setToastText('');
				setToastStyle('');
			}, 1000);
		} catch (error) {
			setShowToast(true);
			setToastText(error.message);
			setToastStyle('error');
			setTimeout(() => {
				setShowToast(false);
				setToastText('');
				setToastStyle('');
			}, 1000);
		}

		setNameForUrl('');
		setLongUrl('');
	};

	const handleDeleteShortUrlData = async (urlId) => {
		try {
			await axios.delete(`https://api.rebrandly.com/v1/links/${urlId}`, {
				headers: {
					apikey: process.env.NEXT_PUBLIC_REBRANDLY_API_KEY,
				},
			});
			setShortUrlData({});

			setShowToast(true);
			setToastText('Deleted!');
			setToastStyle('error');
			setTimeout(() => {
				setShowToast(false);
				setToastText('');
				setToastStyle('');
			}, 1000);
		} catch (error) {
			setShowToast(true);
			setToastText(error.message);
			setToastStyle('error');
			setTimeout(() => {
				setShowToast(false);
				setToastText('');
				setToastStyle('');
			}, 1000);
		}
	};

	const handleCopyToClipboard = async () => {
		if (shortenedUrlData.url) {
			navigator.clipboard
				.writeText(shortenedUrlData.url)
				.then(() => {
					setShowToast(true);
					setToastText('Copied');
					setToastStyle('success');

					setTimeout(() => {
						setShowToast(false);
						setToastText('');
						setToastStyle('');
					}, 1000);
				})
				.catch(() => {
					setShowToast(true);
					setToastText('Failed to copy');
					setToastStyle('error');
					setTimeout(() => {
						setShowToast(false);
						setToastText('');
						setToastStyle('');
					}, 1000);
				});
		}
	};
	return (
		<div className='flex flex-col gap-y-10'>
			<Toast text={toastText} style={toastStyle} isShowing={showToast} />

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
					onClick={makeShortenUrl}
					className='px-4 py-2 bg-blue-600 text-white focus:border-0 focus:outline-none rounded'
				>
					Shorten your link
				</button>
			</form>
			{shortenedUrlData && shortenedUrlData.url && (
				<div className='flex justify-between bg-gray-800 p-3 rounded'>
					<div className='flex gap-x-10 items-center'>
						<span className='text-blue-500 font-bold'>
							{shortenedUrlData.name}
						</span>
						<span>{shortenedUrlData.url}</span>
					</div>

					<div className='flex items-center gap-x-8'>
						<a
							href={`https://${shortenedUrlData.url}`}
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
								handleDeleteShortUrlData(shortenedUrlData.id)
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
