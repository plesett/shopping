import React from 'react';
import { Drawer } from 'antd';
import { CodePreview } from '@/utils/CodePreview';
import { connect } from 'dva';

interface IServiceProps {
	visible: boolean;
	global: {
		notice: any
	}
}

class ServiceInfo extends React.Component<IServiceProps> {

	state = {
		visible: false
	}
	componentWillReceiveProps() {
		this.setState({
			visible: this.props.visible
		})
	}

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		const { global } = this.props;
		if (Boolean(global.notice)) {
			return (
				<Drawer
					title="客服联系方式"
					placement='left'
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<p>微信: <CodePreview>{global.notice.length > 0 && global.notice[2].notice}</CodePreview></p>
					<img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
					<p>QQ: <CodePreview>{global.notice.length > 0 && global.notice[3].notice}</CodePreview></p>
					<img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
					<p>物流客服: <CodePreview>{global.notice.length > 0 && global.notice[4].notice}</CodePreview> </p>
					<img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
				</Drawer>
			);
		} else {
			return null;
		}
	}
}

export default connect(({ global }: any) => ({
	global
}))(ServiceInfo);