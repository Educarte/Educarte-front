import { Flex, Table as MantineTable, Pagination, Stack } from '@mantine/core';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { TableHeader } from './Header';
import { TableBody } from './Body';

interface Props<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  pagination?: {
    total: number;
    onPaginate: (page: number) => void;
  };
  loading?: boolean;
}

export function Table<T>({ columns, data, pagination, loading }: Props<T>) {
  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack gap="md">
      <MantineTable verticalSpacing="md">
        <TableHeader table={table} />
        <TableBody table={table} columns={columns} loading={loading} />
      </MantineTable>
      {pagination && (
        <Flex justify="center">
          <Pagination
            total={pagination.total}
            onChange={pagination.onPaginate}
          />
        </Flex>
      )}
    </Stack>
  );
}
