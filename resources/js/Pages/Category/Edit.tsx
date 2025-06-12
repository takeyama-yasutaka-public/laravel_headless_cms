import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function Edit({ category }: { category: any }) {
    const {
        data,
        setData,
        post: put_post,
        processing,
        errors,
    } = useForm({
        _method: 'PUT',
        name: category.name || '',
        slug: category.slug || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put_post(route('categories.update', category.id), {
            preserveScroll: true,
            onBefore: () => {
                setData('_method', 'PUT');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="カテゴリ編集" />

            <Layout.Container>
                <Layout.FormContent>
                    <form
                        onSubmit={handleSubmit}
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <input type="hidden" name="_method" value="PUT" />
                        <Layout.FormContentHeader>
                            <Content.Heading h="h2" modifier="third">
                                カテゴリ編集
                            </Content.Heading>
                        </Layout.FormContentHeader>

                        <Layout.FormContentBody>
                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="カテゴリ名" />

                                <Layout.FormUnitBody>
                                    <Form.FormText
                                        name="name"
                                        placeholder="カテゴリ名"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError message={errors.name} />
                            </Layout.FormUnit>

                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="スラッグ" />

                                <Layout.FormUnitBody>
                                    <Form.FormText
                                        name="slug"
                                        placeholder="スラッグ"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData('slug', e.target.value)
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError message={errors.slug} />
                            </Layout.FormUnit>
                        </Layout.FormContentBody>

                        <Layout.FormContentFooter>
                            <Content.ButtonGroup>
                                <Content.Button
                                    type="submit"
                                    modifierColor="success"
                                >
                                    更新
                                </Content.Button>
                            </Content.ButtonGroup>
                        </Layout.FormContentFooter>
                    </form>
                </Layout.FormContent>
            </Layout.Container>
        </AuthenticatedLayout>
    );
}
