import { supabase } from "./supabaseConfig";

export const getCustomers = async (searchTerms) => {
  let query = supabase
    .from("customers")
    .select("id, first, last, email, company");

  const { firstName, lastName, email, company } = searchTerms;

  if (firstName) {
    query = query.eq("first", firstName);
  }

  if (lastName) {
    query = query.eq("last", lastName);
  }

  if (email) {
    query = query.eq("email", email);
  }

  if (company) {
    query = query.like("company", `%${company}%`);
  }

  const { data, error } = await query;

  return { data, error };
};
