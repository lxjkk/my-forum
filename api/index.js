const api = {
	passwordLogin: {
		url: `/api/user/login`,
		method: 'POST',
	},
	register: {
		url: `/api/user/register`,
		method: 'POST',
	},
	getPost: {
		url: `/api/post/getPost`,
		method: 'get',
	},
	getUserInfo: {
		url: `/api/user/userInfo`,
		method: 'get',
	},
	support: {
		url: `/api/post/support`,
		method: 'POST',
	},
}
export default api