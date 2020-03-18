export interface IClassifyRightListtProps {
    isUnfold?: boolean;
    dispatch?: any;
    home?: any;
    classify: any;
    isClassify: number;
}

export interface IClassifyRightListtState {
    isText: Boolean;
    pageCount: number;
    pageClassifyCount: number;
}

export interface IClassifySortProps {
    dispatch?: any;
    global: {
        isClassify: number
    }
}