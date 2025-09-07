import { useEffect, useState } from "react";
import { validateSupplier } from "../utils/validation";

const empty = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
};

export default function SupplierForm({ mode = "create", initialValues = empty, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...empty, ...initialValues });
  const [errors, setErrors] = useState({});
  const isEdit = mode === "edit";

  useEffect(() => {
    setValues({ ...empty, ...initialValues });
    setErrors({});
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const vErrors = validateSupplier(values);
    setErrors(vErrors);
    if (Object.keys(vErrors).length === 0) {
      const reset = () => {
        setValues(empty);
        setErrors({});
      };
      onSubmit(values, reset);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-indigo-50 p-6 rounded-xl shadow-sm"
    >
      {errors.all && (
        <div className="md:col-span-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm">
          {errors.all}
        </div>
      )}

      <Field label="Name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
      <Field label="Phone" name="phone" value={values.phone} onChange={handleChange} error={errors.phone} />
      <Field label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
      <Field label="Address" name="address" value={values.address} onChange={handleChange} error={errors.address} />

      <div className="md:col-span-2 flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition"
        >
          {isEdit ? "Save changes" : "Agregar Proveedor"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function Field({ label, name, value, onChange, error, type = "text" }) {
  const hasError = Boolean(error);
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
          hasError
            ? "border-red-400 focus:ring-red-300"
            : "border-slate-300 focus:ring-indigo-200 focus:border-indigo-500"
        }`}
        placeholder={label}
      />
      {hasError && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}