import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION_TOKEN}`,
		'Content-Type': 'application/json',
	},
});

export const request = async <T>(options: AxiosRequestConfig) => {
	const result = await axiosClient<T>(options);
	return result.data;
};

const logError = (name: string, ...args: Array<unknown>) => {
	console.error(`ERROR ${name}${args.length ? ':' : ''}`, ...args);
};

axiosClient.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	(error: AxiosError) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		logError('axios', error);
		return Promise.reject(error);

		// if (error.response?.status === 401) {
		// 	window.location.href = appConfig.api.loginUrl;
		// }
		// return Promise.reject(error);

		// if (error.response?.status === 403) {
		// 	if (window.location.pathname !== Routes.Login) {
		// 		window.location.href = Routes.Login;
		// 	}
		// }
		// throw error;
	}
);
