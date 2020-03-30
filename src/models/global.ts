import { Get_Notice_info } from '@/service/api';

export default {
	namespace: 'global',

	state: {
		ishint: true,
		notice: [],
		isCountDown: false,
		winner_end_time: '',
		isUnfold: false,
		isClassify: 20000
	},

	effects: {
		*time_state_switch(state: { state: boolean }, { call, put }: any) {
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
		*isClassify(code: { code: number }, { call, put }: any) {
			yield put({
				type: 'isClassifyState',
				code: code.code
			});
		},
		*isHint(_: any, { call, put }: any) {
			yield put({
				type: 'isHintState',
			});
		},
		*isNotice(_: any, { call, put }: any) {
			const response = yield call(Get_Notice_info);
			yield put({
				type: 'isNoticeState',
				data: response.data.data
			});
		},
	},

	reducers: {
		SaveSwitch_State(state: any, action: { state: boolean }) {
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
		isHintState(state: { isUnfold: boolean; }, action: any) {
			return {
				...state,
				ishint: false
			};
		},
		isNoticeState(state: { isUnfold: boolean; }, action: { data: Array<object> }) {
			return {
				...state,
				notice: action.data
			};
		},
	},
};
