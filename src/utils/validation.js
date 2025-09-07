export function validateSupplier(values) {
  const errors = {};

  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 4) {
    errors.name = "Name must be at least 4 characters.";
  }

  if (!values.phone || values.phone.trim() === "") {
    errors.phone = "Phone is required.";
  } else if (values.phone.trim().length < 8) {
    errors.phone = "Phone must be at least 8 characters.";
  } else if (values.phone.trim().length > 8) {
    errors.phone = "Phone must be at most 8 characters.";
  }

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (values.email.trim().length < 8) {
    errors.email = "Email must be at least 8 characters.";
  } else if (values.email.trim().length > 24) {
    errors.email = "Email must be at most 24 characters.";
  }

  if (!values.address || values.address.trim() === "") {
    errors.address = "Address is required.";
  }

  if (
    (!values.name || values.name.trim() === "") &&
    (!values.phone || values.phone.trim() === "") &&
    (!values.email || values.email.trim() === "") &&
    (!values.address || values.address.trim() === "")
  ) {
    errors.all = "All fields cannot be empty.";
  }

  return errors;
}