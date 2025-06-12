/*********************************
    インポート
*********************************/

import * as Action from '@/Components/action/index';
import * as Content from '@/Components/content/index';

/*********************************
    変数定義
*********************************/

type Props = {
    active: boolean;
    onClose: () => void;
    onSelect: (path: string) => void;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function ImageModal({ active, onClose, onSelect }: Props) {
    return (
        <Action.Modal active={active} onClose={onClose}>
            <Action.ModalHeader>
                <Content.Heading h="h5" modifier="fifth">
                    画像を選択
                </Content.Heading>
            </Action.ModalHeader>

            <Action.ModalBody>
                <Action.ImageEdit
                    onSelect={(path) => {
                        onSelect(path);
                        onClose();
                    }}
                />
            </Action.ModalBody>
        </Action.Modal>
    );
}
