import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Layout from '@/Components/layout/index';

export default function Ranking({
    rankings,
}: PageProps<{ rankings: { id: number; title: string; pv: number }[] }>) {
    return (
        <AuthenticatedLayout>
            <Head title="人気の記事" />

            <Layout.Container>
                <Layout.Content>
                    <Layout.ContentHeader>
                        <Content.Heading h="h2" modifier="first">
                            人気の記事
                        </Content.Heading>
                    </Layout.ContentHeader>
                    <Layout.ContentBody>
                        <Content.Table modifierDimension="vertical">
                            <thead>
                                <tr>
                                    <th>順位</th>
                                    <th>タイトル</th>
                                    <th>PV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankings.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.pv}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Content.Table>
                    </Layout.ContentBody>
                </Layout.Content>
            </Layout.Container>
        </AuthenticatedLayout>
    );
}
