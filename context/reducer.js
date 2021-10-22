const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return { ...state, loading: action.payload };

		case 'GET_ALL_URL':
			return {
				...state,
				loading: false,
				allUrls: action.payload,
				toast: {
					isShowing: true,
					text: 'All URls Loaded',
					style: 'success',
				},
			};

		case 'POSITIVE_TOAST':
			return {
				...state,
				toast: {
					isShowing: true,
					text: action.payload,
					style: 'success',
				},
			};

		case 'NEGATIVE_TOAST':
			return {
				...state,
				toast: {
					isShowing: true,
					text: action.payload,
					style: 'error',
				},
			};

		case 'RESET_TOAST':
			return {
				...state,
				toast: {
					isShowing: false,
					text: '',
					style: '',
				},
			};

		case 'CURRENT_SHORTENED_URL':
			return {
				...state,
				currentShortenedURl: action.payload,
			};

		case 'UPDATE_URLS':
			return {
				...state,
				allUrls: action.payload,
			};

		case 'NO_URL':
			return {
				...state,
				noUrlText: action.payload,
			};

		default:
			throw new Error('Unknown Action Type');
	}
};

export default reducer;
