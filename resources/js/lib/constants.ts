/*********************************
    メタデータの定義
*********************************/

//ブレイクポイントの定義
export const breakpoint = {
    sp: '767.98px',
    pc: '768px',
};

//グローバルナビゲーションの定義
export const globalNavi = {
    items: [
        {
            id: 1,
            title: 'ブログ',
            path: 'posts.index',
        },
        {
            id: 2,
            title: 'カテゴリ',
            path: 'categories.index',
        },
        {
            id: 3,
            title: '人気の記事',
            path: 'ranking',
        },
        {
            id: 4,
            title: 'プロフィール',
            path: 'profile.edit',
        },
        {
            id: 5,
            title: 'ログアウト',
            path: 'logout',
            post: true,
        },
    ],
};
