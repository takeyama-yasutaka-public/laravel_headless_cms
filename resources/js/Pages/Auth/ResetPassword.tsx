import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Layout.Container>
                <Layout.FormContent>
                    <form onSubmit={submit}>
                        <Layout.FormContentHeader>
                            <Content.Heading h="h2" modifier="third">
                                パスワードの再登録
                            </Content.Heading>
                        </Layout.FormContentHeader>

                        <Layout.FormContentBody>
                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="メールアドレス" />

                                <Layout.FormUnitBody>
                                    <Form.FormText
                                        name="メールアドレス"
                                        placeholder="example@mail.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError message={errors.email} />
                            </Layout.FormUnit>

                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="パスワード" />

                                <Layout.FormUnitBody>
                                    <Form.FormText
                                        type="password"
                                        name="パスワード"
                                        placeholder="パスワード"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError
                                    message={errors.password}
                                />
                            </Layout.FormUnit>

                            <Layout.FormUnit>
                                <Layout.FormUnitHeader label="パスワード（確認）" />

                                <Layout.FormUnitBody>
                                    <Form.FormText
                                        type="password"
                                        name="パスワード（確認）"
                                        placeholder="パスワード（確認）"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Layout.FormUnitBody>

                                <Layout.FormUnitError
                                    message={errors.password_confirmation}
                                />
                            </Layout.FormUnit>
                        </Layout.FormContentBody>

                        <Layout.FormContentFooter modifier="right">
                            <Content.Button type="submit" modifierSize="small">
                                パスワード再登録
                            </Content.Button>
                        </Layout.FormContentFooter>
                    </form>
                </Layout.FormContent>
            </Layout.Container>
        </GuestLayout>
    );
}
