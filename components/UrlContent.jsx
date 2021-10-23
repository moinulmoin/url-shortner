import { useGlobalContext } from '../context/GlobalContext';

const UrlContent = ({ title, description, status }) => {
	const { state } = useGlobalContext();

	const { currentShortenedURl } = state;

	const urlStatus = status
		? status
		: title === currentShortenedURl.title
		? 'new'
		: null;

	return (
		<div className='flex gap-x-5 md:gap-x-10 items-center'>
			<span className='text-blue-500 font-bold'>{description}</span>
			<span>{title}</span>
			{urlStatus && (
				<span className='text-red-500 w-max p-1'>{`${urlStatus.toUpperCase()} !`}</span>
			)}
		</div>
	);
};

export default UrlContent;
