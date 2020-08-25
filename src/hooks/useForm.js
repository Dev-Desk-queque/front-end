import { useState } from "react";

export default function useForm(initialFormValues) {
  const [formValues, setFormValues] = useState(initialFormValues);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e The event handed down by an onChange event
   * @summary Sets the formValues state using an event object only
   */
  function onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return [formValues, onChange];
}
