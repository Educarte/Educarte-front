import { Badge, darken } from '@mantine/core';

interface Props {
  active: boolean;
}

export function ActiveBadge({ active }: Props) {
  return (
    <Badge
      styles={(theme) => ({
        root: {
          width: '100%',
          borderRadius: theme.radius.sm,
          padding: theme.spacing.sm,
          background: active ? darken('#2EC96C', 0.5) : theme.colors.gray[7],
        },
        label: {
          textTransform: 'capitalize',
          color: active ? '#2EC96C' : theme.colors.gray[4],
        },
      })}
    >
      {active ? 'Ativo' : 'Inativo'}
    </Badge>
  );
}
