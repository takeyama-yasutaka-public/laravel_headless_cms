import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//コンポーネント
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <form onSubmit={submit}>
            <Layout.FormContentHeader>
                <Content.Heading h="h2" modifier="third">
                    プロフィール情報
                </Content.Heading>
                <p>
                    アカウントのプロフィール情報とメールアドレスを更新します。
                </p>
            </Layout.FormContentHeader>

            <Layout.FormContentBody>
                <Layout.FormUnit>
                    <Layout.FormUnitHeader label="お名前" />

                    <Layout.FormUnitBody>
                        <Form.FormText
                            name="お名前"
                            placeholder="お名前"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </Layout.FormUnitBody>

                    <Layout.FormUnitError message={errors.name} />
                </Layout.FormUnit>

                <Layout.FormUnit>
                    <Layout.FormUnitHeader label="メールアドレス" />

                    <Layout.FormUnitBody>
                        <Form.FormText
                            name="メールアドレス"
                            placeholder="example@mail.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </Layout.FormUnitBody>

                    <Layout.FormUnitError message={errors.email} />
                </Layout.FormUnit>

                {/* {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )} */}
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
