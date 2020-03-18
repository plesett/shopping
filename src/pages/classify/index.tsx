import React from 'react';
import styles from './styles.scss';
import ClassifySort from './ClassifySort';
import { connect } from 'dva';
import ClassifyList from './ClassifyList';
import ClassifyRightList from './ClassifyRightList';

interface IClassifyProps {
  onClickUnfold?: Function | undefined;
  global: {
    isUnfold: boolean;
    isClassify: number;
  }
}

class Classify extends React.Component<IClassifyProps> {

  render() {
    const { isUnfold, isClassify } = this.props.global;
    return (
      <div className={styles.Classify}>
        <div className={styles.LeftList} id={isUnfold ? styles.alterList : ''}>
          <ClassifyList
            isUnfold={isUnfold}
            isClassify={isClassify}
          />
        </div>
        <div className={styles.Classify_body} style={{ width: isUnfold ? '88%' : '80%' }}>
          <div className={styles.RightSort}>
            <ClassifySort />
          </div>
          <div className={styles.RightList}>
            <div>
              <ClassifyRightList
                isUnfold={isUnfold}
                isClassify={isClassify}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ global }: any) => ({
  global,
}))(Classify);
