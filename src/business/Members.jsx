import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

import Member from "./Member";
import { useAuthCtx } from "../context/AuthContext";
import { toast } from "react-toastify";

const Members = () => {
  const [members, setMembers] = useState([]);

  const { user } = useAuthCtx();

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        try {
          const res = await fetch("/api/api/v1/businesses/members", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (res.ok) {
            const { data } = await res.json();
            setMembers(data);
          } else {
            const { message } = await res.json();
            toast.error(message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user.token) {
      loadCandidates();
    }
  }, []);

  return (
    <section className="w-full rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Candidates</h1>
      <div className="flex flex-col gap-2">
        {members.map((member) => (
          <Member
            key={member._id}
            member={member}
          />
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default Members;
