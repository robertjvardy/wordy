import { useMutation } from "@tanstack/react-query";
import { http } from "../module/http";
import type { CreateUserRequestType, LoginRequestType } from "@repo/types/dtos";
import { setAuthToken } from "../module/jwt";

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

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (body: LoginRequestType) => loginRequest(body),
    onSuccess: (res) => setAuthToken(res.token),
  });
