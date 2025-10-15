const UserPage = () => {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <aside className="h-screen w-60 rounded p-4">
          <ul className="flex flex-col gap-2">
            <li className="font-semibold py-2 text-slate-600 underline-offset-4 hover:underline">
              Profile
            </li>
            <li className="font-semibold py-2 text-slate-600 underline-offset-2 hover:underline">
              Jobs
            </li>
            <li className="font-semibold py-2 text-slate-600 underline-offset-2 hover:underline">
              Interviews
            </li>
          </ul>
        </aside>
        <div className=""></div>
      </div>
    </section>
  );
};

export default UserPage;
