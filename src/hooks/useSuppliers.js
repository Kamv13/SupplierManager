import { useLocalStorage } from "./useLocalStorage";

const Suppliers_Key = "suppliers";
const next_ID = "suppliers_id";

export function useSuppliers () {
    const [suppliers, setSuppliers] = useLocalStorage(Suppliers_Key, []);
    const [next_ID, setNextId] = useLocalStorage(next_ID,1)

    const create = (supplier) => {
        const newSupplier = {...supplier, id : next_ID};
        setSuppliers((prev)=>[...prev, newSupplier]);
        setNextId(next_ID+1)
    };

   const update = (id, updatedData) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
  };

  const remove = (id) => {
    setSuppliers((prev)=> prev.filter((s)=> s.id !== id));
  };

  const clearAll = () => {
    setSuppliers([]);
    setNextId(1);
  }

  return {suppliers, create, update, remove, clearAll}

};