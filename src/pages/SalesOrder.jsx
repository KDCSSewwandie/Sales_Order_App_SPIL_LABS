// SalesOrder.jsx
import React, { useEffect, useState } from 'react';
import Dropdown from '../components/common/Dropdown';
import OrderLineRow from '../components/OrderLineRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../redux/slices/clientsSlice';
import { fetchItems } from '../redux/slices/itemsSlice';
import { createOrder } from '../redux/slices/ordersSlice';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function SalesOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clients = useSelector(s => s.clients.items);
    const items = useSelector(s => s.items.items);
    const [clientId, setClientId] = useState('');
    const [clientDetails, setClientDetails] = useState({});
    const [invoiceNo, setInvoiceNo] = useState('');
    const [lines, setLines] = useState([]);
    const [note, setNote] = useState('');

    useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchItems());
    }, []);

    useEffect(() => {
        if (clientId) {
            const c = clients.find(x => x.id === Number(clientId));
            setClientDetails(c || {});
        } else setClientDetails({});
    }, [clientId, clients]);

    function addLine() { setLines([...lines, { quantity: 1, price: 0, taxRate: 0 }]); }
    function updateLine(i, data) { const arr = [...lines]; arr[i] = data; setLines(arr); }
    function removeLine(i) { setLines(lines.filter((_, idx) => idx !== i)); }

    function computeTotals() {
        const totalExcl = lines.reduce((s, l) => s + (Number(l.exclAmount || 0)), 0);
        const totalTax = lines.reduce((s, l) => s + (Number(l.taxAmount || 0)), 0);
        const totalIncl = lines.reduce((s, l) => s + (Number(l.inclAmount || 0)), 0);
        return { totalExcl, totalTax, totalIncl };
    }

    async function saveOrder() {
        const dto = {
            invoiceNo,
            invoiceDate: new Date().toISOString(),
            referenceNo: '',
            note,
            clientId: Number(clientId),
            lines: lines.map(l => ({
                itemId: Number(l.itemId),
                note: l.note,
                quantity: Number(l.quantity),
                price: Number(l.price),
                taxRate: Number(l.taxRate)
            }))
        };
        await dispatch(createOrder(dto));
        navigate('/');
    }

    const totals = computeTotals();
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-3">Sales Order</h2>
            <div className="mb-3 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm">Customer</label>
                    <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="border px-2 py-1 w-full">
                        <option value="">Select customer</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {clientId && (
                        <div className="mt-2 text-sm bg-white p-2 border">
                            <div>{clientDetails.address1}</div>
                            <div>{clientDetails.address2}</div>
                            <div>{clientDetails.suburb}, {clientDetails.state} {clientDetails.postCode}</div>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm">Invoice No</label>
                    <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="border px-2 py-1 w-full" />
                    <label className="block text-sm mt-2">Note</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} className="border p-2 w-full h-24" />
                </div>
            </div>

            <div className="mb-3">
                <button onClick={addLine} className="bg-green-600 text-white px-3 py-1 rounded">Add Item</button>
            </div>

            <table className="w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th>Item</th><th>Note</th><th>Qty</th><th>Price</th><th>Tax Rate %</th><th>Excl</th><th>Tax</th><th>Incl</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {lines.map((ln, i) =>
                        <OrderLineRow key={i} index={i} line={ln} items={items} onChange={updateLine} onRemove={removeLine} />
                    )}
                </tbody>
            </table>

            <div className="mt-4 w-1/3 ml-auto">
                <div className="flex justify-between"><span>Total Excl</span><span>{totals.totalExcl.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Total Tax</span><span>{totals.totalTax.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold"><span>Total Incl</span><span>{totals.totalIncl.toFixed(2)}</span></div>
            </div>

            <div className="mt-4">
                <button onClick={saveOrder} className="bg-blue-600 text-white px-4 py-2 rounded">Save Order</button>
            </div>
        </div>
    );
}
