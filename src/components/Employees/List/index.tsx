import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '@/components/__commons';
import { ListUsersResponse, User } from '@/core/domain/users';

interface Props {
  data?: ListUsersResponse;
  loading?: boolean;
  onPaginate?: (page: number) => void;
}

export function EmployeesList({ data, loading, onPaginate }: Props) {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('name', {
      id: 'activeName',
      header: 'Ativo',
    }),
  ];

  return (
    <Table<User>
      columns={columns}
      data={data?.items || []}
      loading={loading}
      pagination={{
        total: data?.pagination.pageCount || 1,
        onPaginate: (page) => onPaginate && onPaginate(page),
      }}
    />
  );
}
