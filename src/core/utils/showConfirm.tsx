import { ReactNode } from 'react';
import { modals } from '@mantine/modals';
import { Divider, Stack, Text } from '@mantine/core';

interface Props {
  title: string;
  message: string;
  icon?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function showConfirm({
  title,
  message,
  icon,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
}: Props) {
  return modals.openConfirmModal({
    title,
    centered: true,
    size: 400,
    labels: { cancel: cancelText, confirm: confirmText },
    cancelProps: { variant: 'outline' },
    onConfirm,
    onCancel,
    children: (
      <Stack gap="md" align="center">
        {icon}
        <Text fw={700} size="md" ta="center">
          {message}
        </Text>
        <Divider size="sm" color="red" />
      </Stack>
    ),
  });
}
