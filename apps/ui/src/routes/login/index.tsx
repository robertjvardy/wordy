import { createFileRoute } from "@tanstack/react-router";
import { useLoginMutation } from "../../queries/authQueries";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginRequestType } from "@repo/types/dtos";
import styles from "./styles.module.css";
import { http } from "../../module/http";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestType>();
  const onSubmit: SubmitHandler<LoginRequestType> = (data) => mutate(data);

  const testApi = async () => {
    await http.get("/users");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Login Page</h2>
          <div className={styles["form-container"]}>
            <input {...register("username", { required: true })} />
            <input {...register("password", { required: true })} />

            <button onClick={handleSubmit(onSubmit)}>Login</button>
          </div>
        </div>
      </form>
      <button onClick={testApi}>Test</button>
    </>
  );
}
