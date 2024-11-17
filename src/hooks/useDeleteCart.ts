
import { deleteCart } from "@/app/dashboard/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartId: string) => {
      await deleteCart(cartId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
      alert("Deleted")
    },
  });
};
