import { bodyScrollStart } from '@/lib/bodyScroll';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
//コンポーネント
import * as Action from '@/Components/action/index';
import * as Content from '@/Components/content/index';
import * as Form from '@/Components/form/index';
import * as Layout from '@/Components/layout/index';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
        bodyScrollStart();
    };

    return (
        <>
            <Layout.ContentBody>
                <Content.Heading h="h2" modifier="third">
                    アカウントの削除
                </Content.Heading>
                <p>
                    アカウントを削除すると、すべてのリソースとデータが完全に削除されます。アカウントを削除する前に、必要なデータをダウンロードして保存してください。
                </p>
                <Content.Button
                    onClick={confirmUserDeletion}
                    modifierColor="alert"
                    modifierSize="small"
                >
                    アカウント削除
                </Content.Button>
            </Layout.ContentBody>

            <Action.Modal
                active={confirmingUserDeletion}
                onClose={() => setConfirmingUserDeletion(false)}
            >
                <form onSubmit={deleteUser}>
                    <Action.ModalHeader>
                        <Content.Heading h="h2" modifier="third">
                            アカウントを本当に削除しますか？
                        </Content.Heading>
                        <p>
                            アカウントを削除すると、すべてのリソースとデータが完全に削除されます。
                            <br />
                            本当にアカウントを永久に削除したい場合は、確認のためパスワードを入力してください。
                        </p>
                    </Action.ModalHeader>
                    <Action.ModalBody>
                        <Layout.FormUnit>
                            <Layout.FormUnitBody>
                                <Form.FormText
                                    type="password"
                                    name="パスワード"
                                    placeholder="パスワード"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    ref={passwordInput}
                                />
                            </Layout.FormUnitBody>
                            <Layout.FormUnitError message={errors.password} />
                        </Layout.FormUnit>
                    </Action.ModalBody>
                    <Action.ModalFooter>
                        <Content.ButtonGroup>
                            <Content.Button
                                type="button"
                                modifierColor="secondary"
                                modifierSize="small"
                                onClick={closeModal}
                            >
                                キャンセル
                            </Content.Button>
                            <Content.Button
                                type="submit"
                                modifierColor="alert"
                                modifierSize="small"
                            >
                                アカウント削除
                            </Content.Button>
                        </Content.ButtonGroup>
                    </Action.ModalFooter>
                </form>
            </Action.Modal>
        </>
    );
}
