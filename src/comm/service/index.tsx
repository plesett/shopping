import React from 'react';
import { Drawer } from 'antd';
import { CodePreview } from '@/utils/CodePreview';

interface IServiceProps {
	visible: boolean;
}

export default class ServiceInfo extends React.Component<IServiceProps> {

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
		return (
			<Drawer
				title="客服联系方式"
				placement='left'
				closable={false}
				onClose={this.onClose}
				visible={this.state.visible}
			>
				<p>微信: <CodePreview>ASDASD</CodePreview></p>
				<img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
				<p>QQ: <CodePreview>2413052113</CodePreview></p>
				<img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
				<p>物流客服: <CodePreview>2413052113</CodePreview> </p>
				<img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
			</Drawer>
		);
	}
}
