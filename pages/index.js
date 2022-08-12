import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { app } from "../firebseConfig";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  // sign with google
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // sign with google
  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        const resp = response.user;
        // console.log(resp);

        if (resp.emailVerified) {
          router.push("/todo");
        } else {
          return;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (data) => {
  //     console.log(data);
  //   });
  // }, []);
  return (
    <div className="fluid-container">
      <Head>
        <title>Todo App using Nextjs|firebase</title>
        <meta
          name="description"
          content="
        This is todo app using nextjs and firebase with google authentication.
        where user can save the note.after user login can see their data."
        />
      </Head>
      <div className="googleContainer fluid-container">
        <button
          type="button"
          className="googleBtn btn btn-primary btn-sm"
          onClick={() => signWithGoogle()}
        >
          <div className="content">
            <Image
              className="googleImage"
              src="/icon/google.png"
              alt="logo"
              height="70"
              width="70"
            />
            <h4>sign with Google</h4>
          </div>
        </button>
      </div>
    </div>
  );
}
