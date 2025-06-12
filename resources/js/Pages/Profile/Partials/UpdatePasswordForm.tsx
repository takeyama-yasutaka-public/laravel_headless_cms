import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword}>
            <Layout.FormContentHeader>
                <Content.Heading h="h2" modifier="third">
                    パスワードの更新
                </Content.Heading>
                <p>アカウントのパスワードを変更します。</p>
            </Layout.FormContentHeader>

            <Layout.FormContentBody>
                <Layout.FormUnit>
                    <Layout.FormUnitHeader label="現在のパスワード" />

                    <Layout.FormUnitBody>
                        <Form.FormText
                            type="password"
                            name="現在のパスワード"
                            placeholder="現在のパスワード"
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                        />
                    </Layout.FormUnitBody>

                    <Layout.FormUnitError message={errors.current_password} />
                </Layout.FormUnit>

                <Layout.FormUnit>
                    <Layout.FormUnitHeader label="新しいパスワード" />

                    <Layout.FormUnitBody>
                        <Form.FormText
                            type="password"
                            name="新しいパスワード"
                            placeholder="新しいパスワード"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                    </Layout.FormUnitBody>

                    <Layout.FormUnitError message={errors.password} />
                </Layout.FormUnit>

                <Layout.FormUnit>
                    <Layout.FormUnitHeader label="新しいパスワード（確認）" />

                    <Layout.FormUnitBody>
                        <Form.FormText
                            type="password"
                            name="新しいパスワード（確認）"
                            placeholder="新しいパスワード（確認）"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                    </Layout.FormUnitBody>

                    <Layout.FormUnitError
                        message={errors.password_confirmation}
                    />
                </Layout.FormUnit>
            </Layout.FormContentBody>

            <Layout.FormContentFooter>
                <Content.Button type="submit" modifierSize="small">
                    更新
                </Content.Button>
                {recentlySuccessful && <p>更新しました</p>}
            </Layout.FormContentFooter>
        </form>
    );
}
