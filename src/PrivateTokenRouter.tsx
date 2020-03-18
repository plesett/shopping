import React from 'react';
import { Route, Redirect } from 'dva/router';

const AuthRouter = (props: { route: any; }) => {
    const { route } = props;
    // 判断是否存在token
    const token = localStorage.getItem("token");
    // 存在 跳转首页
    return (
        token !== null ? <Route {...route} /> : <Redirect to="/" />
    )
}

export default AuthRouter;