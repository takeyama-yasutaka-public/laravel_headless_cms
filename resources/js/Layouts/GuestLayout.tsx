import { PropsWithChildren } from 'react';
//コンポーネント
import * as Function from '@/Components/function/index';
import * as Layout from '@/Components/layout/index';
import { Suspense } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <Layout.Wrapper>{children}</Layout.Wrapper>

            <Suspense>
                <Function.NavigationEvents />
            </Suspense>
        </>
    );
}
