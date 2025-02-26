'use client';

import { addByte, logout } from '../database/bytes';

export default function Add () {
  const handleLogout = () => logout();
  return (
    <>
      <button type="button" onClick={handleLogout}>Logout</ button>
      <form action={addByte} className="w-full max-w-lg">
        <fieldset>
            <legend className="text-2xl w-full mb-4">Add a byte</legend>

            <label className="w-full mb-4 inline-block" htmlFor="title">Title</label>
            <input className="text-black w-full mb-4" type="text" id="title" name="title" placeholder="Enter the title" required />

            <label className="w-full mb-4 inline-block" htmlFor="summary">Summary</label>
            <textarea className="text-black w-full mb-4" id="summary" name="summary" placeholder="Write your summary here..." required></textarea>

            <label className="w-full mb-4 inline-block" htmlFor="tags">Tags (comma seperated)</label>
            <input className="text-black w-full mb-4" type="text" id="tags" name="tags" placeholder="Enter some tags" />

            <button className="w-full mb-4" type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
}
