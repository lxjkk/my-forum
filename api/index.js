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
	editUserInfo: {
		url: `/api/user/editUserInfo`,
		method: 'POST',
	},
	support: {
		url: `/api/post/support`,
		method: 'POST',
	},
	upload: {
		url: `/api/utils/upload`,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' }
	},
}
export default api