import axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router'
import { host } from '@/config/api';
import { message } from 'antd';

/**
 *
 * @param  {string} api       The URL we want to request
 *
 */

export default function request(api: string, method?: string, params?: {}) {
    const url = host + api;
    const token = window.localStorage.token;
    return axios(url, {
        headers: {
            token: token
        },
        method: method,
        params: params
    })
        .then((response: any) => {
            // 这里统一处理返回 未登录
            // 未登录 跳转登录页面
            // 清除本地token
            return response;
        })
        .catch((error: { response: any; }) => {
            const status = error.response.status;
            if (status === 401 || 403) {
                // 提示
                message.info('用户登录过期,请重新登录', 2)
                // 此处判断为未登录
                router.push('/login/')
                // 清除本地 token
                localStorage.removeItem('token');　　
                return;
            }
            if (status <= 504 && status >= 500) {
                // 处理500页面
                return;
            }
            if (status >= 404 && status < 422) {
                // 处理404页面
                router.push('/404/');
            }
        });
}