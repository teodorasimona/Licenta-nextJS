export default function LoginPage() {
  return (
    <div className=" flex justify-center items-center bottom-10">
      <div className=" bg-customBlack p-5 rounded  border-2 border-danger ">
        <div className="text-center">
          <img src="images/logo.svg" alt="" />
        </div>

        <form className="p-12 bottom-12 ">
          <div className="mb-5">
            <label htmlFor="username" className="fw-semibold text-white">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Adresă e-mail"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="text-white fw-semibold">
              Parola
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Parolă"
              required
            />
          </div>

          <div className="text-center">
            <button
              className="btn btn-success rounded-4 button-login fw-semibold"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
