console.log("Hello, 全局鉴权", process.server);
// 全局配置鉴权
/**
 * nuxt.config.js router配置middleware: 'auth' 即可全局触发此鉴权
 */
export default async function({ $api, store, $cookies }) {
  if ($cookies.get("token")) {
    const res = await $api.getUserInfo();
    store.dispatch("updateUserInfo", res);
    if (res.code !== 200) {
      $cookies.remove("token");
    }
  }
}
