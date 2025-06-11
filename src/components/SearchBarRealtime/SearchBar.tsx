import { Search } from 'assets/icons';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classes from './SearchBarRealtime.module.scss';
import debounce from 'lodash/debounce';
import IconButton from 'components/common/IconButton/IconButton';
import Input from 'components/common/Input/Input';

/*
debounce returns new debounced function, that delays invoking of passed "normal function" according to passed "wait" param (number of milliseconds to delay). Subsequent calls to debounced function return result of last function invocation.
reason: prevents memory overload and expensive operations
*/

const SearchBarRealtime = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [, setSearchParams] = useSearchParams();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSetSearchParamsRef = useCallback(
		debounce((searchQuery) => {
			setSearchParams(searchQuery ? `?q=${searchQuery}` : '');
		}, 300),
		[]
	);

	useEffect(() => {
		debouncedSetSearchParamsRef(searchQuery);
	}, [debouncedSetSearchParamsRef, searchQuery, setSearchParams]);

	return (
		<div className={classes.searchContainer}>
			<IconButton
				disabled={searchQuery === ''}
				Icon={
					<Search
						height='16'
						width='16'
						fill='#ffffff'
					/>
				}
				onClick={() => {}}
			/>
			<Input
				onChange={setSearchQuery}
				placeholder='Title, people, genre'
			/>
		</div>
	);
};

export default SearchBarRealtime;
