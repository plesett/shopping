import React from 'react';
import { Button, Col, Row } from 'antd';
import style from './style.scss';
import router from 'umi/router';
import { connect } from 'dva';
import { host } from '@/config/api';
import Link from 'umi/link';

interface ILoginMenuInfoProps {
	dispatch: any
	user: {
		user_info: {
			username: string;
			mobile: number;
			upfile: string;
			balance: number;
			login_time: string;
			state: number;
			nickname: string | null;
			uid: number;
		}
	}
}

class LoginMenuInfo extends React.Component<ILoginMenuInfoProps> {

	componentDidMount() {
		const { dispatch } = this.props;
		// 检测本地是否存在token
		const token = localStorage.getItem("token");
		if (token !== null) {
			// 请求该用户数据
			dispatch({
				type: 'user/fetch_user_info',
				token: token
			})
			return
		}
		router.push('/login/')
	}

	render() {
		const { user } = this.props;
		const { username, mobile, upfile, balance, login_time, state, nickname, uid } = user.user_info;
		return (
			<div className={style.User_box}>
				<Row>
					<Col className={style.set}>
						<Link to="/user/set">
							<img
								src={require('@/assets/set.svg')}
								alt=""
							/>
						</Link>
					</Col>
				</Row>
				<Row>
					<Col className={style.userInfo}>
						<div className={style.imgInfo}>
							<img src={host + upfile} alt="" />
						</div>
						<div className={style.basicInfo}>
							<div>{nickname ? nickname : mobile}</div>
							<div>UID: {uid}</div>
							<div style={{ color: '#fff' }}>{username}</div>
						</div>
					</Col>
				</Row>
				<Row type='flex' justify='space-around'
					style={{
						backgroundColor: '#fff',
						alignItems: 'center'
					}}
				>
					<Col
						style={{
							padding: '3vmin 0'
						}}
					>
						<div>
							<div>账户余额</div>
							<div style={{
								color: '#f70',
								textAlign: 'center',
								marginTop: '1vmin'
							}}>{balance}.00</div>
						</div>
					</Col>
					<Col>
						<Link to="/user/pay/">
							<Button className={style.UpButton}>去充值</Button>
						</Link>
					</Col>
				</Row>
			</div>
		);
	}
}


export default connect(({ user }: any) => ({
	user
}))(LoginMenuInfo);