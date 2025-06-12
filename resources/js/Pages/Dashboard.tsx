import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Layout from '@/Components/layout/index';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="管理者メニュー" />
            <Layout.Container>
                <Layout.Content>
                    <Layout.ContentHeader>
                        <Content.Heading h="h2" modifier="first">
                            管理者メニュー
                        </Content.Heading>
                    </Layout.ContentHeader>
                    <Layout.ContentBody>
                        <Content.Button href="posts.index">
                            ブログ一覧
                        </Content.Button>
                        <Content.Button href="categories.index">
                            カテゴリ一覧
                        </Content.Button>
                        <Content.Button href="ranking">
                            人気の記事
                        </Content.Button>
                    </Layout.ContentBody>
                </Layout.Content>
            </Layout.Container>
        </AuthenticatedLayout>
    );
}
