import { Modal } from './Modal';
interface ChangeModalPassProps {
    open: boolean;
    onClose: (v: boolean) => void;
}
export default function ChangeModalPass(props: ChangeModalPassProps) {
    const { open, onClose } = props;
    //логика хранения инпутов
    return (
        <Modal title="Сменить пароль" open={open} onClose={v => onClose(v)}>
            <label>
                Новый пароль
                <input type="text" />
            </label>
            <label>
                Повторите пароль
                <input type="text" />
            </label>
        </Modal>
    );
}