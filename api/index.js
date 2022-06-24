// webpack api require.context 读取目录下含有 Api.js 的所有文件
const files = require.context('./', true, /\Api.js$/)
let api = {}
console.log(files('./postApi.js'));
files.keys().forEach(key => {
	const tmp = files(key).default
	api = {...api, ...tmp}
})
export default api