import { Search } from 'assets/icons';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classes from './SearchBarPress.module.scss';
import IconButton from 'components/common/IconButton/IconButton';
import Input from 'components/common/Input/Input';
import { debounce } from 'lodash';

/*
debounce returns new debounced function, that delays invoking of passed "normal function" according to passed "wait" param (number of milliseconds to delay). Subsequent calls to debounced function return result of last function invocation.
reason: prevents memory overload and expensive operations
*/

const SearchBarPress = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [, setSearchParams] = useSearchParams();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleSearchParamsChange = useCallback(
		debounce((searchQuery: string) => {
			setSearchParams(searchQuery ? `?q=${searchQuery}` : '');
		}),
		[]
	);

	return (
		<div className={classes.searchContainer}>
			<IconButton
				// disabled={searchQuery === ''}
				Icon={
					<Search
						height='16'
						width='16'
						fill='#ffffff'
					/>
				}
				onClick={() => handleSearchParamsChange(searchQuery)}
			/>

			<Input
				onChange={setSearchQuery}
				placeholder='Title, people, genre'
				onKeyDown={({ key }) => key === 'Enter' && handleSearchParamsChange(searchQuery)}
			/>
		</div>
	);
};

export default SearchBarPress;
