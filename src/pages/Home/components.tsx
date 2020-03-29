import React, { useState } from 'react';
import styles from './comonentsStyle.scss';
import Link from 'umi/link';
import { Carousel, Icon, message  } from 'antd';
import TextScroll from 'react-textscroll';
import ServiceInfo from '@/comm/service';

// 主页 轮播图
export const Banner = () => {
    return (
        <div className={styles.Banner}>
            <Carousel autoplay>
                <div>
                    <img src="http://cdn.wdhkdjj.com/images/focus/20191219/5dfb3c14a7e6e.jpeg?x-oss-process=image/resize,w_600" alt="" />
                </div>
                <div>
                    <img src="http://cdn.wdhkdjj.com/images/focus/20191219/5dfb3c14a7e6e.jpeg?x-oss-process=image/resize,w_600" alt="" />
                </div>
                <div>
                    <img src="http://cdn.wdhkdjj.com/images/focus/20191219/5dfb3c14a7e6e.jpeg?x-oss-process=image/resize,w_600" alt="" />
                </div>
                <div>
                    <img src="http://cdn.wdhkdjj.com/images/focus/20191219/5dfb3c14a7e6e.jpeg?x-oss-process=image/resize,w_600" alt="" />
                </div>
            </Carousel>
        </div>
    )
}

// 主页 导航菜单
export const HomeMenu = () => {
    const [visible, setvisible] = useState(false);
    const IconFont = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1721616_8i3emvldyzw.js',
    });
    function CopyText(){
        var copyDOM = document.getElementById("share");  //需要复制文字的节点  
        var range = document.createRange(); //创建一个range
        document.getSelection()?.removeAllRanges();   //清楚页面中已有的selection
        range.selectNode(copyDOM);    // 选中需要复制的节点    
        document.getSelection()?.addRange(range);   // 执行选中元素
        var successful = document.execCommand('copy');    // 执行 copy 操作  
        if (successful) {
            message.success('复制成功！快去分享吧！')
        } else {
            message.warning('复制失败，请重新复制！')
        }
        // 移除选中的元素  
        document.getSelection()?.removeAllRanges();
    }
    return (
        <div className={styles.HomeMenu}>
            <Link to="">
                <IconFont type="icon-xinshou" />
                <div className={styles.HomeMenu_text}>新手</div>
            </Link>
            <Link to="">
                <IconFont type="icon-xinpin" />
                <div id="aa" className={styles.HomeMenu_text}>新品</div>
            </Link>
            <Link to="###" onClick={() => setvisible(!visible)}>
                <ServiceInfo visible={visible} />
                <IconFont type="icon-kefu" />
                <div className={styles.HomeMenu_text}>客服</div>
            </Link>
            <Link to="">
                <IconFont type="icon-icon-" />
                <div className={styles.HomeMenu_text}>玩法</div>
            </Link>
            <Link to="###" onClick={CopyText}>
                <IconFont type="icon-fenxiang" />
                <div className={styles.HomeMenu_text}>收藏分享</div>
                <div id="share" className={styles.HomeMenu_Copy}>快来一起加入我们吧 http://192.168.31.23:8000</div>
            </Link>
        </div>
    )
}

// 主页 轮播信息
export const BanenrText = () => {
    const text = ['券小劵自助兑换升级版，公平、公正、天天惊喜、惊喜无限！客服小妹QQ：84101677！']
    return (
        <div className={styles.BanenrText}>
            <div className={styles.BanenrText_roll}>
                <TextScroll
                    mode='horizontal'
                    text={text}
                    speed={7000}
                />
            </div>
        </div>
    )
}

