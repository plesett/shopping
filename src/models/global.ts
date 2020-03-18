export default {
    namespace: 'global',

    state: {
        isCountDown: false,
        winner_end_time: '',
        // classify
        isUnfold: false,
        isClassify: 20000
    },

    effects: {
        *time_state_switch(state: {state: boolean}, { call, put }: any) {
            yield put({
                type: 'SaveSwitch_State',
                state: state.state
            });
        },
        *alter(_: any, { call, put }: any) {
            yield put({
                type: 'alterState',
            });
        },
        *isClassify(code: {code: number}, { call, put }: any) {
            yield put({
                type: 'isClassifyState',
                code: code.code
            });
        },
    },

    reducers: {
        SaveSwitch_State(state: any, action: { state: boolean}) {
            return {
                ...state,
                isCountDown: action.state,
            };
        },
        alterState(state: { isUnfold: boolean; }, action: { payload: object; }) {
            return {
                ...state,
                isUnfold: !state.isUnfold
            };
        },
        isClassifyState(state: { isUnfold: boolean; }, action: { code: number }) {
            return {
                ...state,
                isClassify: action.code
            };
        },
    },
};
