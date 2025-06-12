import { PropsWithChildren, ReactNode } from 'react';
//コンポーネント
import * as Function from '@/Components/function/index';
import * as Layout from '@/Components/layout/index';
import { Suspense } from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <>
            <Layout.Header />

            <Layout.Wrapper>{children}</Layout.Wrapper>

            <Suspense>
                <Function.NavigationEvents />
            </Suspense>
        </>
    );
}
