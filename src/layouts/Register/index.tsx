import React from 'react';
import WarpTop from '@/comm/WarpTop';
import withRouter from 'umi/withRouter';

interface IRegisterLayoutProps {
  children: any
  history: any
  onClickBack: () => void
}

class RegisterLayout extends React.Component<IRegisterLayoutProps> {
  onClickBack = () => {
    console.log(this.props);
    this.props.history.go(-1)
  }
  render() {
    const path = this.props.children.props.location.pathname;
    return (
      <div id="root">
        <WarpTop
          onClickBack={this.onClickBack}
          path={path}
        />
        {
          this.props.children
        }
      </div>
    )
  }
}

export default withRouter(RegisterLayout);
