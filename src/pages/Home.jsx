// Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/ordersSlice';
import { Link } from 'react-router-dom';

export default function Home() {
    const dispatch = useDispatch();
    const orders = useSelector(s => s.orders.list);

    useEffect(() => { dispatch(fetchOrders()); }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between mb-3">
                <h1 className="text-xl font-semibold">Sales Orders</h1>
                <Link to="/order/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add New</Link>
            </div>

            <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">Invoice No</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Client</th>
                        <th className="p-2 border">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 cursor-pointer">
                            <td className="p-2 border">{o.invoiceNo}</td>
                            <td className="p-2 border">{new Date(o.invoiceDate).toLocaleDateString()}</td>
                            <td className="p-2 border">{o.clientName}</td>
                            <td className="p-2 border">{Number(o.totalIncl).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
