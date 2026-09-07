import { createClient } from "@/lib/supabase/client";

export interface TokenTransaction {
  id: string;
  user_auth_user_id: string;
  amount: number;
  transaction_type:
    | "earned"
    | "spent"
    | "initial_balance"
    | "refund"
    | "adjustment";
  swap_id: string | null;
  description: string | null;
  created_at: string;
}

export const getMyTokenBalance = async (): Promise<number> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_my_token_balance");

  if (error) {
    throw new Error(error.message);
  }

  return Number(data ?? 0);
};

// export const getMyTokenTransactions = async (): Promise<TokenTransaction[]> => {
//   const supabase = createClient();

//   const { data, error } = await supabase
//     .from("token_transactions")
//     .select(
//       "id, user_auth_user_id, amount, transaction_type, swap_id, description, created_at",
//     )
//     .order("created_at", { ascending: false });

//   if (error) {
//     throw new Error(error.message);
//   }

//   return (data ?? []) as TokenTransaction[];
// };
export const getMyTokenTransactions = async (): Promise<TokenTransaction[]> => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("Wallet current user:", user?.id);
  console.log("Wallet user error:", userError);

  const { data, error } = await supabase
    .from("token_transactions")
    .select(
      "id, user_auth_user_id, amount, transaction_type, swap_id, description, created_at",
    )
    .order("created_at", { ascending: false });

  console.log("Wallet transactions:", data);
  console.log("Wallet transaction error:", error);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as TokenTransaction[];
};
