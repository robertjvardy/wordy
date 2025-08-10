import { default as MuiTextField } from "@mui/material/TextField";
import { useFieldContext } from "../../../../module/formContexts";

export function TextField({
  id,
  label,
  isPassword = false,
}: {
  id: string;
  label: string;
  isPassword?: boolean;
}) {
  const field = useFieldContext<string>();
  return (
    <MuiTextField
      id={id}
      label={label}
      variant="outlined"
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      data-testid={id}
      type={isPassword ? "password" : undefined}
    />
  );
}
