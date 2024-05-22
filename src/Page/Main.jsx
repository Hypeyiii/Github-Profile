import HeroLogo from "../img/hero-image-github-profile.png";
import Github from "../img/github.jpg";
import SearchLogo from "../img/Search.svg";
import Loading from "../img/loading.svg";
import Star from "../img/Star.svg";
import Nesting from "../img/Nesting.svg";
import "../index.css";
import useAPI from "../Hooks/useAPI";

function Main() {
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
        <img
          src={HeroLogo}
          alt="Imagen de header, planetas"
          className="w-full h-full"
        />
        <div className="bg-[#20293A] p-2 md:py-5 md:px-4 absolute inset-0 h-fit w-[70%] md:w-[40%] rounded-xl m-auto text-xl flex flex-row gap-2">
          <button onClick={() => setUsername(user)}>
            <img src={SearchLogo} alt="Imagen de icono de buscar" />
          </button>
          <input
            type="text"
            placeholder="username..."
            className="bg-transparent text-[#CDD5E0] w-full p-2 rounded-xl focus:outline-none text-sm md:text-base"
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setUsername(e.target.value);
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
              className={`z-50 absolute top-14 md:top-24 m-auto left-0 w-full bg-[#111729] h-32 md:h-fit md:max-h-[400px] rounded-xl overflow-y-auto flex flex-col items-start justify-start ${
                showMenu ? "block" : "hidden"
              }`}
            >
              {searchResults.slice(0, 100).map((result) => (
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
              } w-20 md:w-32 p-1 md:p-3 rounded-xl`}
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
              <p className="text-[#CDD5E0] px-2 md:px-4">
                {loading ? "..." : data.followers}
              </p>
            </div>
            <div className="flex flex-row gap-x-4 p-4 rounded-xl bg-[#111729] h-fit items-center group">
              <p className="text-[#4A5567] font-semibold px-2 md:px-4 border-r border-[#4A5567] text-xs md:text-base">
                Following
              </p>
              <p className="text-[#CDD5E0] px-2 md:px-4">
                {loading ? "..." : data.following}
              </p>
            </div>
            <div className="flex flex-row gap-x-4 p-4 rounded-xl bg-[#111729] h-fit items-center">
              <p className="text-[#4A5567] font-semibold px-2 md:px-4 border-r border-[#4A5567] text-xs md:text-base">
                Location
              </p>
              <p className="text-[#CDD5E0] px-2 md:px-4 text-xs md:text-base text-nowrap">
                {loading
                  ? "..."
                  : data.location
                  ? data.location
                  : "No location available"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-2 h-fit w-[90%] md:w-[80%] m-auto text-[#CDD5E0]">
          <h1 className="text-2xl md:text-5xl font-bold">{data.name}</h1>
          <p className="text-sm md:text-xl">{data.bio}</p>
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
                Cargando repositorios...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] md:w-[80%] m-auto mt-10 gap-5">
                {repos.map((repo) => (
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
                        : "Este repositorio no contiene una descripcion"}
                    </p>

                    <div className="flex flex-row gap-2 text-[#4A5567] items-center text-xs">
                      <div className="flex flex-row">
                        <p className="text-[#4A5567] hidden md:block">{repo.language}</p>
                      </div>
                      <div className="flex flex-row">
                        <img
                          src={Nesting}
                          alt="Icono de busqueda"
                          className="w-4 h-auto"
                        />
                        <p className="text-[#4A5567]">{repo.forks_count}</p>
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
              </div>
            )}
          </div>
        ) : (
          <div className="col-span-2 text-[#CDD5E0] font-semibold w-[90%] md:w-[80%] m-auto h-40 flex flex-col gap-4 justify-center items-center text-2xl">
            <p>Introduce un nombre de usuario para buscar sus repositorios.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Main;
