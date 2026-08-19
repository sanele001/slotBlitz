// hooks/useDebouncedSearch.ts
import { useState, useEffect } from 'react';

export function useDebouncedSearch<T>(
	searchFunction: (query: string) => Promise<T[]>,
	delay: number = 1000,
) {
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedValue, setDebouncedValue] = useState('');
	const [searchResults, setSearchResults] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(searchTerm);
		}, delay);

		return () => clearTimeout(handler);
	}, [searchTerm, delay]);

	useEffect(() => {
		if (!debouncedValue.trim()) {
			setSearchResults([]);
			setIsLoading(false);
			return;
		}

		let isActive = true;
		setIsLoading(true);

		searchFunction(debouncedValue)
			.then((data) => {
				if (isActive) setSearchResults(data);
			})
			.finally(() => {
				if (isActive) setIsLoading(false);
			});

		return () => {
			isActive = false;
		};
	}, [debouncedValue, searchFunction]);

	return {
		searchTerm,
		setSearchTerm,
		results: searchResults,
		isLoading,
		clearSearch: () => setSearchTerm(''),
	};
}
