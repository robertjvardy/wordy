import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextField from "../ui/components/formComponents/textField";
import SubscribeButton from "../ui/components/formComponents/subscribeButton";

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
