import { useState, useEffect } from "react";

export function useAPI() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const githubAPI = `https://api.github.com/users/${username}`;
  const githuSearchApi = `https://api.github.com/search/users?q=${user}`;

  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await fetch(githubAPI);
          const data = await response.json();
          setData(data);
          const reposResponse = await fetch(data.repos_url);
          const reposData = await reposResponse.json();
          setRepos(reposData);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserData();
    }
  }, [username, githubAPI]);

  useEffect(() => {
    if (user) {
      const fetchSearchResults = async () => {
        setLoadingSearch(true);
        try {
          const response = await fetch(githuSearchApi);
          const result = await response.json();
          setSearchResults(result.items || []);
          setLoadingSearch(false);
        } catch (error) {
          console.log(error);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [user, githuSearchApi]);

  const updateDay = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [searchResults]);

  return {
    username,
    setUsername,
    user,
    setUser,
    data,
    repos,
    loading,
    searchResults,
    loadingSearch,
    showMenu,
    updateDay,
  };
}
export default useAPI;
