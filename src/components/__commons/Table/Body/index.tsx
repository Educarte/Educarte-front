import {
  Center,
  Loader,
  Table as MantineTable,
  Stack,
  Text,
} from '@mantine/core';
import {
  ColumnDef,
  Table as ReactTable,
  flexRender,
} from '@tanstack/react-table';
import { RiFolder3Line } from 'react-icons/ri';

interface Props<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  table: ReactTable<T>;
  loading?: boolean;
}

export function TableBody<T>({ table, columns, loading }: Props<T>) {
  const { rows } = table.getRowModel();

  return (
    <MantineTable.Tbody>
      {loading && (
        <MantineTable.Tr>
          <MantineTable.Td colSpan={columns.length}>
            <Center h={200}>
              <Loader />
            </Center>
          </MantineTable.Td>
        </MantineTable.Tr>
      )}

      {!loading && rows.length === 0 && (
        <MantineTable.Tr>
          <MantineTable.Td colSpan={columns.length}>
            <Center h={200}>
              <Stack align="center">
                <RiFolder3Line color="dimmed" size={48} />
                <Text c="dimmed">Não há dados</Text>
              </Stack>
            </Center>
          </MantineTable.Td>
        </MantineTable.Tr>
      )}

      {!loading &&
        rows.map((row) => (
          <MantineTable.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <MantineTable.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </MantineTable.Td>
            ))}
          </MantineTable.Tr>
        ))}
    </MantineTable.Tbody>
  );
}
