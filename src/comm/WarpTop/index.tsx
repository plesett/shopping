import React from 'react';
import styles from './style.scss';
import { connect } from 'dva';

interface IWarpTopProps {
  dispatch: any;
  path?: string | undefined;
  onClickBack?: () => void
  router: {
    location: {
      pathname: string
    }
  }
}

class WarpTop extends React.Component<IWarpTopProps> {

  onClickUnfold = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/alter'
    })
  }

  render() {
    const token = localStorage.getItem("token");
    const { router } = this.props;
    const { pathname } = router.location;
    return (
      <>
        {
          token === null || pathname !== '/user/'?
            <>
              <div className={styles.WarpTop}>
                <div onClick={this.props.onClickBack} className={styles.WarpTop_back}>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAmCAYAAADAzmuWAAAAAXNSR0IArs4c6QAAAlRJREFUSA2118+LEmEYB/DmdXBYBPsBIorhQTBXCERB89aC2L0N6eChf6dj3Tp0jUXrMiexQ2sQsoKu0Bq0oiFrIKNbZOToOmrPM+2IP1Z35p239yCO4ud9fd95v8+83A0TLZPJWPr9/s1EIvHQ6/W+Qardbj8WRfEjoXU1NJlMPrtEBbAEq9WaEATBytPAi6jH43kOhuooitIuFosfJpOJYBheRTmOUw1Zln/m8/kXkiSdWyyWkSF4EzoYDH7kcrmX3W73ZDqddmaz2QWndyp0oEeAngIqORwOWRdsFE2lUpNrYRoUZ2ErTItuhc2gG2Gz6JUwC3QNZoUuwSzROcwaVeH/gSJMME8x+jCltEBZ2PtL2xR3FP5ITyOBQODBIjocDvuXgUKNYsfE5/M91UaKH9Tr9cNer/cFAuWbFihGRooGtrXY5Hn+D3T0HSpB1263yzQowqRWqx3ByBS8wAb/4FEwGLz174r+lTSbzeNyuXwAuLowMNI7sVjsld/v34Xg3sG7hoYnUKfOK5WKCPhbDYfp8MTj8YNQKHSfFic4lwCeAv5uFY9GoxlanMAC/YIRnrHG1aDXdh9My124I/zhcHg/Eok8gffq/GJZL5VKqWq1+hnrmZ47ZV5BWONzGFeeJb4Es8TXYFb4lTALfCNsFt8Km8GvhWlxXTANrju5stnsLJ1OX4zH4xEUAaXT6UjYocvl2oUdSqDZnU7nHjwnv2+1Wr91w4hswMdut/sefM3DA/dtm80mNxqNT4bPIJgTK8ElFgqF1xBiWCxGcLj5ikeFv0H4VK4U1WQpAAAAAElFTkSuQmCC" alt="" />
                </div>
                <div className={styles.WarpTop_text}>小劵商城</div>
                {/* <div>清空</div> */}
                {
                  this.props.path === '/classify/' &&
                  <div onClick={this.onClickUnfold} style={{ lineHeight: 4 }}>
                    <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="column-width" width="1em" height="1em" fontSize="24" fill="currentColor" aria-hidden="true"><path d="M180 176h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zm724 0h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zM785.3 504.3L657.7 403.6a7.23 7.23 0 00-11.7 5.7V476H378v-62.8c0-6-7-9.4-11.7-5.7L238.7 508.3a7.14 7.14 0 000 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h268v62.8c0 6 7 9.4 11.7 5.7l127.5-100.8c3.8-2.9 3.8-8.5.2-11.4z"></path></svg>
                  </div>
                }

              </div>
              <div style={{ height: 44 }}></div>
            </>
            :
            null
        }
      </>
    );
  }
}

export default connect(({ router }: any) => ({
  router
}))(WarpTop);