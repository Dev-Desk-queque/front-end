import { useState } from "react";

export default function useForm(initialFormValues) {
  const [formValues, setFormValues] = useState(initialFormValues);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e The event handed down by an onChange event
   * @summary Sets the formValues state using an event object only
   */
  function onChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  }

  return [formValues, onChange];
}
