const LoginPage = () => {
  return (
    <section className="container mx-auto mt-6">
      <div className="max-w-2xl">
        <form>
          <fieldset className="p-4 rounded shadow">
            <legend className="text-xl font-bold">Personal Information</legend>
            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="block">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="w-full py-2"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
