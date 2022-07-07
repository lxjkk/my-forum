console.log("Hello, 全局鉴权", process.server);
// 全局配置鉴权
/**
 * nuxt.config.js router配置middleware: 'auth' 即可全局触发此鉴权
 */
const routeList = ['index', 'post-id']
export default async function({ $api, store, $cookies, route }) {
  // 判断请求路径
  console.log(route.name);
  if (routeList.includes(route.name) && (!store.state.recommendList.length || !store.state.hotList.length)) {
    Promise.all([$api.getHot(), $api.getRecommend()]).then(list => {
      store.commit('indexStore', list)
    })
  }
  if ($cookies.get("LC-Token") && process.server) {
    const res = await $api.getUserInfo();
    store.dispatch("updateUserInfo", res);
    if (res.code === 202) {
      $cookies.remove("LC-Token");
    }
  }
}
