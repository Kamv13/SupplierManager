import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 2200,
  timerProgressBar: true,
});

export function toastSuccess(message) {
  return Toast.fire({ icon: "success", title: message });
}

export function toastError(message) {
  return Toast.fire({ icon: "error", title: message });
}

export async function confirmWarning(title, text) {
  const result = await Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#dc2626",
    reverseButtons: true,
  });
  return result.isConfirmed;
}