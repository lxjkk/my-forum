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
	getPostInfo: {
		url: `/api/post/getPostInfo`,
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
	postPublish: {
		url: `/api/user/post`,
		method: 'POST',
	},
	getComment: {
		url: `/api/post/getComment`,
		method: 'get',
	},
	postComment: {
		url: `/api/user/comment`,
		method: 'POST',
	},
	postReply: {
		url: `/api/user/reply`,
		method: 'POST',
	},
}
export default api