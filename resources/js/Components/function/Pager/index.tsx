/*********************************
    インポート
*********************************/

import * as Content from '@/Components/content/index';
import { router } from '@inertiajs/react';

/*********************************
    変数定義
*********************************/

type Props = {
    PER_PAGE: number;
    totalCount: number;
    path?: string;
    id?: number;
    query?: string;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Pager({
    totalCount,
    PER_PAGE,
    path = '/',
    id,
    query = '',
}: Props) {
    const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i);

    const rangeNum = range(1, Math.ceil(totalCount / PER_PAGE));
    const onePage = rangeNum.length === 1;
    const idNum = id ?? 1;
    const prevFlag = idNum === rangeNum[0];
    const nextFlag = idNum === rangeNum.at(-1);
    const prev = idNum - 1;
    const next = idNum + 1;

    function pages(c: number, n: number) {
        if (n < 6) return rangeNum;
        if (c < 5) return [1, 2, 3, 4, 5, 0, n];
        if (c > n - 4) return [1, 0, n - 4, n - 3, n - 2, n - 1, n];
        return [1, 0, c - 1, c, c + 1, 0, n];
    }

    const goToPage = (page: number) => {
        const params: Record<string, any> = { page };
        if (query) params.q = query;
        router.get(path, params);
    };

    return (
        <>
            {onePage || (
                <Content.Pager>
                    {!prevFlag && (
                        <Content.PagerItem
                            type="prev"
                            onClick={(e) => {
                                e.preventDefault();
                                goToPage(prev);
                            }}
                        />
                    )}
                    {pages(idNum, rangeNum.length).map((number, index) => {
                        if (number === idNum) {
                            return (
                                <Content.PagerItem
                                    type="current"
                                    key={index}
                                    number={number}
                                />
                            );
                        } else if (number >= 1) {
                            return (
                                <Content.PagerItem
                                    type="number"
                                    key={index}
                                    number={number}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        goToPage(number);
                                    }}
                                />
                            );
                        } else {
                            return (
                                <Content.PagerItem type="dots" key={index} />
                            );
                        }
                    })}
                    {!nextFlag && (
                        <Content.PagerItem
                            type="next"
                            onClick={(e) => {
                                e.preventDefault();
                                goToPage(next);
                            }}
                        />
                    )}
                </Content.Pager>
            )}
        </>
    );
}
