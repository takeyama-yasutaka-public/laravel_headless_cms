/*********************************
    インポート
*********************************/

//フック
import { bodyScrollStart } from '@/lib/bodyScroll';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function NavigationEvents() {
    const page = usePage();

    useEffect(() => {
        bodyScrollStart(true);
    }, [page.url]);

    return null;
}
