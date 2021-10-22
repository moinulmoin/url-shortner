import axios from 'axios';
import { useReducer, createContext, useContext } from 'react';
import reducer from './reducer';

const initialState = {
	loading: false,
	allUrls: [],
	noUrlText: '',
	currentShortenedURl: {},
	toast: {
		isShowing: false,
		text: '',
		style: '',
	},
};

export const GlobalContext = createContext(initialState);

const headers = {
	apikey: process.env.NEXT_PUBLIC_REBRANDLY_API_KEY,
};

export const GlobalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const resetToastAfterTimeout = () => {
		setTimeout(() => {
			dispatch({ type: 'RESET_TOAST' });
		}, 1000);
	};

	const shortenUrl = async (nameForUrl, longUrl) => {
		if (nameForUrl === '' || longUrl === '') {
			dispatch({
				type: 'NEGATIVE_TOAST',
				payload: 'Please fill in both fields',
			});
			resetToastAfterTimeout();
			return;
		}

		const data = {
			domain: { fullName: 'link.moinulmoin.com' },
			destination: longUrl,
			title: nameForUrl,
		};

		try {
			const response = await axios.post(
				'https://api.rebrandly.com/v1/links',
				data,
				{
					headers,
				}
			);

			const {
				id,
				shortUrl: title,
				title: description,
			} = await response.data;

			dispatch({
				type: 'CURRENT_SHORTENED_URL',
				payload: { id, title, description },
			});
			dispatch({
				type: 'POSITIVE_TOAST',
				payload: 'URL Shortened Successfully',
			});
			resetToastAfterTimeout();
		} catch (error) {
			dispatch({ type: 'NEGATIVE_TOAST', payload: error.message });
			resetToastAfterTimeout();
		}
	};

	const getAllUrl = async () => {
		dispatch({ type: 'LOADING', payload: true });
		try {
			const response = await axios.get(
				'https://api.rebrandly.com/v1/links?domain.id=link.moinulmoin.com&orderBy=createdAt&orderDir=desc&limit=25',
				{
					headers,
				}
			);

			if (state.allUrls.length === 0) {
				dispatch({ type: 'GET_ALL_URL', payload: response.data });
			} else {
				dispatch({ type: 'UPDATE_URLS', payload: response.data });
			}

			resetToastAfterTimeout();
		} catch (error) {
			dispatch({ type: 'LOADING', payload: true });
			dispatch({ type: 'NEGATIVE_TOAST', payload: error.message });
			resetToastAfterTimeout();
		}
	};

	const handleDeleteUrl = async (urlId) => {
		try {
			await axios.delete(`https://api.rebrandly.com/v1/links/${urlId}`, {
				headers,
			});

			const newURLs = state.allUrls.filter((url) => url.id !== urlId);

			dispatch({ type: 'UPDATE_URLS', payload: newURLs });
			dispatch({
				type: 'NEGATIVE_TOAST',
				payload: 'URL deleted successfully',
			});
			if (state.currentShortenedURl.id === urlId) {
				dispatch({ type: 'CURRENT_SHORTENED_URL', payload: {} });
			}
			resetToastAfterTimeout();

			if (state.allUrls.length === 0) {
				dispatch({ type: 'NO_URL', payload: 'No URL is found' });
			}
		} catch (error) {
			dispatch({ type: 'NEGATIVE_TOAST', payload: error.message });
			resetToastAfterTimeout();
		}
	};

	const handleCopyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				dispatch({
					type: 'POSITIVE_TOAST',
					payload: 'Copied Successfully',
				});
				resetToastAfterTimeout();
			})
			.catch(() => {
				dispatch({ type: 'NEGATIVE_TOAST', payload: 'Failed to copy' });
				resetToastAfterTimeout();
			});
	};

	return (
		<GlobalContext.Provider
			value={{
				state,
				getAllUrl,
				handleDeleteUrl,
				handleCopyToClipboard,
				shortenUrl,
				dispatch,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
