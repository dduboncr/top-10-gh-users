'use client';

import React, {useState, useEffect} from 'react';

import {fetchTopUsers} from '../../api';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Person = () => {
  const params = useParams();
  const {username} = params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const users = await fetchTopUsers();
      const selectedUser = users.find((u) => u.login === username);
      setUser(selectedUser);
    };

    if (username) {
      getUserDetails();
    }
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md text-center">
        <Link href="/">
          <p className="text-blue-500 hover:underline mb-4 inline-block">
            &lt; Back to Home
          </p>
        </Link>

        <Image
          width={96}
          height={96}
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{user.login}</h2>
        <p className="text-gray-600">
          {user.location || 'Location not available'}
        </p>
      </div>
    </div>
  );
};

export default Person;
