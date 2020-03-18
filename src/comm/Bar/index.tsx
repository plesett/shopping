import { connect } from 'dva';
import React from 'react';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import BarData from './mock';
import styles from './style.scss';

interface ITabBarExampleProps {
	history: any;
	shopping: {
		shopping: Array<any>
	}
}

interface Iactio_nBarState {
	dynamic: boolean;
}

class TabBarExample extends React.Component<ITabBarExampleProps, Iactio_nBarState> {

	state = {
		dynamic: false
	}

	componentWillReceiveProps() {
		this.setState({ dynamic: true }, () => {
			setTimeout(() => {
				this.setState({ dynamic: false })
			}, 600);
		})
	}

	render() {
		const url = this.props.history.location.pathname;
		const count = this.props.shopping.shopping.length;
		return (
			<React.Fragment>
				<div className={styles.tablBar}>
					<div className={styles.tablBar_box}>
						{
							BarData.map((v) => {
								return (
									<Link to={v.link} className={styles.tablBar_item} key={v.id}>
										{
											v.id === 3 && count !== 0 ?
												<>
													<div className={this.state.dynamic ? styles.countDynamic : ''}></div>
													<div className={styles.count}>{count}</div>
												</> : null
										}
										<div>
											<img src={url === v.link ? v.icon_aciton : v.icon} alt={v.name} />
										</div>
										<p style={{ color: url === v.link ? '#f70' : '' }}>{v.name}</p>
									</Link>
								)
							})
						}
					</div>
				</div>
				<div style={{ height: '13.333vmin' }}></div>
			</React.Fragment>
		);
	}
}


export default connect(({ shopping }: any) => ({
	shopping
}))(withRouter(TabBarExample));