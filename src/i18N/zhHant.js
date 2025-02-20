import { zhHant } from 'vuetify/locale'

export default {
  $vuetify: zhHant,
  nav: {
    groupList: '揪團列表',
    groupCreate: '主辦揪團',
    membersSection: '會員專區',
    adminSection: '管理',
    contactUs: '聯絡我們',
    login: '會員登入',
    register: '會員註冊',
    logout: '登出',
    adminGroups: '揪團管理',
    adminUsers: '會員管理',
    adminContacts: '聯絡表單管理',
    home: '首頁',
    groupCreate: '主辦揪團',
    memberIndex: '會員專區',
    contact: '聯絡我們',
    groupDetail: '揪團詳情',
    memberInfo: '個人資訊',
    memberTag: '個人標籤',
  },
  register: {
    submit: 'REGISTER',
    success: '註冊成功',
  },
  login: {
    submit: 'LOGIN',
    success: '登入成功',
  },
  logout: {
    success: '登出成功',
  },
  user: {
    name: '姓名',
    namePlaceholder: '請輸入暱稱',
    account: '帳號',
    accountPlaceholder: '請輸入帳號',
    email: '電子郵件',
    loginPlaceholder: '請輸入電子信箱',
    password: '密碼',
    passwordPlaceholder: '請輸入密碼',
    passwordConfirm: '確認密碼',
    passwordConfirmPlaceholder: '請輸入密碼',
    gender: '性別',
    age: '年齡',
    cancel: '取消',
    submit: '確認',
    genderMale: '男',
    genderFemale: '女',
  },
  member: {
    index: '會員專區',
    organizer: '主辦的揪團',
    groupEdit: '編輯',
    groupView: '頁面',
    contactUs: '聯絡我們',
    participant: '參加的揪團',
    userEdit: '編輯個人資訊',
    cancelEdit: '取消變更',
    submitEdit: '確認變更',
    tagEdit: '編輯標籤',
    TagInfo: '可以新增 {variable} 個標籤',
    tagSetting: '設定個人標籤',
    tagPlaceHolder: '請輸入適合的標籤',
    tagEditSuccess: '標籤編輯成功',
  },
  admin: {
    index: '管理',
    groupNew: '新增揪團',
    groupEdit: '編輯',
    groupDelete: '刪除',
    groupDeleted: '刪除成功',
    groupTag: '揪團標籤',
    groupTagInfo: '請選擇最適合的標籤，您最多可以新增 {variable} 個標籤。',
    groupPlaceHolder: '請輸入適合揪團的標籤',
    groupContent: '揪團內文',
    groupImageRequired: '揪團圖片必填',
    groupTagRequired: '標籤必填',
    userNew: '新增會員',
    userEdit: '編輯會員',
    userDelete: '刪除',
    userId: '會員ID',
    userName: '名稱',
    userAge: '年齡',
    userGender: '姓別',
    userEmail: '電子信箱',
    userRole: '權限',
    userRoleUser: '使用者',
    userRoleMember: '會員',
    userRoleAdmin: '管理員',
    userCreateSuccess: '新增成功',
    userEditSuccess: '編輯成功',
    userCreated: '新增成功',
    userImageInvalid: '圖片格式錯誤，只能上傳jpeg、png格式',
    userImageMaxSize: '圖片大小超過1MB限制',
    unknownError: '未知錯誤',
    contactName: '暱稱',
    contactEmail: '電子郵件',
    contactTitle: '主旨',
    contactDescription: '內容',
    contactDate: '建立時間',
    contactView: '查看',
    contactDelete: '刪除',
    contactDeleted: '刪除成功',
  },
  adminGroup: {
    new: '新增揪團',
    edit: '編輯揪團',
    groupContent: '揪團內文',
    cancel: '取消',
    submit: '確認',
    newSuccess: '新增成功',
    editSuccess: '編輯成功',
  },
  adminContact: {
    view: '聯絡表單',
  },
  fileAgent: {
    helpText: '點擊或拖曳檔案至此',
    errorType: '檔案類型錯誤',
    errorSize: '檔案大小超過限制',
    upload: '上傳',
    uploadImage: '上傳圖片',
    uploadFailed: '上傳失敗',
    uploadSuccess: '上傳成功',
    uploadImageFailed: '圖片上傳失敗',
    uploadImageSuccess: '圖片上傳成功',
  },
  contact: {
    nickname: '暱稱',
    nicknameRequired: '暱稱必填',
    email: '電子郵件',
    emailRequired: '電子郵件必填',
    title: '主旨',
    titleRequired: '主旨必填',
    description: '訊息內容',
    descriptionRequired: '訊息內容必填',
    success: '訊息已送出',
  },
  api: {
    userAccountRequired: '請輸入用戶名',
    userAccountTooShort: '使用者帳號太短',
    userAccountTooLong: '使用者帳號太長',
    userAccountDuplicate: '使用者帳號重複',
    userAccountInvalid: '使用者帳號格式不符',
    userEmailRequired: '電子郵件必填',
    userEmailInvalid: '電子郵件格式不符',
    userPasswordRequired: '密碼必填',
    userPasswordTooLong: '密碼太長',
    userPasswordTooShort: '密碼太短',
    userPasswordInvalid: '密碼錯誤',
    userPasswordNotMatch: '密碼不符',
    samePassword: '新舊密碼相同',
    userNameRequired: '姓名必填',
    userNameInvalid: '姓名格式不符',
    userNotFound: '查無使用者',
    userTokenInvalid: '使用者驗證錯誤',
    userTokenExpired: '使用者驗證過期',
    userPermissionDenied: '使用者權限不足',
    userNotInGroup: '使用者不在揪團中',
    userGenderRequired: '性別必填',
    userGenderInvalid: '性別格式錯誤',
    userAgeRequired: '年齡必填',
    userAgeInvalid: '年齡格式錯誤',
    userEditSuccess: '編輯資訊成功',
    chatMessageRequired: '請輸入訊息',
    chatAlreadyExists: '聊天室已存在',
    formNickNameRequired: '請輸入暱稱',
    formEmailRequired: '請輸入電子郵件',
    formEmailInvalid: '電子郵件格式錯誤',
    formTitleRequired: '請輸入標題',
    formDescriptionRequired: '請輸入內容',
    requestFormatError: '請求格式錯誤',
    imageRequired: '揪團圖片必填',
    serverError: '伺服器錯誤',
    invalidInput: '輸入錯誤',
    groupNotFound: '查無揪團',
    notOrganizer: '非揪團主辦人',
    unknownError: '未知錯誤',
    uploadFailed: '上傳失敗',
    contentRequired: '揪團內文必填',
  },
  group: {
    organizerIdRequired: '主辦者ID必填',
    organizerNameRequired: '主辦者名稱必填',
    idRequired: '揪團ID必填',
    name: '揪團名稱',
    namePlaceholder: '請輸入揪團名稱',
    organizerName: '主辦者',
    time: '日期',
    memberLimit: '人數',
    type: '方式',
    createdType: '揪團類型',
    address: '揪團地址',
    addressPlaceholder: '請輸入揪團地址',
    nameRequired: '揪團名稱必填',
    nameMinLength: '揪團名稱太短',
    imageRequired: '揪團圖片必填',
    description: '揪團簡介',
    descriptionPlaceholder: '請輸入揪團簡介',
    descriptionRequired: '揪團簡介必填',
    descriptionMinLength: '揪團簡介太短',
    contentRequired: '揪團詳情必填',
    contentMinLength: '揪團詳情太短',
    id: '揪團 ID',
    createdAt: '建立時間',
    updatedAt: '更新時間',
    image: '揪團圖片',
    typeRequired: '揪團類型必填',
    online: '線上',
    offline: '線下',
    memberCountMin: '成員數量不得少於 1 人',
    maxMembersRequired: '請設定成員上限',
    maxMembersMin: '成員上限不得少於 2 人',
    groupFull: '揪團已達人數上限',
    memberLimitRequired: '人數上限必填',
    memberLimitMin: '人數上限不得少於 2 人',
    contactMethod: '聯絡方式',
    contactMethodRequired: '聯絡方式必填',
    contactInfo: '聯絡資訊',
    contactInfoPlaceholder: '請輸入聯絡資訊',
    contactInfoRequired: '聯絡資訊必填',
    contactInfominLength: '聯絡資訊太短',
    city: '縣市',
    cityRequired: '選擇縣市必填',
    region: '地區',
    createdRegion: '揪團地區',
    regionRequired: '選擇地區必填',
    addressRequired: '輸入地址必填',
    userGenderRequired: '性別必填',
    userAgeRequired: '年齡必填',
    tagsRequired: '標籤必填',
    tagsMinItems: '標籤太少',
    date: '揪團日期',
    dateRequired: '揪團日期必填',
    time: '揪團時間',
    timeRequired: '揪團時間必填',
    startTime: '開始時間',
    uploadFailed: '上傳失敗',
    idInvalid: '揪團 ID 格式錯誤',
    notFound: '查無資料',
    alreadyJoined: '已加入揪團',
    alreadyOrganized: '已經是揪團主辦人',
    selectSure: '確定',
    selectCancel: '取消',
    end: '揪團已結束',
    full: '揪團已滿',
    loginRequired: '請先登入',
    step1Title: '揪團資訊',
    createStep1: 'STEP 1 設定揪團資訊',
    createStep2: 'STEP 2 設定揪團標籤',
    createStep3: 'STEP 3 設定揪團詳情',
    createStep4: 'STEP 4 頁面預覽',
    createStep5: 'STEP 5 主辦揪團成功',
    step1Error: '揪團資訊錯誤',
    step2Error: '揪團標籤錯誤',
    step3Error: '揪團詳情錯誤',
    next: '下一步',
    previous: '上一步',
    groupTag: '揪團標籤',
    groupTagInfo: '請選擇最適合的標籤，您最多可以新增 {variable} 個標籤。',
    groupPlaceHolder: '請輸入適合揪團的標籤',
    tagRequired: '揪團標籤未設定',
    detail: '揪團詳情',
    detailIllustrateLine1: '請為主辦的揪團添加內容詳情',
    detailIllustrateLine2: '有詳細的內容與照片，可以讓人更了解您的揪團',
    createSuccess: '揪團建立成功',
    formError: '資料錯誤',
  },
  tab: {
    group: '揪團資訊',
    tag: '揪團標籤',
    content: '揪團內文',
  },
  tag: {
    computer: '電腦',
    mobile: '手機',
    console: '主機',
    virtualReality: '虛擬現實',
    augmentedReality: '擴增實境',
    webGame: '網遊',
    Adventure: '冒險類',
    RPG: '角色扮演類',
    simulation: '模擬類',
    sportsAndRacing: '運動與競速類',
    puzzleAndParty: '益智與派對類',
    musicAndRhythm: '音樂與節奏類',
    sandboxAndOpenWorld: '沙盒與開放世界類',
    scienceFictionAndFantasy: '科幻與奇幻類',
    EducationAndExperimental: '教育與實驗類',
    massiveMultiplayer: '大型多人類',
  },
  area: {
    taipei: '臺北市',
    newTaipei: '新北市',
    keeLung: '基隆市',
    taoyuan: '桃園市',
    hsinchuCounty: '新竹縣',
    hsinchu: '新竹市',
    miaoli: '苗栗縣',
    taichung: '臺中市',
    nantou: '南投縣',
    changhua: '彰化縣',
    yunlin: '雲林縣',
    chiayi: '嘉義市',
    chiayiCounty: '嘉義縣',
    tainan: '臺南市',
    kaohsiung: '高雄市',
    pingtung: '屏東縣',
    yilan: '宜蘭縣',
    hualien: '花蓮縣',
    taitung: '臺東縣',
    penghu: '澎湖縣',
    kinmen: '金門縣',
    lienchiang: '連江縣',
    // taipei 臺北市
    taipei_zhongzheng: '中正區',
    taipei_datong: '大同區',
    taipei_zhongshan: '中山區',
    taipei_wanhua: '萬華區',
    taipei_xinyi: '信義區',
    taipei_songshan: '松山區',
    taipei_daan: '大安區',
    taipei_nangang: '南港區',
    taipei_beitou: '北投區',
    taipei_neihu: '內湖區',
    taipei_shilin: '士林區',
    taipei_wenshan: '文山區',
    // newTaipei 新北市
    newTaipei_banqiao: '板橋區',
    newTaipei_xinzhuang: '新莊區',
    newTaipei_taishan: '泰山區',
    newTaipei_linkou: '林口區',
    newTaipei_tamsui: '淡水區',
    newTaipei_jinshan: '金山區',
    newTaipei_bali: '八里區',
    newTaipei_wanli: '萬里區',
    newTaipei_shimen: '石門區',
    newTaipei_sanzhi: '三芝區',
    newTaipei_ruifang: '瑞芳區',
    newTaipei_xizhi: '汐止區',
    newTaipei_pingxi: '平溪區',
    newTaipei_gongliao: '貢寮區',
    newTaipei_shuangxi: '雙溪區',
    newTaipei_shenkeng: '深坑區',
    newTaipei_shiding: '石碇區',
    newTaipei_xindian: '新店區',
    newTaipei_pinglin: '坪林區',
    newTaipei_wulai: '烏來區',
    newTaipei_zhonghe: '中和區',
    newTaipei_yonghe: '永和區',
    newTaipei_tucheng: '土城區',
    newTaipei_sanxia: '三峽區',
    newTaipei_shulin: '樹林區',
    newTaipei_yingge: '鶯歌區',
    newTaipei_sanchong: '三重區',
    newTaipei_luzhou: '蘆洲區',
    newTaipei_wugu: '五股區',
    // keeLung 基隆市
    keeLung_renai: '仁愛區',
    keeLung_zhongzheng: '中正區',
    keeLung_xinyi: '信義區',
    keeLung_zhongshan: '中山區',
    keeLung_anle: '安樂區',
    keeLung_nuanNuan: '暖暖區',
    keeLung_qidu: '七堵區',
    // taoyuan 桃園市
    taoyuan_district: '桃園區',
    taoyuan_zhongli: '中壢區',
    taoyuan_pingzhen: '平鎮區',
    taoyuan_bade: '八德區',
    taoyuan_yangmei: '楊梅區',
    taoyuan_luzhu: '蘆竹區',
    taoyuan_guishan: '龜山區',
    taoyuan_longtan: '龍潭區',
    taoyuan_daxi: '大溪區',
    taoyuan_dayuan: '大園區',
    taoyuan_guanyin: '觀音區',
    taoyuan_xinwu: '新屋區',
    taoyuan_fuxing: '復興區',
    // hsinchuCounty 新竹縣
    hsinchuCounty_zhupei: '竹北市',
    hsinchuCounty_zhudong: '竹東鎮',
    hsinchuCounty_xinpu: '新埔鎮',
    hsinchuCounty_guanxi: '關西鎮',
    hsinchuCounty_emei: '峨眉鄉',
    hsinchuCounty_baoshan: '寶山鄉',
    hsinchuCounty_beipu: '北埔鄉',
    hsinchuCounty_hengshan: '橫山鄉',
    hsinchuCounty_qionglin: '芎林鄉',
    hsinchuCounty_hukou: '湖口鄉',
    hsinchuCounty_xinfeng: '新豐鄉',
    hsinchuCounty_jianxi: '尖石鄉',
    hsinchuCounty_wufeng: '五峰鄉',
    // hsinchu 新竹市
    hsinchu_east: '東區',
    hsinchu_north: '北區',
    hsinchu_xiangshan: '香山區',
    // miaoli 苗栗縣
    miaoli_city: '苗栗市',
    miaoli_tongxiao: '通霄鎮',
    miaoli_yuanli: '苑裡鎮',
    miaoli_zhunan: '竹南鎮',
    miaoli_toufen: '頭份鎮',
    miaoli_houlung: '後龍鎮',
    miaoli_zhuolan: '卓蘭鎮',
    miaoli_xihu: '西湖鄉',
    miaoli_touwu: '頭屋鄉',
    miaoli_gongguan: '公館鄉',
    miaoli_tongluo: '銅鑼鄉',
    miaoli_sanyi: '三義鄉',
    miaoli_zaoqiao: '造橋鄉',
    miaoli_sanwan: '三灣鄉',
    miaoli_nanzhuang: '南庄鄉',
    miaoli_dahu: '大湖鄉',
    miaoli_shitan: '獅潭鄉',
    miaoli_taian: '泰安鄉',
    // taichung 臺中市
    taichung_central: '中區',
    taichung_east: '東區',
    taichung_south: '南區',
    taichung_west: '西區',
    taichung_north: '北區',
    taichung_beitun: '北屯區',
    taichung_xitun: '西屯區',
    taichung_nantun: '南屯區',
    taichung_taiping: '太平區',
    taichung_dali: '大里區',
    taichung_wufeng: '霧峰區',
    taichung_wuri: '烏日區',
    taichung_fengyuan: '豐原區',
    taichung_houli: '后里區',
    taichung_dongshi: '東勢區',
    taichung_shigang: '石岡區',
    taichung_xinshe: '新社區',
    taichung_heping: '和平區',
    taichung_shengang: '神岡區',
    taichung_tanzi: '潭子區',
    taichung_daya: '大雅區',
    taichung_dadu: '大肚區',
    taichung_longjing: '龍井區',
    taichung_shalu: '沙鹿區',
    taichung_wuq: '梧棲區',
    taichung_qingshui: '清水區',
    taichung_dajia: '大甲區',
    taichung_waipu: '外埔區',
    taichung_daan: '大安區',
    // nantou 南投縣
    nantou_city: '南投市',
    nantou_puli: '埔里鎮',
    nantou_caotun: '草屯鎮',
    nantou_zhushan: '竹山鎮',
    nantou_jiji: '集集鎮',
    nantou_mingjian: '名間鄉',
    nantou_lugu: '鹿谷鄉',
    nantou_zhongliao: '中寮鄉',
    nantou_yuchi: '魚池鄉',
    nantou_guoxing: '國姓鄉',
    nantou_shuili: '水里鄉',
    nantou_xinyi: '信義鄉',
    nantou_renai: '仁愛鄉',
    // changhua 彰化縣
    changhua_city: '彰化市',
    changhua_yuanlin: '員林鎮',
    changhua_hemei: '和美鎮',
    changhua_lugang: '鹿港鎮',
    changhua_xihu: '溪湖鎮',
    changhua_erlin: '二林鎮',
    changhua_tianzhong: '田中鎮',
    changhua_beidou: '北斗鎮',
    changhua_huatan: '花壇鄉',
    changhua_fenyuan: '芬園鄉',
    changhua_dacun: '大村鄉',
    changhua_yongjing: '永靖鄉',
    changhua_shengang: '伸港鄉',
    changhua_xianxi: '線西鄉',
    changhua_fuxing: '福興鄉',
    changhua_xiushui: '秀水鄉',
    changhua_puxin: '埔心鄉',
    changhua_puyan: '埔鹽鄉',
    changhua_dacheng: '大城鄉',
    changhua_fangyuan: '芳苑鄉',
    changhua_zhutang: '竹塘鄉',
    changhua_shetou: '社頭鄉',
    changhua_ershui: '二水鄉',
    changhua_tianwei: '田尾鄉',
    changhua_bitou: '埤頭鄉',
    changhua_xizhou: '溪州鄉',
    // yunlin 雲林縣
    yunlin_douliu: '斗六市',
    yunlin_dounan: '斗南鎮',
    yunlin_huwei: '虎尾鎮',
    yunlin_xiluo: '西螺鎮',
    yunlin_tuku: '土庫鎮',
    yunlin_beigang: '北港鎮',
    yunlin_citong: '莿桐鄉',
    yunlin_linnei: '林內鄉',
    yunlin_gukeng: '古坑鄉',
    yunlin_dapi: '大埤鄉',
    yunlin_lunbei: '崙背鄉',
    yunlin_erlun: '二崙鄉',
    yunlin_mailiao: '麥寮鄉',
    yunlin_taixi: '臺西鄉',
    yunlin_dongshi: '東勢鄉',
    yunlin_baozhong: '褒忠鄉',
    yunlin_sihu: '四湖鄉',
    yunlin_kouhu: '口湖鄉',
    yunlin_shuilin: '水林鄉',
    yunlin_yuanZhang: '元長鄉',
    // chiayi 嘉義市
    chiayi_taibao: '太保市',
    chiayi_putzu: '朴子市',
    chiayi_budai: '布袋鎮',
    chiayi_dalin: '大林鎮',
    chiayi_minxiong: '民雄鄉',
    chiayi_xikou: '溪口鄉',
    chiayi_xingang: '新港鄉',
    chiayi_liujiao: '六腳鄉',
    chiayi_dongshi: '東石鄉',
    chiayi_yizhu: '義竹鄉',
    chiayi_lukang: '鹿草鄉',
    chiayi_shuishang: '水上鄉',
    chiayi_zhongpu: '中埔鄉',
    chiayi_zhuxi: '竹崎鄉',
    chiayi_meishan: '梅山鄉',
    chiayi_fanlu: '番路鄉',
    chiayi_dapu: '大埔鄉',
    chiayi_ali: '阿里山鄉',
    // chiayiCounty 嘉義縣
    chiayi_east: '東區',
    chiayi_west: '西區',
    // tainan 臺南市
    tainan_middlewest: '中西區',
    tainan_east: '東區',
    tainan_south: '南區',
    tainan_north: '北區',
    tainan_anping: '安平區',
    tainan_annan: '安南區',
    tainan_yongkang: '永康區',
    tainan_guiren: '歸仁區',
    tainan_xinhua: '新化區',
    tainan_zuozhen: '左鎮區',
    tainan_yujing: '玉井區',
    tainan_nanxi: '楠西區',
    tainan_nanhua: '南化區',
    tainan_rende: '仁德區',
    tainan_guanmiao: '關廟區',
    tainan_longxi: '龍崎區',
    tainan_guanTian: '官田區',
    tainan_madou: '麻豆區',
    tainan_jiali: '佳里區',
    tainan_xigang: '西港區',
    tainan_qigu: '七股區',
    tainan_jiangjun: '將軍區',
    tainan_xuejia: '學甲區',
    tainan_beimen: '北門區',
    tainan_xinying: '新營區',
    tainan_houbi: '後壁區',
    tainan_baihe: '白河區',
    tainan_dongshan: '東山區',
    tainan_liujia: '六甲區',
    tainan_xiaying: '下營區',
    tainan_yanshui: '鹽水區',
    tainan_shanhua: '善化區',
    tainan_danei: '大內區',
    tainan_shanshang: '山上區',
    tainan_xinshi: '新市區',
    tainan_anding: '安定區',
    // kaohsiung 高雄市
    kaohsiung_nanzi: '楠梓區',
    kaohsiung_zuoying: '左營區',
    kaohsiung_gushan: '鼓山區',
    kaohsiung_sanmin: '三民區',
    kaohsiung_yancheng: '鹽埕區',
    kaohsiung_qianjin: '前金區',
    kaohsiung_xinxing: '新興區',
    kaohsiung_lingya: '苓雅區',
    kaohsiung_qianzhen: '前鎮區',
    kaohsiung_xiaogang: '小港區',
    kaohsiung_qijin: '旗津區',
    kaohsiung_fengshan: '鳳山區',
    kaohsiung_daliao: '大寮區',
    kaohsiung_niaosong: '鳥松區',
    kaohsiung_linyuan: '林園區',
    kaohsiung_renwu: '仁武區',
    kaohsiung_dashu: '大樹區',
    kaohsiung_dashei: '大社區',
    kaohsiung_gangshan: '岡山區',
    kaohsiung_luzhu: '路竹區',
    kaohsiung_qiaotou: '橋頭區',
    kaohsiung_zhiguan: '梓官區',
    kaohsiung_mituo: '彌陀區',
    kaohsiung_yongan: '永安區',
    kaohsiung_yanchao: '燕巢區',
    kaohsiung_tianliao: '田寮區',
    kaohsiung_alian: '阿蓮區',
    kaohsiung_jiaDing: '茄萣區',
    kaohsiung_lunei: '湖內區',
    kaohsiung_qishan: '旗山區',
    kaohsiung_meinong: '美濃區',
    kaohsiung_neimen: '內門區',
    kaohsiung_shanlin: '杉林區',
    kaohsiung_jiaxian: '甲仙區',
    kaohsiung_liugui: '六龜區',
    kaohsiung_maolin: '茂林區',
    kaohsiung_taoyuan: '桃源區',
    kaohsiung_namasia: '那瑪夏區',
    // pingtung 屏東縣
    pingtung_city: '屏東市',
    pingtung_chaozhou: '潮州鎮',
    pingtung_donggang: '東港鎮',
    pingtung_hengchun: '恆春鎮',
    pingtung_wandan: '萬丹鄉',
    pingtung_changzhi: '長治鄉',
    pingtung_linluo: '麟洛鄉',
    pingtung_jiuru: '九如鄉',
    pingtung_ligang: '里港鄉',
    pingtung_yanpu: '鹽埔鄉',
    pingtung_gaoshu: '高樹鄉',
    pingtung_wanluan: '萬巒鄉',
    pingtung_neipu: '內埔鄉',
    pingtung_zhutian: '竹田鄉',
    pingtung_fangliao: '枋寮鄉',
    pingtung_xinyuan: '新園鄉',
    pingtung_kanding: '崁頂鄉',
    pingtung_linbian: '林邊鄉',
    pingtung_nanzhou: '南州鄉',
    pingtung_jiaDong: '佳冬鄉',
    pingtung_liuQiu: '琉球鄉',
    pingtung_checheng: '車城鄉',
    pingtung_manzhou: '滿州鄉',
    pingtung_fangshan: '枋山鄉',
    pingtung_wutai: '霧台鄉',
    pingtung_majia: '瑪家鄉',
    pingtung_taiwu: '泰武鄉',
    pingtung_laiyi: '來義鄉',
    pingtung_chunri: '春日鄉',
    pingtung_shizi: '獅子鄉',
    pingtung_mutan: '牡丹鄉',
    pingtung_sandimen: '三地門鄉',
    // yilan 宜蘭縣
    yilan_city: '宜蘭市',
    yilan_luodong: '羅東鎮',
    yilan_suao: '蘇澳鎮',
    yilan_toucheng: '頭城鎮',
    yilan_jiaoxi: '礁溪鄉',
    yilan_zhuangwei: '壯圍鄉',
    yilan_yuanshan: '員山鄉',
    yilan_dongshan: '冬山鄉',
    yilan_wujie: '五結鄉',
    yilan_sanxing: '三星鄉',
    yilan_datong: '大同鄉',
    yilan_nanao: '南澳鄉',
    // hualien 花蓮縣
    hualien_city: '花蓮市',
    hualien_fenglin: '鳳林鎮',
    hualien_yuli: '玉里鎮',
    hualien_xincheng: '新城鄉',
    hualien_jian: '吉安鄉',
    hualien_shoufeng: '壽豐鄉',
    hualien_xiulin: '秀林鄉',
    hualien_guangfu: '光復鄉',
    hualien_fengbin: '豐濱鄉',
    hualien_ruisui: '瑞穗鄉',
    hualien_wanrong: '萬榮鄉',
    hualien_fuli: '富里鄉',
    hualien_zhuoxi: '卓溪鄉',
    // taitung 臺東縣
    taitung_city: '臺東市',
    taitung_success: '成功鎮',
    taitung_guanshan: '關山鎮',
    taitung_changbin: '長濱鄉',
    taitung_haiduan: '海端鄉',
    taitung_chishang: '池上鄉',
    taitung_donghe: '東河鄉',
    taitung_luye: '鹿野鄉',
    taitung_yanping: '延平鄉',
    taitung_beinan: '卑南鄉',
    taitung_jinfeng: '金峰鄉',
    taitung_dawu: '大武鄉',
    taitung_daren: '達仁鄉',
    taitung_greenIsland: '綠島鄉',
    taitung_lanyu: '蘭嶼鄉',
    taitung_taimali: '太麻里鄉',
    // penghu 澎湖縣
    penghu_magong: '馬公市',
    penghu_huxi: '湖西鄉',
    penghu_baisha: '白沙鄉',
    penghu_xiyu: '西嶼鄉',
    penghu_wangan: '望安鄉',
    penghu_qimei: '七美鄉',
    // kinmen 金門縣
    kinmen_jincheng: '金城鎮',
    kinmen_jinhu: '金湖鎮',
    kinmen_jinsha: '金沙鎮',
    kinmen_jinning: '金寧鄉',
    kinmen_lieyu: '烈嶼鄉',
    kinmen_wuqiu: '烏坵鄉',
    // lienchiang 連江縣
    lienchiang_nangan: '南竿鄉',
    lienchiang_beigan: '北竿鄉',
    lienchiang_juguang: '莒光鄉',
    lienchiang_dongyin: '東引鄉',
  },
}
