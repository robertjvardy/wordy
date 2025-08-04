import { useFormContext } from "../../../module/formContexts";
import Button from "@mui/material/Button";

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting} variant="contained">
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export default SubscribeButton;
