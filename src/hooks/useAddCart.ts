import { addCart } from "@/app/dashboard/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartName: string) => {
      "use server"
      await addCart(cartName)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["current"]})},
  });
};
