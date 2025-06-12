/*********************************
    インポート
*********************************/

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.module.scss';

/*********************************
    変数定義
*********************************/

type Props = {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    name?: string;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function FormDatePicker({
    selected,
    onChange,
    placeholder = '日付を選択',
    name = 'date',
}: Props) {
    return (
        <div className={styles.datePickerWrapper}>
            <DatePicker
                selected={selected}
                onChange={onChange}
                dateFormat="yyyy-MM-dd"
                placeholderText={placeholder}
                name={name}
                className={styles.datePicker}
                autoComplete="off"
            />
        </div>
    );
}
