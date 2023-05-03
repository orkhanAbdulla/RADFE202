import React from "react";

function App() {
  const arr = [
    {
      id: 1,
      name: "FCB",
    },
    {
      id: 2,
      name: "FB",
    },
    {
      id: 3,
      name: "ARS",
    },
    {
      id: 4,
      name: "CHE",
    },
  ];
  const[data,setData]=React.useState(arr)

  function deleteHandle(id){
    const arrFIlter = data.filter(item => item.id != id)
    setData((arrFIlter))
  }
  return (
    <>
      <table border={1}>
        <thead>
          <th>Name</th>
          <th>
            <button>remove</button>
          </th>
        </thead>
        <tbody>
          {data.map(({id,name }) => (
            <tr key={id}>
              <td>{name}</td>
              <button onClick={()=>deleteHandle(id)}>delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default App;
