import { useEffect, useRef, useState } from "react";
import {
  ColumnDefinition,
  reactFormatter,
  ReactTabulator,
} from "react-tabulator";
import "tabulator-tables/dist/css/tabulator_midnight.min.css"; // Chọn một theme tabulator phù hợp
// Hoặc import trực tiếp theme CSS mong muốn từ thư mục dist/css

function SimpleButton(props: any) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Edit | Show";
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

function fakeApiCall(delayInSeconds = 20) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("run");
      resolve(true); // Trả về dữ liệu sau khi delay
    }, delayInSeconds * 1000); // Chuyển đổi giây sang mili giây
  });
}

const MtrlManagementV2Page = () => {
  const [tableData, setTableData] = useState([
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
    },
  ]);

  const columns: ColumnDefinition[] = [
    {
      title: "Name",
      field: "name",
      width: 200,
      responsive: 0,
      headerFilter: "input",
    }, //never hide this column
    {
      title: "",
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      cellClick: function (e, cell) {
        console.log("cell", cell.getRow());
        cell.getRow().toggleSelect();
      },
    },
    { title: "Location", field: "location", width: 150 },
    { title: "Gender", field: "gender", width: 150, responsive: 2 }, //hide this column first
    { title: "Favourite Color", field: "col", width: 150 },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },

    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
    {
      title: "Date Of Birth",
      field: "dob",
      hozAlign: "center",
      sorter: "date",
      width: 150,
    },
  ];

  const callApi = async () => {
    await fakeApiCall(1).then(() => {
      setTableData(data);
    });
    return 1;
  };

  useEffect(() => {
    const response = callApi();
  }, []);

  const data = [
    {
      name: "Oli Bob",
      location: "United Kingdom",
      gender: "male",
      col: "red",
      dob: "14/04/1984",
      _children: [
        {
          name: "Mary May",
          location: "Germany",
          gender: "female",
          col: "blue",
          dob: "14/05/1982",
        },
        {
          name: "Christine Lobowski",
          location: "France",
          gender: "female",
          col: "green",
          dob: "22/05/1982",
        },
        {
          name: "Brendon Philips",
          location: "USA",
          gender: "male",
          col: "orange",
          dob: "01/08/1980",
          _children: [
            {
              name: "Margret Marmajuke",
              location: "Canada",
              gender: "female",
              col: "yellow",
              dob: "31/01/1999",
            },
            {
              name: "Frank Harbours",
              location: "Russia",
              gender: "male",
              col: "red",
              dob: "12/05/1966",
            },
          ],
        },
      ],
    },
    {
      name: "Jamie Newhart",
      location: "India",
      gender: "male",
      col: "green",
      dob: "14/05/1985",
    },
    {
      name: "Gemma Jane",
      location: "China",
      gender: "female",
      col: "red",
      dob: "22/05/1982",
      _children: [
        {
          name: "Emily Sykes",
          location: "South Korea",
          gender: "female",
          col: "maroon",
          dob: "11/11/1970",
        },
      ],
    },
    {
      name: "James Newman",
      location: "Japan",
      gender: "male",
      col: "red",
      dob: "22/03/1998",
    },
  ];

  const handleRowClick = (e: any, row: any) => {
    console.log("Row clicked:", row.getData()); // In ra dữ liệu của hàng được click
    alert(`You clicked row with ID: ${row.getData().id}`); // Hiển thị thông báo
    // Thực hiện các hành động khác khi click vào hàng...
  };

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="min-h-[400px] h-[70vh] w-full border bg-red-50 rounded-xl shadow-lg relative overflow-x-auto">
          <ReactTabulator
            onRef={(ref) => (ref = ref)}
            data={tableData}
            columns={columns}
            events={
              {
                //   rowClick: handleRowClick,
              }
            }
            layout="fitColumns" // Tùy chọn layout
            options={{
              pagination: "local", // Phân trang
              paginationSize: 5, // Số hàng trên mỗi trang
              movableColumns: true,
              movableRows: true,
              dataTree: true,
              height: "100%",
              //   dataTreeStartExpanded: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MtrlManagementV2Page;
