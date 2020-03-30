export interface IHomeProps {
    home: any,
    dispatch: any,
    global: {
        ishint: boolean;
        notice:any
    };
    user: {
        user_info: {
            uid: number;
            inform: number;
        }
    }
}

export interface ICommodityProps {
    dispatch?: any,
    home?: any;
    text: string;
}