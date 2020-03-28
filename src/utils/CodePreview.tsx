import React from 'react';
import { Typography } from 'antd';
// copy
export const CodePreview = ({ children }:any) => (
    <pre>
        <code>
            <Typography.Text copyable>{children}</Typography.Text>
        </code>
    </pre>
);