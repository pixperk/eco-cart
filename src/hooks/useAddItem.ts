import { addItem } from "@/app/dashboard/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation<{name:string, qty:number, unit:string, cartId:string},Promise<void>>({
    mutationFn: async (name:string, qty:number, unit:string, cartId:string) => {
      await addItem(name,qty,unit,cartId)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:["current"]})},
  });
};
