import { Get_product_info, User_Info } from '@/service/api';

export default {
    namespace: 'user',

    state: {
        user_info: {}
    },

    effects: {
        *fetch_user_info(token: { token: string }, { call, put }: any) {
            const res = yield call(User_Info, token.token)
            yield put({
                type: 'Save_user_info',
                payload: res.data.data,
            });
        },
    },

    reducers: {
        Save_user_info(state: { user_info:object; }, action: { payload: object }) {
            return {
                ...state,
                user_info: action.payload
            };
        },
    },
};
