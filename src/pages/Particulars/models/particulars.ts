import { Get_product_info } from '@/service/api';

export default {
    namespace: 'particulars',

    state: {
        isLoading: true,
        particulars_info: {}
    },

    effects: {
        *fetch_particulars_info(product_id: { product_id: number }, { call, put }: any) {
            const res = yield call(Get_product_info, product_id.product_id)
            yield put({
                type: 'Save_particulars_info',
                payload: res.data.data,
            });
        },
    },

    reducers: {
        Save_particulars_info(state: { particulars_info: Array<any>; }, action: { payload: object}) {
            return {
                ...state,
                isLoading: false,
                particulars_info: action.payload
            };
        },
    },
};
