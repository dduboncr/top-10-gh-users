'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {fetchTopUsers} from './api';

const Home = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const users = await fetchTopUsers();
      console.log({users});
      setTopUsers(users.slice(0, 5));
    };

    getTopUsers();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Top 5 GitHub Users
        </h1>
        <ul>
          {topUsers.map((user) => (
            <li key={user.id} className="mb-2">
              <Link href={`/person/${user.login}`}>
                <div className="bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  {user.login}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
