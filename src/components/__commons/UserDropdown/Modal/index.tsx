import { Modal } from '@mantine/core';
import { HeaderChangePasswordModalProps } from './ChangePassword.types';
import ChangePasswordForm from '@/pages/Users/Form/ChangePassword';

const HeaderChangePasswordModal: React.FC<HeaderChangePasswordModalProps> = ({
  ...props
}) => {
  return (
    <Modal centered title="Alterar senha" {...props}>
      <ChangePasswordForm onClose={props.onClose} opened={false} />
    </Modal>
  );
};
export default HeaderChangePasswordModal;
