import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "../module/http";
import type { CreateUserRequestType, LoginRequestType } from "@repo/types/dtos";
import type { InitDto } from "@repo/types/dtos";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "@tanstack/react-router";

const createUserRequest = async (body: CreateUserRequestType) => {
  const { data } = await http.post("/auth/createUser", body);
  return data;
};

export const useCreateUserMutation = () =>
  useMutation({
    mutationFn: (body: CreateUserRequestType) => createUserRequest(body),
  });

const loginRequest = async (body: LoginRequestType) => {
  const { data } = await http.post("/auth/login", body);
  return data;
};

export const useLoginMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: LoginRequestType) => loginRequest(body),
    onSuccess: (res: InitDto) => {
      // TODO validate response with zod
      if (res.user && res.token) {
        login(res.user, res.token);
        navigate({ to: "/" });
      }
    },
  });
};

const initRequest = async () => {
  const { data } = await http.get("/auth/init");
  return data;
};

export const useAuthInit = ({ enabled }: { enabled: boolean }) =>
  useQuery<InitDto>({ queryKey: ["auth-init"], queryFn: initRequest, enabled });
