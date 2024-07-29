"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>

          <Image
            width={50}
            height={50}
            src={session.user.image}
            alt={session.user.name}
          />

          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>Sign In with Google</button>
      )}
    </div>
  );
};

export default Home;
