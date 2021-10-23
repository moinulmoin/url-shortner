import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';
import LinkButton from './LinkButton';

const UrlButtons = ({ title, id }) => {
	return (
		<div className='flex items-center gap-x-8'>
			<LinkButton title={title} />
			<CopyButton title={title} />
			<DeleteButton id={id} />
		</div>
	);
};

export default UrlButtons;
