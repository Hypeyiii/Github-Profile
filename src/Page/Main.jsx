import Github from "../img/github.jpg";
import SearchLogo from "../img/Search.svg";
import Loading from "../img/loading.svg";
import Star from "../img/Star.svg";
import Nesting from "../img/Nesting.svg";
import "../index.css";
import useAPI from "../Hooks/useAPI";
import { useState } from "react";

function Main() {
  const [showAllRepos, setShowAllRepos] = useState(false);

  const {
    username,
    user,
    data,
    repos,
    loading,
    searchResults,
    loadingSearch,
    showMenu,
    setUsername,
    setUser,
    updateDay,
  } = useAPI();

  return (
    <>
      <header className="relative w-full h-32 md:h-auto flex justify-center items-center m-auto">
        <p className="text-[#CDD5E0] absolute top-0 mt-4 md:mt-5 text-[10px] md:text-xs">
          Github profile finder powered by{" "}
          <a
            href={`https://github.com/Hypeyiii`}
            target="_black"
            className="w-full underline text-[#3662E3] hover:text-[#4A5567] transition-all"
          >
            Isaac Frias
          </a>
        </p>
        <div className="h-full md:h-52 w-full bg-[#111729]"></div>
        <div className="bg-[#20293A] p-1 md:py-5 md:px-4 absolute inset-0 h-fit w-[70%] md:w-[40%] rounded-xl m-auto text-xs md:text-xl flex flex-row md:gap-2">
          <button onClick={() => setUsername(user)}>
            <img src={SearchLogo} alt="Imagen de icono de buscar" />
          </button>
          <input
            type="text"
            placeholder="username..."
            className="bg-transparent text-[#CDD5E0] w-full p-1 md:p-2 rounded-xl focus:outline-none text-xs md:text-base"
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                setUsername(e.target.value), setShowAllRepos(false);
            }}
          />
          {loadingSearch ? (
            <div className="absolute top-24 m-auto left-0 w-full bg-[#20293A] rounded-xl h-32 flex justify-center items-center">
              <img
                src={Loading}
                alt="Icono de cargando"
                className="w-12 md:w-20 h-auto animate-spin"
              />
            </div>
          ) : (
            <div
              className={`z-50 absolute top-14 md:top-24 m-auto left-0 w-full bg-[#111729] h-fit max-h-[256px] md:max-h-[400px] rounded-xl overflow-y-auto flex flex-col items-start justify-start ${
                showMenu ? "block" : "hidden"
              }`}
            >
              {searchResults.slice(0, 20).map((result) => (
                <div
                  key={result.id}
                  className="p-2 hover:bg-[#1D1B48] rounded-xl flex flex-row gap-4 items-center justify-start w-full cursor-pointer h-fit transition-all"
                  onClick={() => {
                    setUsername(result.login);
                    setUser("");
                  }}
                >
                  <img
                    src={result.avatar_url}
                    alt="Logo de Github"
                    className={`w-12 md:w-16 h-auto rounded-lg`}
                  />
                  <div className="flex flex-col gap-2 justify-center items-start">
                    <p className="text-[#CDD5E0] text-sm md:text-base">
                      {result.login}
                    </p>
                    <p className="text-[#4A5567] text-xs">
                      {result.type === "User" ? "User" : "Organization"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
      <section className="w-full m-auto max-h-full h-full bg-[#20293A]">
        <div className="flex flex-row gap-3 md:gap-6 justify-start items-start md:h-24 w-[90%] md:w-[80%] m-auto">
          <div className="relative bottom-[20px] md:bottom-[30px] rounded-xl bg-[#20293A] p-1 md:p-4">
            <div
              className={`${
                username ? "bg-transparent" : "bg-black"
              } w-20 md:w-32 p-2 md:p-3 rounded-xl`}
            >
              {loading ? (
                <img
                  src={Loading}
                  alt="Logo de Github"
                  className={`w-12 md:w-20 h-auto animate-spin`}
                />
              ) : (
                <a
                  href={`https://github.com/${username}`}
                  target="_black"
                  className="w-full"
                >
                  <img
                    src={username ? data.avatar_url : Github}
                    alt="Logo de Github"
                    className={`w-32 h-auto rounded-lg`}
                  />
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center h-32 mt-2 md:mt-0">
            <div className="flex flex-row gap-x-4 p-4 rounded-xl bg-[#111729] h-fit items-center">
              <p className="text-[#4A5567] font-semibold px-2 md:px-4 border-r border-[#4A5567] text-xs md:text-base">
                Followers
              </p>
              {username ? (
                <p className="text-[#CDD5E0] px-2 md:px-4">
                  {loading ? "..." : data.followers}
                </p>
              ) : (
                <p className="text-[#CDD5E0] px-2 md:px-4">0</p>
              )}
            </div>
            <div className="flex flex-row gap-x-4 p-4 rounded-xl bg-[#111729] h-fit items-center group">
              <p className="text-[#4A5567] font-semibold px-2 md:px-4 border-r border-[#4A5567] text-xs md:text-base">
                Following
              </p>
              {username ? (
                <p className="text-[#CDD5E0] px-2 md:px-4">
                  {loading ? "..." : data.following}
                </p>
              ) : (
                <p className="text-[#CDD5E0] px-2 md:px-4">0</p>
              )}
            </div>
            <div className="flex flex-row gap-x-4 p-4 rounded-xl bg-[#111729] h-fit items-center">
              <p className="text-[#4A5567] font-semibold px-2 md:px-4 border-r border-[#4A5567] text-xs md:text-base">
                Location
              </p>
              {username ? (
                <p className="text-[#CDD5E0] px-2 md:px-4 text-xs md:text-base text-nowrap">
                  {loading
                    ? "..."
                    : data.location
                    ? data.location
                    : "No location available"}
                </p>
              ) : (
                <p className="text-[#CDD5E0] px-2 md:px-4 text-xs md:text-base text-nowrap">
                  Any location
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-2 h-fit w-[90%] md:w-[80%] m-auto text-[#CDD5E0]">
          <h1 className="text-2xl md:text-5xl font-bold">
            {username ? data.name : ""}
          </h1>
          <p className={`text-sm md:text-xl ${username ? "block" : "hidden"}`}>
            {data.bio ? data.bio : "No bio available."}
          </p>
        </div>
        {username ? (
          <div>
            {loading ? (
              <div className="col-span-2 text-[#CDD5E0] font-semibold w-[90%] md:w-[80%] m-auto h-40 flex flex-col gap-4 justify-center items-center text-2xl">
                <img
                  src={Loading}
                  alt="Icono de cargando contenido"
                  className="size-32 animate-spin"
                />
                Loading repositories...
              </div>
            ) : (
              <div>
                {repos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] md:w-[80%] m-auto mt-10 gap-2 md:gap-5">
                    {repos
                      .slice(0, showAllRepos ? repos.length : 6)
                      .map((repo) => (
                        <a
                          href={`https://github.com/${username}/${repo.name}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#111729] p-4 rounded-xl m-2 flex flex-col gap-4 border-[1px] border-transparent hover:border-[#3662E3] max-w-full h-auto transition-all"
                          key={repo.id}
                        >
                          <h3 className="text-[#CDD5E0] font-semibold">
                            {repo.name}
                          </h3>
                          <p className="text-[#4A5567]">
                            {repo.description
                              ? repo.description
                              : "This repository has no description."}
                          </p>

                          <div className="flex flex-row gap-2 text-[#4A5567] items-center text-xs">
                            <div className="flex flex-row">
                              <p className="text-[#4A5567] hidden md:block">
                                {repo.language}
                              </p>
                            </div>
                            <div className="flex flex-row">
                              <img
                                src={Nesting}
                                alt="Icono de busqueda"
                                className="w-4 h-auto"
                              />
                              <p className="text-[#4A5567]">
                                {repo.forks_count}
                              </p>
                            </div>
                            <div className="flex flex-row">
                              <img
                                src={Star}
                                alt="Icono de busqueda"
                                className="w-4 h-auto"
                              />
                              <p className="text-[#4A5567]">
                                {repo.stargazers_count}
                              </p>
                            </div>
                            <div className="flex flex-row items-center">
                              <p className="text-[#4A5567] text-xs text-pretty">
                                Update at {updateDay(repo.updated_at)}
                              </p>
                            </div>
                          </div>
                        </a>
                      ))}
                    {repos.length > 6 && (
                      <button
                        className="flex w-fit m-auto justify-center col-span-1 md:col-span-2 text-xl text-[#4A5567] my-5 px-4 py-2 rounded-full border-2 border-transparent md:hover:border-[#4A5567] transition-all"
                        onClick={() => setShowAllRepos(!showAllRepos)}
                      >
                        {showAllRepos
                          ? "Show less repositories"
                          : `Show all repositories`}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="col-span-2 text-[#CDD5E0] font-semibold w-[90%] md:w-[80%] m-auto h-40 flex flex-col gap-4 justify-center items-center text-2xl">
                    <p>Este usuario no tiene repositorios.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="col-span-2 text-[#CDD5E0] font-semibold w-[90%] md:w-[80%] m-auto h-40 flex flex-col gap-4 justify-center items-center text-xl md:text-2xl text-center text-pretty">
            <p>
              Search for a Github username to see their profile and
              repositories.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default Main;
