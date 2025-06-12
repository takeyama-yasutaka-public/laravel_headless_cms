import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Layout.Container>
                <Layout.FormContent>
                    <form onSubmit={submit}>
                        <Layout.FormContentHeader>
                            <Content.Heading h="h2" modifier="third">
                                ログイン
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

                                <Layout.FormUnitBody>
                                    <Form.FormCheckbox
                                        name="ログイン状態を保持する"
                                        value="ログイン状態を保持する"
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                (e.target.checked ||
                                                    false) as false,
                                            )
                                        }
                                        checked={data.remember}
                                    />
                                </Layout.FormUnitBody>
                            </Layout.FormUnit>
                        </Layout.FormContentBody>

                        <Layout.FormContentFooter modifier="right">
                            {canResetPassword && (
                                <Link href={route('password.request')}>
                                    パスワードを忘れた方はこちら
                                </Link>
                            )}
                            <Content.Button type="submit" modifierSize="small">
                                ログイン
                            </Content.Button>
                        </Layout.FormContentFooter>
                    </form>
                </Layout.FormContent>
            </Layout.Container>
        </GuestLayout>
    );
}
