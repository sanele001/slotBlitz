// api layer for fetching slot data from the API

type info = {
	token: string;
	clientId: string;
	baseUrl: string;
};

export function getSlotsData(requestInfo: info): string {
	try {
		const { baseUrl, clientId, token } = requestInfo;
		const url = `${baseUrl}api/v1.0/getGamesData?clientId=${clientId}&token=${token}`;
		return url;
	} catch (error) {
		console.error('Error fetching data from API:', error);
		throw error;
	}
}
