import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Minus, Plus } from "lucide-react";
import {
  HTMLProps,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

const MtrlManagementPage = () => {
  const rerender = useReducer(() => ({}), {})[1];

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ table }) => (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
            <span className="text-nowrap ml-2">First Name</span>
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <div>
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? (
                    <Minus className="bg-gray-200 rounded-sm" />
                  ) : (
                    <Plus className="bg-gray-200 rounded-sm" />
                  )}
                </button>
              ) : (
                ""
              )}{" "}
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{" "}
              {getValue<any>()}
            </div>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span className="text-nowrap ml-2">Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => <span className="text-nowrap ml-2">Age</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "address",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "address2",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "address3",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "address4",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = useState(() => {
    return [
      {
        name: "Nguyen Van A",
        age: 18,
        address: "T2 street",
        level: "parent",
        subRows: [
          {
            name: "Nguyen Van A-1",
            age: 18,
            address: "T2 street",
            level: "child",
          },
          {
            name: "Nguyen Van A-2",
            age: 18,
            address: "T2 street",
            level: "child",
          },
        ],
      },
      {
        name: "Nguyen Van B",
        age: 18,
        address: "T2 street",
        level: "parent",
        subRows: [
          {
            name: "Nguyen Van B-1",
            age: 18 - 1,
            address: "T2 street",
            level: "child",
          },
          {
            name: "Nguyen Van B-2",
            age: 18 - 2,
            address: "T2 street",
            level: "child",
          },
        ],
      },
    ];
  });
  const refreshData = () =>
    setData(() => {
      return [
        {
          name: "Nguyen Van A",
          age: 18,
          address: "T2 street",
          level: "parent",
          subRows: [
            {
              name: "Nguyen Van A-1",
              age: 18,
              address: "T2 street",
              level: "child",
            },
            {
              name: "Nguyen Van A-2",
              age: 18,
              address: "T2 street",
              level: "child",
            },
          ],
        },
        {
          name: "Nguyen Van B",
          age: 18,
          address: "T2 street",
          level: "parent",
          subRows: [
            {
              name: "Nguyen Van B-1",
              age: 18 - 1,
              address: "T2 street",
              level: "child",
            },
            {
              name: "Nguyen Van B-2",
              age: 18 - 2,
              address: "T2 street",
              level: "child",
            },
          ],
        },
      ];
    });

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // filterFromLeafRows: true,
    // maxLeafRowFilterDepth: 0,
    debugTable: true,
  });

  console.log("table", table);

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="min-h-[400px] h-[70vh] w-full border bg-red-50 rounded-xl shadow-lg relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className="min-w-[20vw] px-6 py-3 border"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={
                      "border-b dark:bg-gray-800 dark:border-gray-700 " +
                      `${
                        row.getCanExpand()
                          ? "bg-white"
                          : "bg-sky-200 dark:bg-gray-200"
                      }`
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* <div className="p-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>{table.getRowModel().rows.length} Rows</div>
          <div>
            <button onClick={() => rerender()}>Force Rerender</button>
          </div>
          <div>
            <button onClick={() => refreshData()}>Refresh Data</button>
          </div>
          <label>Expanded State:</label>
          <pre>{JSON.stringify(expanded, null, 2)}</pre>
          <label>Row Selection State:</label>
          <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
        </div> */}
      </div>
    </>
  );
};

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 h-8 text-sm border shadow rounded-lg p-1"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 h-8 text-sm border shadow rounded-lg p-1"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 h-8 text-sm border shadow rounded-lg p-1"
    />
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

export default MtrlManagementPage;
