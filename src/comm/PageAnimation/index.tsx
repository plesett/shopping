import React from 'react';
import QueueAnim from 'rc-queue-anim';

export default class PageAnimation extends React.PureComponent {

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
		return (
			<div className="queue-demo">
				<QueueAnim
					className="demo-content"
					key="demo"
					type={['top', 'bottom']}
					ease={['easeOutQuart', 'easeInOutQuart']}
				>
					{this.state.show ? [
						<div className="demo-tbody" key="b">
							{this.props.children}
						</div>
					] : null}
				</QueueAnim>
			</div>
		);
	}
}
