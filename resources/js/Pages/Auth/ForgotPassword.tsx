import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Layout.Container>
                <Layout.FormContent>
                    <form onSubmit={submit}>
                        <Layout.FormContentHeader>
                            <Content.Heading h="h2" modifier="third">
                                パスワードをお忘れですか？
                            </Content.Heading>
                            <p>
                                ご登録のメールアドレスを入力していただければ、パスワード再設定用のリンクをお送りします。
                            </p>
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
                        </Layout.FormContentBody>

                        <Layout.FormContentFooter modifier="right">
                            <Content.Button type="submit" modifierSize="small">
                                パスワード再設定リンクを送信
                            </Content.Button>
                        </Layout.FormContentFooter>
                    </form>
                </Layout.FormContent>
            </Layout.Container>
        </GuestLayout>
    );
}
