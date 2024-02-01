import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Anchor } from '@mantine/core';
import classes from './styles.module.css';

interface Props {
  path?: string;
  title?: string;
  icon?: ReactNode;
}

export function MenuItem({ path, title, icon }: Props) {
  const location = useLocation();

  return (
    <Anchor
      className={classes.menuItem}
      component={Link}
      to={path as string}
      data-active={location.pathname.includes(path as string) || undefined}
    >
      {icon}
      {title}
    </Anchor>
  );
}
