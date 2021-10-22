import axios from 'axios';
import { useState, useEffect } from 'react';
import Toast from './Toast';

const AllShortUrl = () => {
	const [loading, setLoading] = useState(false);
	const [allShortUrls, setAllShortUrls] = useState([]);
	const [showToast, setShowToast] = useState(false);
	const [toastText, setToastText] = useState('');
	const [toastStyle, setToastStyle] = useState('success');

	const shortUrlsCount = allShortUrls.length;

	const headers = {
		apikey: process.env.NEXT_PUBLIC_REBRANDLY_API_KEY,
	};

	const getAllShortUrl = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				'https://api.rebrandly.com/v1/links?domain.id=link.moinulmoin.com&orderBy=createdAt&orderDir=desc&limit=25',
				{
					headers,
				}
			);
			setAllShortUrls(response.data);
			setLoading(false);
			setShowToast(true);
			setToastText('All URls Loaded!');
			setToastStyle('success');
			setTimeout(() => {
				setShowToast(false);
				setToastText('');
				setToastStyle('');
			}, 1000);
		} catch (error) {
			setLoading(false);
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

	useEffect(() => {
		getAllShortUrl();
	}, []);

	const handleDeleteShortUrl = async (urlId) => {
		console.log(urlId);
		try {
			await axios.delete(`https://api.rebrandly.com/v1/links/${urlId}`, {
				headers,
			});
			setAllShortUrls(
				allShortUrls.filter((shortUrl) => shortUrl.id !== urlId)
			);
			setShowToast(true);
			setToastText('URL deleted');
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

	const handleCopyToClipboard = (url) => {
		navigator.clipboard
			.writeText(url)
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
	};

	return (
		<div>
			<Toast text={toastText} style={toastStyle} isShowing={showToast} />

			<h3 className='text-lg mb-3 font-semibold'>All Shortened Links:</h3>

			<div
				className={`flex flex-col ${
					loading && shortUrlsCount === 0
						? 'w-full h-40  justify-center items-center'
						: 'gap-y-5'
				}`}
			>
				{loading && shortUrlsCount === 0 && (
					<div className='w-6 h-6 border-2 border-blue-600 border-solid rounded-full animate-spin border-r-blue-400'></div>
				)}
				{!loading && shortUrlsCount === 0 && (
					<div className='py-2 text-center text-white bg-red-500 border-solid rounded w-6/12 mx-auto text-lg'>
						No url is available!
					</div>
				)}

				{shortUrlsCount > 0 &&
					allShortUrls.map((shortUrl) => {
						const { id, shortUrl: url, title: name } = shortUrl;
						return (
							<div
								className='flex justify-between bg-gray-800 p-3 rounded'
								key={id}
							>
								<div className='flex gap-x-10 items-center'>
									<span className='text-blue-500 font-bold'>
										{name}
									</span>
									<span>{url}</span>
								</div>

								<div className='flex items-center gap-x-8'>
									<a href={`https://${url}`} target='_blank'>
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

									<button
										type='button'
										onClick={() =>
											handleCopyToClipboard(url)
										}
									>
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
										onClick={() => handleDeleteShortUrl(id)}
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
						);
					})}
			</div>
		</div>
	);
};

export default AllShortUrl;
