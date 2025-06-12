/*********************************
    インポート
*********************************/

import * as Content from '@/Components/content/index';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

/*********************************
    変数定義
*********************************/

type Props = {
    onSelect: (path: string) => void;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function ImageEdit({ onSelect }: Props) {
    const [images, setImages] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const fetchImages = async () => {
        const res = await axios.get('/api/images');
        setImages(res.data.images);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async () => {
        if (!file) return;
        const form = new FormData();
        form.append('image', file);

        await axios.post('/api/images/upload', form);
        setFile(null);
        inputRef.current!.value = '';
        fetchImages();
    };

    const handleDelete = async (path: string) => {
        const ok = confirm(
            '画像を削除すると、その画像を参照してるページは表示できなくなります。よろしいですか？',
        );
        if (!ok) return;

        await axios.delete('/api/images/delete', {
            data: { path },
        });
        fetchImages();
    };

    return (
        <div className={styles.imageEdit}>
            <div className={styles.imageEditUpload}>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <div className={styles.imageEditUploadButtonWrapper}>
                    <Content.Button
                        type="button"
                        onClick={handleUpload}
                        modifierSize="small"
                    >
                        アップロード
                    </Content.Button>
                </div>
            </div>

            <div className={styles.imageEditList}>
                {images.map((path) => (
                    <div key={path} className={styles.imageEditListItem}>
                        <img src={`/storage/${path}`} alt="" />
                        <div className={styles.imageEditListItemButtonWrapper}>
                            <button
                                type="button"
                                onClick={() => onSelect(`/storage/${path}`)}
                            >
                                使用
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(path)}
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
