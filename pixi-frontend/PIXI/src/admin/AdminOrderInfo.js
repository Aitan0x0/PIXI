import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


export default function AdminOrderInfo() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");

  const { id } = useParams();
  useEffect(() => {
    fetch(`https://localhost:7094/api/orders/${id}`)
      .then(res => res.json())
      .then(json => {
        setOrder(json);
        setLoading(false);
      }
      )
      .catch(err => {
        console.error("API error:", err);
        setLoading(false);
      })
  }, [id])
  console.log(order)
  console.log(id)
  // const serchedOrderInfo = order?.filter(item => item.gameName.toLowerCase().includes(searchWord.toLowerCase()));
  const searchOrderInfo = {
    ...order,
    orderItems: order?.orderItems?.filter(item => item.orderItemGame.gameName.toLowerCase().includes(searchWord.toLowerCase()) || item.orderItemGame.gameDeveloper.toLowerCase().includes(searchWord.toLowerCase()) || item.orderItemGame.catName.toLowerCase().includes(searchWord.toLowerCase()) ||
      item.orderPrice.toString().toLowerCase().includes(searchWord.toLowerCase()) || item.orderItemId.toString().toLowerCase().includes(searchWord.toLowerCase()))
  }


  return (
    <>
     
      <h2 className="admin-dash-h2 ">  <Link to="/admin/orders" className="back-orders">{"< Back to orders table"} </Link> {`${order?.orderUser?.username || "Unknown User"}'s Order Info  `}</h2>
      <div className="tables-div">
        <div className="tables-search-add">
          <input type="text" className="search-input" placeholder="Search Order Games... " value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
        </div>
        <div className="table-div">
          <table className="admin-table" border="1">
            <thead>
              <tr>
                <th style={{ width: "100px" }}>Order Item Id</th>
                <th>Image</th>
                <th>Name</th>
                <th >Developer</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>


              {searchOrderInfo?.orderItems?.map(io => (
                <tr>
                  <td>{io.orderItemId}</td>
                  <td><div className="table-img-order"><img src={`https://localhost:7094${io?.orderItemGame?.mainImg}`} alt={io?.orderItemGame?.name} /></div></td>
                  <td>{io?.orderItemGame?.gameName}</td>
                  <td>{io?.orderItemGame?.gameDeveloper}</td>
                  <td>{io?.orderItemGame?.catName}</td>
                  <td>{io?.orderPrice}</td>



                </tr>

              ))}




            </tbody>

          </table>
        </div>

      </div>


    </>
  )
}
