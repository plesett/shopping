import { Get_classify_code_Data, Get_classify_unveiled, Get_classify_moods, Get_classify_price, Get_classify_new } from '@/service/api';

export default {
    namespace: 'classify',

    state: {
        classify_code_list: []
    },

    effects: {
        *fetch_classify_code(code: { code: number }, { call, put }: any) {
            const response = yield call(Get_classify_code_Data, code.code);
            yield put({
                type: 'Save_classify_data',
                payload: response.data.data
            });
        },
        *fetch_classify_unveiled(code: { classify_code: number }, { call, put }: any) {
            const response = yield call(Get_classify_unveiled, code.classify_code);
            yield put({
                type: 'Save_classify_data',
                payload: response.data.data
            });
        },
        *fetch_classify_moods(code: { classify_code: number }, { call, put }: any) {
            const response = yield call(Get_classify_moods, code.classify_code);
            yield put({
                type: 'Save_classify_data',
                payload: response.data.data
            });
        },
        *fetch_classify_new(code: { classify_code: number }, { call, put }: any) {
            const response = yield call(Get_classify_new, code.classify_code);
            yield put({
                type: 'Save_classify_data',
                payload: response.data.data
            });
        },
        *fetch_classify_price(parameter: { classify_code: number, sortType: string }, { call, put }: any) {
            const response = yield call(Get_classify_price, parameter.classify_code, parameter.sortType);
            yield put({
                type: 'Save_classify_data',
                payload: response.data.data
            });
        },
    },

    reducers: {
        Save_classify_data(state: { classify_list: Array<any>; }, action: { payload: object; }) {
            return {
                ...state,
                classify_code_list: action.payload
            };
        },
    },
};
