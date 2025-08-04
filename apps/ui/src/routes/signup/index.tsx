import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCreateUserMutation } from "../../queries/authQueries";
import { Box, Typography } from "@mui/material";
import useAppForm from "../../module/formContexts";
import z from "zod";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // TODO Bug: this doenst work in the user goes directly to the route in the address bar of the browser
    if (context.authenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  const { mutate } = useCreateUserMutation();
  const form = useAppForm({
    validators: {
      onChange: z.object({
        username: z.string(),
        password: z.string(),
      }),
    },
    onSubmit: ({ value }: { value: { username: string; password: string } }) =>
      mutate(value),
  });
  // TODO add validations
  return (
    <Box sx={{ maxWidth: "500px", marginTop: "4rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Sign up
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <form.AppField
            name="username"
            children={(field) => (
              <field.TextField label="Username" id="username" />
            )}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <field.TextField label="Password" id="password" isPassword />
            )}
          />
          <form.AppForm>
            <form.SubscribeButton label="Create Account" />
          </form.AppForm>
        </Box>
      </form>
    </Box>
  );
}
