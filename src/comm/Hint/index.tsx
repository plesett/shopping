import React from 'react';
import styles from './styles.scss';
import { Card, Icon, Row } from 'antd';

interface IHintProps {
  CloseHint: () => void;
}

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1721616_wx36y92i1b.js',
});

export default class Hint extends React.Component<IHintProps> {

  render() {
    return (
      <React.Fragment>
        <Card
          className={styles.hint}
        >
          <IconFont
            type="icon-guanbi"
            className={styles.hintIcon}
            onClick={this.props.CloseHint}
          />
          <div>通知:</div>
        </Card>
      </React.Fragment>
    );
  }
}
