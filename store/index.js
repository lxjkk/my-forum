import api from '~/api'
import request from '~/utils/http'
export const state = () => ({
    userInfo: {}, // 个人信息
    hasLogin: false,
    hotList: [],
    recommendList: []
})

export const mutations = {
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo;
        state.hasLogin = true;
    },
    logout(state) {
        state.hasLogin = false;
        state.userInfo = {};
        this.$cookies.remove('LC-Token')
    },
    indexStore(state, data) {
        state.hotList = data[0].code === 200 && data[0].data || []
        state.recommendList = data[1].code === 200 && data[1].data || []
    }
}

export const actions = {
    // 存储用户配置
    async updateUserInfo({ commit }, res) {
        if (!res) {
            res = await request(api.getUserInfo)
        }
        if (res.code === 200) {
            commit('saveUserInfo',res.data);
        } else {
            commit('logout');
        }
    }
}