export default function SupplierTable({ suppliers, onEdit, onDelete }) {
  if (!suppliers.length) {
    return (
      <div className="py-8 text-center text-slate-500">
        No hay proveedores establecidos porfavor agregue uno para comenzar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Phone</Th>
            <Th>Email</Th>
            <Th>Address</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {suppliers.map((s, idx) => (
            <tr
              key={s.id}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100 transition`}
            >
              <Td>{s.id}</Td>
              <Td>{s.name}</Td>
              <Td>{s.contactPerson}</Td>
              <Td>{s.phone}</Td>
              <Td className="max-w-[220px] truncate">{s.email}</Td>
              <Td className="max-w-[240px] truncate">{s.address}</Td>
              <Td>{s.category || "-"}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => onEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 font-medium"
                    onClick={() => onDelete(s.id)}
                  >
                    Delete
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 font-semibold text-slate-700 text-left whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-4 py-3 align-top whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
}