import { useNavigate } from 'react-router-dom';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import {
  RiArrowDropDownLine,
  RiLogoutCircleLine,
  RiLockPasswordFill,
} from 'react-icons/ri';
import classes from './styles.module.css';
import { useAuth } from '@/core/contexts';
import { getFirstLetter } from '@/core/utils';
import { useDisclosure } from '@mantine/hooks';
import HeaderChangePasswordModal from './Modal';

export function UserDropdown() {
  const { user, onLogout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    onLogout(() => navigate('/login'));
  }

  const [passwordModalOpened, passwordModalAction] = useDisclosure(false);

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <Group className={classes.userDropdown} align="center">
              <Avatar bg="primary" color="white">
                {user && getFirstLetter(user?.name)}
              </Avatar>
              <Text>{user?.name}</Text>
              <RiArrowDropDownLine />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => passwordModalAction.open()}
            leftSection={<RiLockPasswordFill />}
          >
            Alterar senha
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<RiLogoutCircleLine />}
            onClick={() => handleLogout()}
          >
            Sair
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {user && (
        <>
          <HeaderChangePasswordModal
            opened={passwordModalOpened}
            onClose={passwordModalAction.close}
          />
        </>
      )}
    </>
  );
}
