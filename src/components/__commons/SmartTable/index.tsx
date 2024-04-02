import { Flex, Pagination, Stack, Group, Text } from '@mantine/core';
import {
  DataTable,
  DataTableColumn,
  DataTableRowExpansionProps,
} from 'mantine-datatable';
import { RiFolder3Line } from 'react-icons/ri';
import classes from './SmartTable.module.css';
interface Props<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetching: boolean | undefined;
  columns: DataTableColumn<T>[];
  records: T[];
  rowExpansion?: DataTableRowExpansionProps<T>;
  pagination?: {
    total: number;
    onPaginate: (page: number) => void;
  };
}

export function SmartTable<T>({
  pagination,
  fetching,
  columns,
  records,
  rowExpansion,
}: Props<T>) {
  return (
    <Stack gap="md">
      <DataTable
        classNames={{
          header: classes.header,
        }}
        minHeight={!records.length ? 300 : 0}
        verticalSpacing={'md'}
        fetching={fetching}
        columns={columns}
        records={records}
        rowExpansion={rowExpansion}
        emptyState={
          <Group>
            <Stack align="center">
              <RiFolder3Line color="dimmed" size={48} />
              <Text c="dimmed">Não há dados</Text>
            </Stack>
          </Group>
        }
      />
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
