import { useGlobalContext } from '../context/GlobalContext';
import Toast from './Toast';
import UrlButtons from './UrlButtons';
import UrlContent from './UrlContent';
import UrlForm from './UrlForm';

const CreateShortUrl = () => {
	const { state } = useGlobalContext();

	const { currentShortenedURl, toast } = state;

	return (
		<div className='flex flex-col gap-y-10'>
			{/* Toast for different alerts */}
			<Toast
				text={toast.text}
				style={toast.style}
				isShowing={toast.isShowing}
			/>

			{/* URL FORM to type link */}
			<UrlForm />

			{/* New Shortened URl */}
			{currentShortenedURl && currentShortenedURl.title && (
				<div className='flex flex-col gap-y-4 md:flex-row md:justify-between bg-gray-800 p-3 rounded'>
					<UrlContent
						title={currentShortenedURl.title}
						description={currentShortenedURl.description}
						status={currentShortenedURl.status}
					/>

					<UrlButtons
						title={currentShortenedURl.title}
						id={currentShortenedURl.id}
					/>
				</div>
			)}
		</div>
	);
};

export default CreateShortUrl;
