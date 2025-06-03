import { get } from "lodash";
import { useConnect } from "./connect";
const Page = () => {
  const { values, handleChange, handleBlur, handleSubmit } = useConnect();

  return (
    <div className={"sign-in"}>
      <div className="sign-in-container sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={"sign-in__title"}>Sign in to your account</h2>

        <div className={"sign-in__form"}>
          <form onSubmit={handleSubmit}>
            <div className={"sign-in__form__input-group"}>
              <label
                htmlFor="login"
                className={"sign-in__form__input-group__label"}
              >
                Login
              </label>
              <input
                id="login"
                name="login"
                type="text"
                value={get(values, "login", "")}
                required
                className={"sign-in__form__input-group__input"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className={"sign-in__form__input-group"}>
              <div className={"sign-in__form__password-group"}>
                <label
                  htmlFor="password"
                  className={"sign-in__form__input-group__label"}
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={"sign-in__form__input-group__input"}
                value={get(values, "password", "")}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <button aria-label="form-submit" type="submit" className={"sign-in__form__submit"}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
