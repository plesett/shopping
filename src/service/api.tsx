import request from "@/utils/request"

// 主页列表数据
export async function Get_Home_Data(page: number, per_page?: number) {
    return request(`/product_list?page=${page}${per_page ? '&per_page=' + per_page : ''}`)
}

// 商品详情
export async function Get_product_info(product_id: number) {
    return request(`/product_details?product_id=${product_id}`)
}

// 获取开奖信息 15min 刷新
export async function Get_lottery_Data() {
    return request('/lottery')
}

// 获取历史开奖信息 
export async function Get_lottery_forget(page: number, per_page?: number) {
    return request(`/lottery/forget?page=${page}${per_page ? ' & per_page=' + per_page : ''}`)
}

// 获取分类code信息
export async function Get_classify_code_Data(code: number) {
    return request(`/classify_menu?classify_code=${code}`)
}

// 即将揭晓
export async function Get_classify_unveiled(code: number) {
    return request(code ? `/classify_unveiled?classify_code=${code}` : `/classify_unveiled`)
}

// 人气
export async function Get_classify_moods(code: number) {
    return request(code ? `/classify_moods?classify_code=${code}` : `/classify_moods`)
}

// 最新
export async function Get_classify_new(code: number) {
    return request(code ? `/classify_new?classify_code=${code}` : `/classify_new`)
}

// 价格
export async function Get_classify_price(classify_code: number, type: 'desc' | 'asc') {
    if (type || classify_code !== null) {
        return request(`/classify_price?type=${type}&classify_code=${classify_code}`)
    }
    else if (classify_code !== null || type !== null) {
        return request(`/classify_price?type=${type}`)
    }
}

// 购物车


// 注册
export async function User_register(mobile: number, pass: string, code: number) {
    return request(`/register?mobile=${mobile}&password=${pass}&code=${code}`, 'POST')
}

// 登录
export async function User_login(mobile: string, pass: string) {
    return request(`/login?mobile=${mobile}&password=${pass}`, 'POST')
}

// 忘记密码
export async function USer_Forget(mobileValue: string, newPassValue: string, codeValue: string) {
    return request(`/forgetPass?mobile=${mobileValue}&pass=${newPassValue}&code=${codeValue}`, 'POST')
}

// 注销
export async function Login_out(token: string | null) {
    return request(`/login_out?token=${token}`, 'POST')
}

// 发送短信
export async function send_Code(mobile: number, type?: 'forget') {
    return request(`/sms?mobile=${mobile}${type ? '&type=forget' : ''}`)
}

// 获取支付连接
export async function Get_Pay_Url(uid: number, money: number, type: number) {
    return request(`/user/pay?uid=${uid}&money=${money}&type=${type}&`, 'POST')
}

// 获取用户个人信息
export async function User_Info(token: string) {
    return request(`/user/info?token=${token}`)
}

// 更新个人信息
export async function User_Info_Update(nickname: string, sex: any, uid: number) {
    return request(`/user/update?nickname=${nickname}&sex=${sex}&uid=${uid}`, 'PUT')
}

// 修改密码
export async function User_Update_Pass(uid: number, formerPass: string, newPass: string) {
    return request(`/user/password?uid=${uid}&formerPass=${formerPass}&newPass=${newPass}`, 'POST')
}

// 提交订单
export async function Push_Sn(uid: number, total: number, data: string) {
    return request(`/shop/sn?uid=${uid}&total=${total}&data=${data}`, 'POST')
}

// 用户获得所有的商品记录
export async function Record_Product(uid: number) {
    return request(`/user/record?uid=${uid}`, 'GET')
}

// 获取中奖商品
export async function Acquisition_Product(uid: number) {
    return request(`/user/shops?uid=${uid}`, 'GET')
}