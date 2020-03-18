import React from 'react';
import ParticularsHeader from './componets';

export default class ParticularsLayout extends React.Component {
  render() {
    return (
      <div>
        <ParticularsHeader />
        {
          this.props.children
        }
      </div>
    );
  }
}
 