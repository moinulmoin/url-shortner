const Toast = ({ text, style, isShowing }) => {
	return (
		<div
			class={`absolute top-8 right-0 w-2/12 h-11 flex px-4 items-center border border-l-4 border-r-0 transition ease-in ${
				style === 'success'
					? 'text-green-700 bg-green-100 border-green-500'
					: 'text-red-700 bg-red-100 border-red-500'
			} ${
				isShowing
					? 'opacity-100 -translate-x-20'
					: 'opacity-0 translate-x-0'
			}`}
		>
			<span className='font-semibold'>{`${text}!`}</span>
		</div>
	);
};

export default Toast;
