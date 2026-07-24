type FetchOptions = RequestInit & {
	next?: NextFetchRequestConfig;
};

export async function useFetch<T>(
	url: string,
	options?: FetchOptions,
): Promise<T> {
	const response = await fetch(url, options);

	if (response.status !== 200) {
		throw new Error(`Request failed with status ${response.status}`);
	}

	return response.json() as Promise<T>;
}
