import { login } from '../database/auth';
import { form, subTitle, label, input, button } from '../styles';

export default function Login() {
  return (
    <div>
        <form action={login} className={form}>
          <h1 className={subTitle}>Login</h1>
          <fieldset>
              <label className={label} htmlFor="email">Email</label>
              <input className={input} type="text" id="email" name="email" required />

              <label className={label} htmlFor="password">Password</label>
              <input className={input} type="password" id="password" name="password" required />
  
              <button className={button} type="submit">Submit</button>
          </fieldset>
      </form>
    </div>
  );
}
