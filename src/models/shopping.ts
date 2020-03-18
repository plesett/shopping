export default {
	namespace: 'shopping',

	state: {
		shopping: []
	},

	effects: {
		// 添加
		*take_product(value: { value: object }, { call, put }: any) {
			yield put({
				type: 'SaveSwitch_State',
				value: value.value
			});
		},
		// 删除
		*rm_product(product_id: { product_id: number | string}, { call, put }: any) {
			yield put({
				type: 'RmSwitch_State',
				product_id: product_id.product_id
			});
		},
		// 修改
		*update_product(parameter: { product_id: number, count: number  }, { call, put }: any) {
			yield put({
				type: 'updateSwitch_State',
				product_id: parameter.product_id,
				count: parameter.count
			});
		},
	},

	reducers: {
		SaveSwitch_State(state: { shopping: Array<any> }, action: { value: { product_id: number, zongcanyu: number, yicanyu:number } }) {
			let arr: any[] = [];
			arr = state.shopping;
			if (arr.length === 0) {
				// 当state为空的时候 直接写入 初始化数量为 1
				arr.push(Object.assign(action.value, { countValue: action.value.zongcanyu === action.value.yicanyu ? 0 : 1 }))
			} else {
				// 当state值不为空的时候
				// 遍历
				let d = false
				arr.forEach(element => {
					if (element.product_id === action.value.product_id) {
						let newCount = element.countValue + 1
						delete element.countValue
						Object.assign(element, { countValue: newCount })
						d = true
					}
				});
				if (!d) {
					arr.push(Object.assign(action.value, { countValue: action.value.zongcanyu === action.value.yicanyu ? 0 : 1}))
				}
			}

			return {
				...state,
				shopping: arr
			};
		},
		RmSwitch_State(state: { shopping: Array<any> }, action: { product_id: number | string }) {
			let arr: any[] = [];
			arr = state.shopping;
			for (let i = 0; i < arr.length; i++) {
				const element = arr[i];
				if (element.product_id === action.product_id) {
					arr.splice(i, 1);
				}
			}
			return {
				...state,
				shopping: action.product_id === 'all' ? [] : arr
			};
		},
		updateSwitch_State(state: { shopping: Array<any> }, action: { product_id: number, count: number }) {
			let arr: any[] = [];
			arr = state.shopping;
			for (let i = 0; i < arr.length; i++) {
				const element = arr[i];
				if (element.product_id === action.product_id) {
					delete element.count
					Object.assign(element, { countValue: action.count })
				}
			}
			return {
				...state,
				shopping: arr
			};
		},
	},
};
