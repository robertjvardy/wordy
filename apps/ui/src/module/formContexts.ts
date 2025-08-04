import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "../components/formComponents/textField";
import SubscribeButton from "../components/formComponents/subscribeButton";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
});

export default useAppForm;
