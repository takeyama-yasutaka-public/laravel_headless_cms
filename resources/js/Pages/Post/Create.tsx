import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
//コンポーネント
import * as Action from '@/Components/action/index';
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function Create({ categories }: { categories: any[] }) {
    const [showEyecatchModal, setShowEyecatchModal] = useState(false);
    const [submitFlag, setSubmitFlag] = useState<boolean | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        date: null as Date | null,
        content: '',
        eyecatch: '' as string,
        categories: [] as number[],
        is_draft: false as boolean,
    });

    useEffect(() => {
        if (submitFlag !== null) {
            post(route('posts.store'), {
                preserveScroll: true,
            });
            setSubmitFlag(null);
        }
    }, [data.is_draft, submitFlag]);

    const handleSubmit = (isDraft: boolean) => {
        setData('is_draft', isDraft);
        setSubmitFlag(true);
    };

    return (
        <AuthenticatedLayout>
            <Head title="ブログ投稿" />

            <Layout.Container>
                <Layout.FormContent>
                    <form>
                        <Layout.FormContentHeader>
                            <Content.Heading h="h2" modifier="third">
                                ブログ投稿
                            </Content.Heading>
                        </Layout.FormContentHeader>

                        <Layout.FormContentBody>
                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="タイトル" />

                                <Layout.FormUnitBody>
                                    <Form.FormText
                                        name="title"
                                        placeholder="タイトル"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError message={errors.title} />
                            </Layout.FormUnit>

                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="カテゴリ" />

                                <Layout.FormUnitBody>
                                    <Form.FormCheckboxGroup>
                                        {categories.map((cat) => (
                                            <Form.FormCheckbox
                                                name="category"
                                                value={cat.name}
                                                onChange={(e) => {
                                                    const newCats = e.target
                                                        .checked
                                                        ? [
                                                              ...data.categories,
                                                              cat.id,
                                                          ]
                                                        : data.categories.filter(
                                                              (id) =>
                                                                  id !== cat.id,
                                                          );
                                                    setData(
                                                        'categories',
                                                        newCats,
                                                    );
                                                }}
                                                checked={data.categories.includes(
                                                    cat.id,
                                                )}
                                                key={cat.id}
                                            />
                                        ))}
                                    </Form.FormCheckboxGroup>
                                </Layout.FormUnitBody>
                            </Layout.FormUnit>

                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="投稿日" />

                                <Layout.FormUnitBody>
                                    <Form.FormDatePicker
                                        selected={data.date}
                                        onChange={(date) =>
                                            setData('date', date)
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError message={errors.date} />
                            </Layout.FormUnit>

                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="アイキャッチ" />

                                <Layout.FormUnitBody>
                                    {data.eyecatch && (
                                        <img
                                            src={`${data.eyecatch}`}
                                            alt="アイキャッチ画像"
                                            width={600}
                                        />
                                    )}
                                    <Content.Button
                                        type="button"
                                        modifierSize="small"
                                        onClick={() =>
                                            setShowEyecatchModal(true)
                                        }
                                    >
                                        画像を選ぶ
                                    </Content.Button>
                                    <input
                                        type="hidden"
                                        name="eyecatch"
                                        value={data.eyecatch || ''}
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError
                                    message={errors.eyecatch}
                                />
                            </Layout.FormUnit>

                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="内容" />

                                <Layout.FormUnitBody>
                                    <Form.FormEditor
                                        value={data.content}
                                        onChange={(val) =>
                                            setData('content', val)
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError
                                    message={errors.content}
                                />
                            </Layout.FormUnit>
                        </Layout.FormContentBody>

                        <Layout.FormContentFooter>
                            <Content.ButtonGroup>
                                <Content.Button
                                    type="button"
                                    modifierColor="success"
                                    onClick={() => handleSubmit(false)}
                                >
                                    投稿
                                </Content.Button>
                                <Content.Button
                                    type="button"
                                    modifierColor="default"
                                    onClick={() => handleSubmit(true)}
                                >
                                    下書き保存
                                </Content.Button>
                            </Content.ButtonGroup>
                        </Layout.FormContentFooter>
                    </form>
                </Layout.FormContent>
            </Layout.Container>

            <Action.ImageModal
                key={showEyecatchModal ? 'open' : 'closed'}
                active={showEyecatchModal}
                onClose={() => setShowEyecatchModal(false)}
                onSelect={(path) => setData('eyecatch', path)}
            />
        </AuthenticatedLayout>
    );
}
