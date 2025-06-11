// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools@4

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Router } from './Router';
import { queryClient } from './api/config/query';
// import { antdTheme } from './styles';
// import {ConfigProvider} from 'antd';
import './styles/global.scss';

const App = () => {
	// Provide the client to your App -> allows us to use client everywhere in App through QueryClientProvider context (uses reacts useContext logic)
	// Therefore, we can use all hooks that react-query provides us

	// Load the Router -> Router automatically guides you to the "/" route by default (homepage)
	return (
		// <ConfigProvider theme={antdTheme} /*locale={i18next.antdLocales[i18n.language]}*/>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Router />
		</QueryClientProvider>
		// <ConfigProvider/>
	);
};

export default App;
