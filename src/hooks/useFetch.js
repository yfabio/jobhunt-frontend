import { useState, useCallback } from "react";

import { useAuthCtx } from "../context/AuthContext";
import { toast } from "react-toastify";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuthCtx();

  /**
   *  The useCallback was used to make sure the send function was created only once and never recreated.
   *  It is kinda like a singleton.
   */
  const send = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = user.token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        : {}
    ) => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          method,
          body,
          headers,
        });

        if (res.ok) {
          const { data } = await res.json();
          console.log(data);
          return data;
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return [loading, send];
};
