import { useQuery } from "@/utilities/query";
import { User } from "../models";
import { QueryParams } from "@/domains/commons/models";
import { UserService } from "../services";

export const useUserById = ({ key, config, params }: QueryParams<User>) => {
  return useQuery<User>(
    key,
    async () => {
      const userService = new UserService();
      return userService.getUserById(String(params.userId));
    },
    config
  );
};
