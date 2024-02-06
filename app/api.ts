export const fetchTopUsers = async () => {
  const response = await fetch(
    'https://api.github.com/users?since=0&per_page=10'
  );
  const data = await response.json();
  return data;
};
