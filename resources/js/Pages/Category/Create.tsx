import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="カテゴリ作成" />

            <Layout.Container>
                <Layout.FormContent>
                    <form onSubmit={handleSubmit}>
                        <Layout.FormContentHeader>
                            <Content.Heading h="h2" modifier="third">
                                カテゴリ作成
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
                            <Content.Button
                                type="submit"
                                modifierColor="success"
                            >
                                作成
                            </Content.Button>
                        </Layout.FormContentFooter>
                    </form>
                </Layout.FormContent>
            </Layout.Container>
        </AuthenticatedLayout>
    );
}
