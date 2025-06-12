/*********************************
    インポート
*********************************/

//フック
import { router } from '@inertiajs/react';
import { FormEvent } from 'react';
//コンポーネント
import * as Form from '@/Components/form/index';

/*********************************
    変数定義
*********************************/

type Props = {
    defaultValue?: string;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Search({ defaultValue = '' }: Props) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const q = formData.get('q')?.toString() || '';
        router.get(route('posts.index'), { q });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Form.SearchBox
                name="q"
                placeholder="検索"
                defaultValue={defaultValue}
                modifier="max520"
                ariaLabel="検索する"
            />
        </form>
    );
}
