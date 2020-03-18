import React from 'react';
import QueueAnim from 'rc-queue-anim';

export default class PageAnimation extends React.PureComponent<{ children: any }, { show: boolean; }> {
	state = {
		show: true
	};
	componentWillUnmount() {
		this.OutPage()
	}
	OutPage = () => {
		this.setState({
			show: !this.state.show
		});
	}
	render() {
		const { show } = this.state;
		return (
			<div className="queue-demo">
				<QueueAnim
					className="demo-content"
					key="demo"
					type={['top', 'bottom']}
					ease={['easeOutQuart', 'easeInOutQuart']}
				>
					{show ? [
						<div className="demo-tbody" key="b">
							{this.props.children}
						</div>
					] : null}
				</QueueAnim>
			</div>
		);
	}
}
