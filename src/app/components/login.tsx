import { login } from '../database/bytes';

export default function Login() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Login</h1>
        <form action={login} className="w-full max-w-lg">
          <fieldset>
              <label className="w-full mb-4 inline-block" htmlFor="email">Email</label>
              <input className="text-black w-full mb-4" type="text" id="email" name="email" required />

              <label className="w-full mb-4 inline-block" htmlFor="password">Password</label>
              <input className="text-black w-full mb-4" type="password" id="password" name="password" required />
  
              <button className="w-full mb-4" type="submit">Submit</button>
          </fieldset>
      </form>
      </div>
  );
}