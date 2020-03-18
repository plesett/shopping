import React from 'react';
import HomeLayout from '@/layouts/Home/';
import ParticularsLayout from './Particulars';
import RegisterLayout from './Register';
import 'antd/dist/antd.css';


export default function (props: any) {
    if (props.location.pathname === '/' || props.location.pathname === '/lottery/' || props.location.pathname === '/shopping/' || props.location.pathname === '/classify/' || props.location.pathname === '/user/') {
        return <HomeLayout>{props.children}</HomeLayout>
    } 

    if (props.location.pathname.indexOf('/Particulars/') !== -1) {
        return <ParticularsLayout>{props.children}</ParticularsLayout>
    }

    if (props.location.pathname === '/register/' || '/affirm/') {
        return <RegisterLayout>{props.children}</RegisterLayout>
    }
    
    else {
        return props.children
    }
}