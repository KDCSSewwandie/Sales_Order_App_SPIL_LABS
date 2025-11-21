// OrderLineRow.jsx
import React, { useEffect } from 'react';

export default function OrderLineRow({ index, line, items, onChange, onRemove }) {

    // compute price from item if user hasn't provided a price
    useEffect(() => {
        const item = items.find(i => i.id === line.itemId);
        if (item && (!line.price || line.price === 0)) {
            onChange(index, { ...line, price: item.price || 0 });
        }
    }, [line.itemId]);

    function updateField(field, value) {
        const next = { ...line, [field]: value };
        // compute amounts
        const q = Number(next.quantity || 0);
        const p = Number(next.price || 0);
        const rate = Number(next.taxRate || 0);
        next.exclAmount = Number((q * p).toFixed(2));
        next.taxAmount = Number((next.exclAmount * rate / 100).toFixed(2));
        next.inclAmount = Number((next.exclAmount + next.taxAmount).toFixed(2));
        onChange(index, next);
    }

    return (
        <tr>
            <td>
                <select value={line.itemId || ''} onChange={(e) => updateField('itemId', Number(e.target.value))} className="border px-2 py-1">
                    <option value="">--</option>
                    {items.map(it => <option key={it.id} value={it.id}>{it.code} - {it.description}</option>)}
                </select>
            </td>
            <td><input value={line.note || ''} onChange={(e) => updateField('note', e.target.value)} className="border px-2 py-1" /></td>
            <td><input type="number" step="1" value={line.quantity || 0} onChange={(e) => updateField('quantity', Number(e.target.value))} className="border px-2 py-1" /></td>
            <td><input type="number" step="0.01" value={line.price || 0} onChange={(e) => updateField('price', Number(e.target.value))} className="border px-2 py-1" /></td>
            <td><input type="number" step="0.01" value={line.taxRate || 0} onChange={(e) => updateField('taxRate', Number(e.target.value))} className="border px-2 py-1" /></td>
            <td>{line.exclAmount?.toFixed(2) ?? '0.00'}</td>
            <td>{line.taxAmount?.toFixed(2) ?? '0.00'}</td>
            <td>{line.inclAmount?.toFixed(2) ?? '0.00'}</td>
            <td><button onClick={() => onRemove(index)} className="text-red-600">Remove</button></td>
        </tr>
    );
}
