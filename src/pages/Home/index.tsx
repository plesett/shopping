import React from 'react';
import { BanenrText, Banner, HomeMenu } from './components';
import Commodity from './productInfo';
import { IHomeProps } from './type';


class Home extends React.Component<IHomeProps> {

  render() {
    return (
      <>
        <Banner />
        <HomeMenu />
        <BanenrText />
        <Commodity />
      </>
    )
  }
}

export default Home;