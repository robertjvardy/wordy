import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { http } from "../module/http";
import {
  AuthDto,
  type CreateUserRequestType,
  type LoginRequestType,
} from "@repo/types/dtos";
import type { AuthDtoType } from "@repo/types/dtos";
import { setAuthToken } from "../module/jwt";
import { useNavigate } from "@tanstack/react-router";

const createUserRequest = async (body: CreateUserRequestType) => {
  const { data } = await http.post("/auth/createUser", body);
  return data;
};

export const useCreateUserMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: CreateUserRequestType) => createUserRequest(body),
    onSuccess: (res: AuthDtoType) => {
      const { user, token } = AuthDto.parse(res);
      if (user && token) {
        setAuthToken(token);
        navigate({ to: "/" });
      }
    },
  });
};

const loginRequest = async (body: LoginRequestType) => {
  const { data } = await http.post("/auth/login", body);
  return data;
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: LoginRequestType) => loginRequest(body),
    onSuccess: (res: AuthDtoType) => {
      const { user, token } = AuthDto.parse(res);
      if (user && token) {
        setAuthToken(token);
        navigate({ to: "/" });
      }
    },
  });
};

export const initRequest = async () => {
  const { data } = await http.get<AuthDtoType>("/auth/init");
  return data;
};

export const useAuthInit = () =>
  useSuspenseQuery<AuthDtoType>({
    queryKey: ["auth-init"],
    queryFn: initRequest,
  });
