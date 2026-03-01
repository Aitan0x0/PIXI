import React, { useState, useEffect, useContext } from 'react'
import { useMemo } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext);
  const [searchWord, setSearchWord] = useState("")


  useEffect(() => {
    fetch(`https://localhost:7094/api/orders`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(json => {
        setOrders(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);
  const searchOrders = useMemo(() =>
    orders?.filter((u) =>
      u.orderUser?.username?.toLowerCase().includes(searchWord.toLowerCase()) ||
      String(u.orderUserId).includes(searchWord) ||
      String(u.orderTotalPrice).includes(searchWord) ||
      String(u.orderDate).includes(searchWord) ||
      String(u.orderId).includes(searchWord)
    ), [searchWord, orders]);
  if (loading) return <p>Loading orders...</p>




  return (

    <>
      <h2 className="admin-dash-h2">Orders</h2>
      <div className="tables-div">

        <div className="tables-search-add">
          <input type="text" className="search-input" placeholder="Search Orders... " value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
        </div>
        <div className="table-div">
          <table className="admin-table" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>UserID</th>
                <th>User Name</th>
                <th>Item Count</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th className='tools'>Tools</th>
              </tr>
            </thead>
            <tbody>
              {searchOrders?.map(order => (

                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.orderUserId}</td>
                  <td>{order?.orderUser?.username || "Unknown User"}</td>
                  <td>{order.orderItems?.length || 0}</td>
                  <td>{order.orderDate.split("T")[0]}</td>
                  <td>{order.orderTotalPrice}</td>
                  <td className="tools">
                    <div className="tools-div">
                      <Link to={`/admin/order/info/${order.orderId}`} className="info-btn"><i
                        className="fa-solid fa-info"></i></Link>

                      <button className="delete-btn">
                        <i className="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>


              ))}


            </tbody>

          </table>
        </div>

      </div>


    </>






  )
}
