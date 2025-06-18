import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  // console.log(profile);
  return (
    <div className="container mx-auto my-10 p-4 space-y-9 px-10">
      <h1 className="text-2xl font-bold mb-6">About the Platform</h1>
      <p>
        This blog application is built to empower students of our college to express, share, and celebrate achievements and ideas across multiple domains like <strong>Devotion, Coding, Sports, Entertainment, and Business</strong>. Whether it's coverage of events, personal reflections, or technical insights, this platform is a one-stop destination to showcase student voice and creativity.
      </p>
      <p className="mt-[-15px]">
        Our aim is to foster a community where knowledge flows freely and creativity is celebrated. Writing blogs enhances communication and critical thinking skills, while reading them expands horizons and nurtures curiosity. 
      </p>

      <p className="mt-[-15px]">
        With every post, you contribute to a growing archive of student voices — a place where achievements, perspectives, and ideas live on. From event highlights to thoughtful essays, every blog brings value.
      </p>
      <p className="mt-[-15px]">
        So whether you're a reader, a thinker, or a storyteller — this platform welcomes you to discover, learn, and inspire.
      </p>

      {/* <h2 className="font-semibold text-blue-800 text-xl mt-8">About the Creator</h2>
      <p>
        This platform was developed by <strong>{profile?.name}</strong>, a passionate full-stack developer skilled in building scalable web applications with modern technologies. With a keen eye for user experience and a love for learning, he has crafted this app as a blend of functionality and purpose.
      </p> */}
    </div>
  );
}

export default About;