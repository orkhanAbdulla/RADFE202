import React, { useState, useEffect } from "react";
import { ListGroupItemHeading, Spinner, Table } from "reactstrap";
import axios from "axios";

export function Users() {
  let initialState = {
    data: undefined,
    error: undefined,
    loading: false,
  };

  const [datas, setDatas] = useState(initialState);
  useEffect(() => {
    setDatas((oldData) => ({
      ...oldData,
      loading: true,
      error: undefined,
      data: undefined,
    }));

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => {
        setDatas((oldData) => ({
          ...oldData,
          data: data,
          loading: false,
          error: undefined,
        }));
      })
      .catch((err) => {
        setDatas({ data: undefined, loading: false, error: err.toString() });
      });
  }, []);
  return (
    <div>
      {datas.error && <h5 color="red">Error occured ....</h5>}
      {datas.loading && <Spinner />}
      {datas.data && (
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>companyName</th>
            </tr>
          </thead>
          <tbody>
            {datas.data &&
              datas.data.map(
                ({ name, email, company: { name: companyName } }, i) =>(
                    <tr>
                    <th scope="row">{i}</th>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{companyName}</td>
                  </tr>
                )
              )}
          </tbody>
        </Table>
      )}
    </div>
  );
}
