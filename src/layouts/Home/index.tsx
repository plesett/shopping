import React from 'react';
import styles from './style.scss';
import WarpTop from '@/comm/WarpTop';
import TabBarExample from '@/comm/Bar/index';

interface IHomeLayoutProps {
  children: any
}

class HomeLayout extends React.Component<IHomeLayoutProps> {
  render(){
    const path = this.props.children.props.location.pathname;
    return(
      <div id={styles.root}>
        <WarpTop
          path={path}
        />
        {
          this.props.children
        }
        <TabBarExample />
      </div>
    )
  }
}

export default HomeLayout;
