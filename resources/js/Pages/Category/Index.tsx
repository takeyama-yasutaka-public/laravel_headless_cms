import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Function from '@/Components/function/index';
import * as Layout from '@/Components/layout/index';
import { Link } from '@inertiajs/react';

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    path: string;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};

export default function Index({
    categories,
}: PageProps<{ categories: Paginated<Category> }>) {
    return (
        <AuthenticatedLayout>
            <Head title="カテゴリ一覧" />

            <Layout.Container>
                <Layout.Content>
                    <Layout.ContentHeader>
                        <Content.Heading h="h2" modifier="first">
                            カテゴリ一覧
                        </Content.Heading>
                    </Layout.ContentHeader>
                    <Layout.ContentBody>
                        <Content.Button href="categories.create">
                            新規作成
                        </Content.Button>
                        <Content.Table modifierDimension="vertical">
                            <thead>
                                <tr>
                                    <th>カテゴリ名</th>
                                    <th>スラッグ</th>
                                    <th>削除</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.map((category: any) => (
                                    <tr key={category.id}>
                                        <td>
                                            <Link
                                                href={`/categories/${category.id}/edit`}
                                            >
                                                {category.name}
                                            </Link>
                                        </td>
                                        <td>{category.slug}</td>
                                        <td>
                                            <Content.Button
                                                modifierColor="alert"
                                                modifierSize="small"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            '本当に削除しますか？',
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                'categories.destroy',
                                                                category.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                            >
                                                削除
                                            </Content.Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Content.Table>
                    </Layout.ContentBody>
                    <Layout.ContentFooter>
                        <Function.Pager
                            totalCount={categories.total}
                            PER_PAGE={categories.per_page}
                            id={categories.current_page}
                            path="/categories"
                        />
                    </Layout.ContentFooter>
                </Layout.Content>
            </Layout.Container>
        </AuthenticatedLayout>
    );
}
