const data = {
    getPost: {
		url: `/api/post/getPost`,
		method: 'get',
	},
	getPostInfo: {
		url: `/api/post/getPostInfo`,
		method: 'get',
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
    getSearch: {
		url: `/api/post/search`,
		method: 'get',
	},
	getHot: {
		url: `/api/post/getHot`,
		method: 'get',
	},
	getRecommend: {
		url: `/api/post/getRecommend`,
		method: 'get',
	},
    support: {
		url: `/api/post/support`,
		method: 'POST',
	},
}
export default data