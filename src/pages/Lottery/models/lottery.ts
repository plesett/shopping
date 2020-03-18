import { Get_lottery_Data, Get_lottery_forget } from '@/service/api';

export default {
    namespace: 'lottery',

    state: {
        winner_list: [],
        winner_forget_list: []
    },

    effects: {
        *fetch_lottery(_: any, { call, put }: any) {
            const res_lottery = yield call(Get_lottery_Data);
            yield put({
                type: 'Save_lottery_data',
                payload: res_lottery.data.data,
            });
        },
        *fetch_forget_lottery(pageCount: { pageCount: number }, { call, put }: any) {
            const count = pageCount.pageCount;
            const res_lottery_forget = yield call(Get_lottery_forget, count, 5)
            yield put({
                type: 'Save_lottery_forget',
                lottery_forget: res_lottery_forget.data.data
            });
        },
    },

    reducers: {
        Save_lottery_forget(state: { lottery_list: Array<any>; }, action: { lottery_forget: object }) {
            var arr = [];
            var arr = state.winner_forget_list;
            for (let i = 0; i < action.lottery_forget.length; i++) {
                const element = action.lottery_forget[i];
                arr.push(element)
            }
            return {
                ...state,
                winner_forget_list: arr // .reverse()
            };
        },
        Save_lottery_data(state: { lottery_list: Array<any>; }, action: { payload: object }) {
            return {
                ...state,
                winner_list: action.payload,
            };
        },
    },
};
