export const state = () => ({
    userInfo: {}, // 个人信息
    hasLogin: false
})

export const mutations = {
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo;
        state.hasLogin = true;
    },
    logout(state) {
        state.hasLogin = false;
        state.userInfo = {};
    },

}

export const actions = {
    // 存储用户配置
    async updateUserInfo({ commit }, res) {
        if (res.code === 200) {
            commit('saveUserInfo',res.data);
        } else {
            commit('logout');
        }
    }
}