import React from 'react';
import styles from './styles.scss';
import Link from 'umi/link';
import { SortData } from './mock';
import { connect } from 'dva';
import { IClassifySortProps } from './type';
import { message } from 'antd';

// 头部排序
class ClassifySort extends React.Component<IClassifySortProps> {

	state = {
		isSort: -1,
		sotr: false,
		sotrPrice: 0
	}

	handleSort = (id: number) => {
		const { dispatch, global } = this.props;
		const { sotrPrice } = this.state;
		this.setState({ isSort: id, sotr: !this.state.sotr, sotrPrice: sotrPrice + 1 === 3 ? 1 : sotrPrice + 1}, () => {
			switch (this.state.isSort) {
				case 0:
					// 揭晓
					dispatch({
						type: 'classify/fetch_classify_unveiled',
						classify_code: global.isClassify
					})
					break;
				case 1:
					// 人气
					dispatch({
						type: 'classify/fetch_classify_moods',
						classify_code: global.isClassify
					})
					break;
				case 2:
					// 最新
					dispatch({
						type: 'classify/fetch_classify_new',
						classify_code: global.isClassify
					})
					break;
				case 3:
					// 价值
					dispatch({
						type: 'classify/fetch_classify_price',
						classify_code: global.isClassify,
						sortType: this.state.sotr ? 'asc' : 'desc'
					})
					break;
				default:
					message.error('错误请联系管理员', 3)
					break;
			}
		});
	}

	render() {
		const { isSort, sotrPrice } = this.state;
		return (
			<div className={styles.ClassifySort}>
				{
					SortData.map((v) => {
						return (
							<Link onClick={() => this.handleSort(v.id)} to={`#${v.name}`} style={{ color: isSort === v.id ? '#f70' : '' }} key={v.id}>{v.name}{v.icon !== null &&
								<img src={sotrPrice === 0 ? v.icon : sotrPrice === 1 ? v.icon_bottom : v.icon_top} alt="" />
							}</Link>
						)
					})
				}
			</div>
		)
	}
}

export default connect(({ global }:any) => ({
	global
}))(ClassifySort);