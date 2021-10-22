import { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Spinner from './Spinner';
import Toast from './Toast';

const AllUrl = () => {
	const { state, getAllUrl, handleDeleteUrl, handleCopyToClipboard } =
		useGlobalContext();

	const { loading, allUrls, toast } = state;

	const urlsNumber = allUrls.length;

	useEffect(() => {
		getAllUrl();
	}, []);

	return (
		<div>
			<Toast
				text={toast.text}
				style={toast.style}
				isShowing={toast.isShowing}
			/>

			<h3 className='text-lg mb-3 font-semibold'>All Shortened Links:</h3>

			<div
				className={`flex flex-col ${
					loading && urlsNumber === 0
						? 'w-full h-40  justify-center items-center'
						: 'gap-y-5'
				}`}
			>
				{loading && urlsNumber === 0 && <Spinner />}
				{!loading && urlsNumber === 0 && (
					<div className='py-2 text-center text-white bg-red-500 border-solid rounded w-6/12 mx-auto text-lg'>
						No url is available!
					</div>
				)}

				{urlsNumber > 0 &&
					allUrls.map((url) => {
						const { id, shortUrl: title, title: description } = url;
						return (
							<div
								className='flex justify-between bg-gray-800 p-3 rounded'
								key={id}
							>
								<div className='flex gap-x-10 items-center'>
									<span className='text-blue-500 font-bold'>
										{description}
									</span>
									<span>{title}</span>
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
										onClick={() => handleDeleteUrl(id)}
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

export default AllUrl;
