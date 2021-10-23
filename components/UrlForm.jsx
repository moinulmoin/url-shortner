import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const UrlForm = () => {
	const { getAllUrl, shortenUrl } = useGlobalContext();

	const [nameForUrl, setNameForUrl] = useState('');
	const [longUrl, setLongUrl] = useState('');

	const handleShortenURL = async (e) => {
		e.preventDefault();
		await shortenUrl(nameForUrl, longUrl);
		getAllUrl();
		setNameForUrl('');
		setLongUrl('');
	};
	return (
		<form className='flex flex-col md:flex-row gap-2 items-center'>
			<input
				type='text'
				placeholder='Enter name for your link'
				className='w-full focus:ring-2 text-gray-900 md:w-3/12 rounded'
				value={nameForUrl}
				onChange={(e) => setNameForUrl(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Enter your link here'
				className='w-full md:w-auto focus:ring-2 flex-grow text-gray-900 rounded'
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
	);
};

export default UrlForm;
