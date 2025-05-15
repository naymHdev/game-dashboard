import { Table, TablePaginationConfig } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Meta {
  page: number;
  limit: number;
  total: number;
}

interface DataTableProps<T> {
  columns: ColumnsType<T>;
  data?: T[];
  pageSize?: number;
  usersData?: {
    allUsers: T[];
    meta: Meta;
  };
}

const DataTable = <T extends { id?: string }>({
  columns,
  data,
  usersData,
}: DataTableProps<T>) => {
  const dataSource = usersData?.allUsers || data || [];

  const pagination: TablePaginationConfig | false = usersData
    ? {
        current: usersData.meta.page,
        pageSize: usersData.meta.limit,
        total: usersData.meta.total,
        onChange: (page, pageSize) => {
          console.log("Page changed to", page, "with pageSize", pageSize);
        },
      }
    : false;

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      rowKey={(record) => record.id || Math.random().toString()}
      scroll={{ x: "max-content" }}
    />
  );
};

export default DataTable;
