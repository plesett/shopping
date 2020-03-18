import React from 'react';
import styles from './style.scss';
import { Icon } from 'antd';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';

class ParticularsHeader extends React.Component<{ history: any}> {

    state = {
        isScroll: false
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this))
    }

    // 监听滑轮是否滑动
    handleScroll = (e: any) => {
        const ScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (ScrollTop > 60) {
            this.setState({
                isScroll: true,
            })
        } else {
            this.setState({
                isScroll: false
            })
        }

    }

    render() {
        const { isScroll } = this.state;
        const { history } = this.props;
        return (
            <div className={styles.ParticularsWarp} id={isScroll ? styles.ParticularsWarp_isScroll : ''}>
                <Link to='###' onClick={() => this.props.history.go(-1)} className={styles.WarpTop_back}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAmCAYAAADAzmuWAAAAAXNSR0IArs4c6QAAAWRJREFUSA211b1OwzAQAOA7t3RGCCRGJsTEXsFQXoEFeBEQiBFVghcBFnYmWJjYYAEmRiRAYi5JDl+KrZYkzflsPCTn/Hz+iX1BSFBouNAHQ7clRWYTDz/vTaxLp/Pbv2jPWj0w+QabUXCJEp6XIGsED4BzFxwiHzSlggI8g+kOcP/9jT0V3IaqYAkaDEvRIDgEFcOhqAjWoK2wFp0Jx6CNcCxaC6dAGZ7KFTXo0+Q25RekxW/pBnTL7X0p6J4r4dQo40jDxVWbQx9tzPmUy6sdfl/b0zHBc9zJdmzFobYpPIlFGZ/6eK61FGcDeffSQiOPER3T2dKyrysDg0cfL3am9ybwFSiym1j8f5ebG23KZed7nBqvwNxAip7XwinwRjgWnwnH4K2wFhfBGlwMh+JBcAgeDEtxFSzB1fkYD76u/mTFNciza5cV1TD3uoIjrAN97/K9KNjjBQ5szD+LERSdO77+A+K/AVtTYySpAAAAAElFTkSuQmCC" alt="" />
                </Link>
                {
                    isScroll && <div>商品详情</div>
                }
                <Link to="/">
                    <Icon type="home" />
                </Link>
            </div>
        );
    }
}

export default withRouter(ParticularsHeader);