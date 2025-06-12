import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Function from '@/Components/function/index';
import * as Layout from '@/Components/layout/index';
import { Link } from '@inertiajs/react';

type Category = {
    name: string;
};

type Post = {
    id: number;
    title: string;
    date: string;
    is_draft: boolean;
    categories: Category[];
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
    posts,
    query,
}: PageProps<{ posts: Paginated<Post>; query: string }>) {
    return (
        <AuthenticatedLayout>
            <Head title="ブログ一覧" />

            <Layout.Container>
                <Layout.Content>
                    <Layout.ContentHeader>
                        <Content.Heading h="h2" modifier="first">
                            ブログ一覧
                        </Content.Heading>
                    </Layout.ContentHeader>
                    <Layout.ContentBody>
                        <Content.Button href="posts.create">
                            新規作成
                        </Content.Button>
                        <Function.Search defaultValue={query} />
                        <Content.Table modifierDimension="vertical">
                            <thead>
                                <tr>
                                    <th>タイトル</th>
                                    <th>カテゴリ</th>
                                    <th>投稿日</th>
                                    <th>ステータス</th>
                                    <th>表示</th>
                                    <th>削除</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.data.map((post: any) => (
                                    <tr key={post.id}>
                                        <td>
                                            <Link
                                                href={`/posts/${post.id}/edit`}
                                            >
                                                {post.title}
                                            </Link>
                                        </td>
                                        <td>
                                            {post.categories
                                                .map((cat: any) => cat.name)
                                                .join(', ')}
                                        </td>
                                        <td>{post.date}</td>
                                        <td>
                                            {post.is_draft ? '下書き' : '公開'}
                                        </td>
                                        <td>
                                            <Content.Button
                                                modifierSize="small"
                                                modifierColor="info"
                                                onClick={() => {
                                                    const postUrl =
                                                        post.is_draft
                                                            ? `${import.meta.env.VITE_PREVIEW_BASE_URL}/blog/${post.id}/draft?draftKey=${import.meta.env.VITE_DRAFT_KEY}`
                                                            : `${import.meta.env.VITE_PREVIEW_BASE_URL}/blog/${post.id}`;
                                                    window.open(
                                                        postUrl,
                                                        '_blank',
                                                    );
                                                }}
                                            >
                                                表示
                                            </Content.Button>
                                        </td>
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
                                                                'posts.destroy',
                                                                post.id,
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
                            totalCount={posts.total}
                            PER_PAGE={posts.per_page}
                            id={posts.current_page}
                            path="/posts"
                            query={query}
                        />
                    </Layout.ContentFooter>
                </Layout.Content>
            </Layout.Container>
        </AuthenticatedLayout>
    );
}
