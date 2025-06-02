'use client'

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Link from 'next/link';

const NavBar = () => {

  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("HH:mm"));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [])

  return (
    <div className="navbar">
      <Link
        href="/weather"
        className="navbar-link"
      >
        <i className={"bi-cloud"}></i>
      </Link>
      <Link
        href='/bus'
        className="navbar-link"
      >
        <i className={"bi-train-front"}></i>
      </Link>
      <Link
        href='/electricity'
        className="navbar-link"
      >
        <i className={"bi-lightning"}></i>
      </Link>
      <Link
        href='/plants'
        className="navbar-link"
      >
        <i className={"bi-droplet-half"}></i>
      </Link>
      <div className="navbar-clock">
        {time}
      </div>
    </div>
  )
}

export default NavBar;