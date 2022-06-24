const data = {
    passwordLogin: {
		url: `/api/user/login`,
		method: 'POST',
	},
	register: {
		url: `/api/user/register`,
		method: 'POST',
	},
    getUserInfo: {
		url: `/api/user/userInfo`,
		method: 'get',
	},
	editUserInfo: {
		url: `/api/user/editUserInfo`,
		method: 'POST',
	},
}
module.exports = data