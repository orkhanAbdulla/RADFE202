import React from 'react'
import {Table} from 'reactstrap'
function ProductTable({data}) {
  return (
    <Table
>
  <thead>
    <tr>
      <th>
       Name
      </th>
      <th>
        Price
      </th>
      <th>
        Count
      </th>
    </tr>
  </thead>
  <tbody>
    {
        data &&(
            data.map(item=>{
                return(
                    <tr>
                    <th scope="row">
                        {item.name}
                    </th>
                    <td>
                      {item.price}
                    </td>
                    <td>
                    {item.count}
                    </td>
                  </tr>
                )
            })
        )
    }
    </tbody>
    </Table>
  )
}

export default ProductTable
