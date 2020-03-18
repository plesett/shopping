import React from 'react';
import styles from './styles.scss';
import Link from 'umi/link';
import Mune_classify from './mock';
import { connect } from 'dva';


// 左侧侧边栏
class ClassifyList extends React.Component<{ isUnfold: boolean, isClassify: number, dispatch: any }> {

    state = {
        count: 0
    }

    onClickClassify = (id: number, code: number) => {
        const { dispatch } = this.props;
        this.setState({ count: id })
        // 发送请求数据
        dispatch({
            type: 'classify/fetch_classify_code',
            code: code
        })
        // 当前所处分类
        dispatch({
            type: 'global/isClassify',
            code: code
        })
    }

    render() {
        const { isUnfold, isClassify } = this.props;
        return (
            <div className={styles.ClassifyList}>
                {
                    Mune_classify.map((v) => {
                        return (
                            <Link
                                to={`#${v.name}`}
                                key={v.id}
                                className={styles.ClassifyList_item}
                                id={isUnfold ? styles.ClassifyList_item_unfold : ''}
                                onClick={() => this.onClickClassify(v.id, v.code)}
                                style={{
                                    color: isClassify === v.code ? '#f70' : '',
                                    borderRight: isClassify === v.code ? 'none' : '',
                                    backgroundColor: isClassify === v.code ? '#fff' : '',
                                }}
                            >
                                {
                                    isUnfold && <img src={this.state.count === v.id ? v.action_icon : v.icon} alt="" />
                                }
                                {v.name}
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(({ classify }: any) => ({
    classify
}))(ClassifyList);
