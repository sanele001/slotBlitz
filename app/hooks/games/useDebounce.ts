// hooks/useDebouncedSearch.ts
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseDebouncedSearchResult<T> {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	results: T[];
	isLoading: boolean;
	error: string | null;
	debouncedValue: string;
	clearSearch: () => void;
}

type SearchFunction<T> = (query: string) => Promise<T[]>;

export let searchtest = [];

// hooks/useDebouncedSearch.ts

interface UseDebouncedSearchResult<T> {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	results: T[];
	isLoading: boolean;
	error: string | null;
	debouncedValue: string;
	clearSearch: () => void;
}

function useDebouncedSearch<T>(
	searchFunction: SearchFunction<T>,
	initialValue: string = '',
	delay: number = 500,
): UseDebouncedSearchResult<T> {
	const [searchTerm, setSearchTerm] = useState<string>(initialValue);
	const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);
	const [results, setResults] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Use ref to store the search function to prevent dependency changes
	const searchFunctionRef = useRef(searchFunction);
	useEffect(() => {
		searchFunctionRef.current = searchFunction;
	}, [searchFunction]);

	// Debounce logic
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(searchTerm);
		}, delay);

		return () => clearTimeout(handler);
	}, [searchTerm, delay]);

	// API call logic - using ref to avoid infinite loop
	useEffect(() => {
		const performSearch = async (): Promise<void> => {
			if (!debouncedValue.trim()) {
				setResults([]);
				setError(null);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const data = await searchFunctionRef.current(debouncedValue);
				setResults(data);
				searchtest = data; // Store the results in the exported variable
				console.log('Search results:', data); // Log the results for debugging
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'An error occurred during search',
				);
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		};

		performSearch();
	}, [debouncedValue]); // Removed searchFunction from dependencies

	const clearSearch = useCallback((): void => {
		setSearchTerm('');
		setResults([]);
		setError(null);
	}, []);

	return {
		searchTerm,
		setSearchTerm,
		results,
		isLoading,
		error,
		debouncedValue,
		clearSearch,
	};
}

export default useDebouncedSearch;
