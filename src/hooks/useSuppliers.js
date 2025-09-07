import { useLocalStorage } from "./useLocalStorage";

const SUPPLIERS_KEY = "suppliers";
const NEXT_ID_KEY = "suppliers_nextId";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useLocalStorage(SUPPLIERS_KEY, []);
  const [nextId, setNextId] = useLocalStorage(NEXT_ID_KEY, 1);

  const create = (supplier) => {
    const newSupplier = { ...supplier, id: nextId };
    setSuppliers((prev) => [...prev, newSupplier]);
    setNextId(nextId + 1);
  };

  const update = (id, updatedData) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
  };

  const remove = (id) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAll = () => {
    setSuppliers([]);
    setNextId(1);
  };

  return { suppliers, create, update, remove, clearAll };
}