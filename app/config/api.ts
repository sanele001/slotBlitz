const strapi =
	'79edd872fedeeb3a25d8426b7af64822e0b0cd6e870e135d8ac66502f0f18b8ceec46c6dea3881a96445b76c3b95ead14692913a03b4304d80b51449a49b501627912bec8a44d7853233d0fd918dc1673e7f9798f1dc0f90eaa864b44c7e21e00fdbaf4b97bbcc94a4be5d903dd43675a693101d936b8ddac2f0a4de2af19e7f';

export const requestOptions = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${strapi}`,
	},
};
export const singleSlotUrl =
	'http://localhost:1337/api/slots?filters[gameSlug][$eq]=';
