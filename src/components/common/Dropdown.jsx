// Dropdown.jsx - a simple controlled select
import React from 'react';

export default function Dropdown({ value, onChange, options = [], labelKey = 'name', valueKey = 'id', placeholder = 'Select' }) {
    return (
        <select value={value || ''} onChange={(e) => onChange(Number(e.target.value) || '')}
            className="border rounded px-2 py-1">
            <option value="">{placeholder}</option>
            {options.map(o => (
                <option key={o[valueKey]} value={o[valueKey]}>
                    {o[labelKey]}
                </option>
            ))}
        </select>
    );
}
