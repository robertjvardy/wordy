import { createFileRoute } from "@tanstack/react-router";
import { useCreateUserMutation } from "../../queries/authQueries";
import type { CreateUserRequestType } from "@repo/types/dtos";
import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate } = useCreateUserMutation();
  const { register, handleSubmit } = useForm<CreateUserRequestType>();
  const onSubmit: SubmitHandler<CreateUserRequestType> = (data) => mutate(data);

  // TODO add validations
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Sign up</h2>
        <div className={styles["form-container"]}>
          <input {...register("username", { required: true })} />
          <input {...register("password", { required: true })} />

          <button onClick={handleSubmit(onSubmit)}>Sign Up</button>
        </div>
      </div>
    </form>
  );
}
