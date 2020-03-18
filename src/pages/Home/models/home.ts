import { Get_Home_Data } from '@/service/api';

export default {
    namespace: 'home',

    state: {
        Home_list: []
    },

    effects: {
        *fetch_home(pageCount: { pageCount:number}, { call, put }: any) {
            const count = pageCount.pageCount;
            const response = yield call(Get_Home_Data, count, 20);
            yield put({
                type: 'Save_Home_data',
                payload: response.data.data
            });
        },
    },

    reducers: {
        Save_Home_data(state: { Home_list: Array<any>; }, action: { payload: object; }) {
            var arr = []
            var arr = state.Home_list;
            for (let i = 0; i < action.payload.length; i++) {
                const element = action.payload[i];
                arr.push(element)
            }
            return {
                ...state,
                Home_list: arr
            };
        },
    },
};
