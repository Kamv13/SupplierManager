import { useMemo, useState } from "react";
import { useSuppliers } from "./hooks/useSuppliers";
import SupplierForm from "./components/SupplierForm";
import SupplierTable from "./components/SupplierTable";
import { toastSuccess, toastError, confirmWarning } from "./utils/swal";
import { validateSupplier } from "./utils/validation";

export default function App() {
  const { suppliers, create, update, remove, clearAll } = useSuppliers();
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return suppliers;
    return suppliers.filter((s) =>
      [s.name, s.contactPerson, s.email, s.phone, s.address]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );
  }, [suppliers, query]);

  function handleCreate(values, reset) {
    const errors = validateSupplier(values);
    if (Object.keys(errors).length) {
      toastError("Porfavor valide los campos necesarios");
      return { errors };
    }
    create(values);
    toastSuccess("Proveedor Creado");
    reset();
    return {};
  }

  function handleUpdate(values) {
    const errors = validateSupplier(values);
    if (Object.keys(errors).length) {
      toastError("Please fix validation errors.");
      return { errors };
    }
    update(values.id, values);
    toastSuccess("Supplier updated.");
    setEditing(null);
    return {};
  }

  async function handleDelete(id) {
    const ok = await confirmWarning("Eliminar proveedor?", "Esta accion no se puede deshacer.");
    if (!ok) return;
    remove(id);
    toastSuccess("Supplier deleted.");
  }

  async function handleClearAll() {
    if (suppliers.length === 0) return;
    const ok = await confirmWarning("desea eliminar todos los proveedores?", "Esta accion no se puede deshacer.");
    if (!ok) return;
    clearAll();
    toastSuccess("Todos los proveedores eliminados");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-slate-800">Administrador de proveedores</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              {editing ? "Edit Supplier" : "Agregar nuevo proveedor"}
            </h2>
            <div className="flex items-center gap-2">
              <input
                className="w-64 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="buscar proveedor..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="text-sm text-slate-500 hover:text-slate-700"
                onClick={() => setQuery("")}
              >
                Limpiar
              </button>
            </div>
          </div>

          <SupplierForm
            key={editing ? editing.id : "create"}
            mode={editing ? "edit" : "create"}
            initialValues={
              editing ?? {
                name: "",
                phone: "",
                email: "",
                address: "",
              }
            }
            onCancel={() => setEditing(null)}
            onSubmit={(values, reset) =>
              editing ? handleUpdate(values) : handleCreate(values, reset)
            }
          />
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Proveedores</h2>
            <button
              className="text-sm text-red-600 hover:text-red-700"
              onClick={handleClearAll}
            >
              Elminar todos
            </button>
          </div>

          <SupplierTable
            suppliers={filtered}
            onEdit={(s) => setEditing(s)}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}