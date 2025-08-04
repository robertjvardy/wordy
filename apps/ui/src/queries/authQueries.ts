import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { http } from "../module/http";
import {
  AuthDto,
  type CreateUserRequestType,
  type LoginRequestType,
} from "@repo/types/dtos";
import type { AuthDtoType } from "@repo/types/dtos";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "@tanstack/react-router";

const createUserRequest = async (body: CreateUserRequestType) => {
  const { data } = await http.post("/auth/createUser", body);
  return data;
};

export const useCreateUserMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: CreateUserRequestType) => createUserRequest(body),
    onSuccess: (res: AuthDtoType) => {
      const { user, token } = AuthDto.parse(res);
      if (user && token) {
        login(user, token);
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
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: LoginRequestType) => loginRequest(body),
    onSuccess: (res: AuthDtoType) => {
      const { user, token } = AuthDto.parse(res);
      if (user && token) {
        login(user, token);
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
  useSuspenseQuery<AuthDtoType>({
    queryKey: ["auth-init"],
    queryFn: initRequest,
  });
