import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/

const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/lottery/',
          component: './Lottery/index',
        },
        {
          path: '/classify/',
          component: './classify/index',
        },
        {
          path: '/shopping/',
          component: './shopping/index',
        },
        {
          path: '/user/set/',
          component: './user/set/index',
          Routes: ['./src/PrivateTokenRouter.tsx'],
        },
        {
          path: '/user/shops/',
          component: './user/shops/index',
        },
        {
          path: '/user/purse/',
          component: './user/purse/index',
        },
        {
          path: '/user/scheduling/',
          component: './user/scheduling/index',
        },
        {
          path: '/user/pay/',
          component: './user/pay/index',
        },
        {
          path: '/user/',
          component: './user/index',
        },
        {
          path: '/login/',
          component: './login/index',
          Routes: ['./src/PrivateRoute.tsx'],
        },
        {
          path: '/register/',
          component: './register/index',
          Routes: ['./src/PrivateRoute.tsx'],
        },
        {
          path: '/affirm/',
          component: './affirm/index',
          Routes: ['./src/PrivateTokenRouter.tsx'],
        },
        {
          path: '/recoverPassword/',
          component: './recoverPassword/index',
          Routes: ['./src/PrivateRoute.tsx'],
        },
        {
          path: '/user/record/',
          component: './record/index',
        },
        {
          path: '/',
          component: './Home/index',
        },
        {
          path: '/Particulars/:index/:id',
          component: './Particulars/index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'h5',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
export default config;
