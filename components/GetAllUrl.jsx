import { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Spinner from './Spinner';
import Toast from './Toast';
import UrlButtons from './UrlButtons';
import UrlContent from './UrlContent';

const GetAllUrl = () => {
	const { state, getAllUrl } = useGlobalContext();

	const { loading, allUrls, toast, noUrlText } = state;

	const urlsNumber = allUrls.length;

	useEffect(() => {
		getAllUrl();
	}, []);

	return (
		<div>
			{/* Toast for different alerts */}
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
				{/* Spinner while fetching */}
				{loading && urlsNumber === 0 && <Spinner />}

				{/* When No URL Available */}
				{noUrlText && (
					<div className='py-2 text-center text-white bg-red-500 border-solid rounded w-6/12 mx-auto text-lg'>
						{noUrlText}
					</div>
				)}

				{/* All URL are shown here */}
				{urlsNumber > 0 &&
					allUrls.map((url) => {
						const { id, shortUrl: title, title: description } = url;
						return (
							<div
								className='flex flex-col gap-y-4 md:flex-row md:justify-between bg-gray-800 p-3 rounded'
								key={id}
							>
								<UrlContent
									title={title}
									description={description}
								/>

								<UrlButtons title={title} id={id} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default GetAllUrl;
