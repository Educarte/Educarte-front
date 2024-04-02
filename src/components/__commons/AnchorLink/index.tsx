import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, AnchorProps } from '@mantine/core';

interface Props {
  to: string;
  children: ReactNode | ReactNode[];
}

export function AnchorLink({ to, children, ...props }: Props & AnchorProps) {
  return (
    <Anchor component={Link} to={to} {...props}>
      {children}
    </Anchor>
  );
}
