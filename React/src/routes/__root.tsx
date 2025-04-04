import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <DropdownButton name="" />
      <DropdownButton name="teams" /> */}
      <header className="sticky top-0 flex justify-center font-medium text-2xl tracking-wider gap-16 py-5 bg-primary z-10">
        <Link
          to="/"
          className="[&.active]:after:w-10/12 after:h-0.5 after:w-0 hover:after:w-10/12 after:transition-all after:duration-300 after:bg-blue-600 after:-translate-x-1/2 after:left-1/2 after:-bottom-2 capitalize relative after:absolute"
        >
          Home
        </Link>
        <Link
          to="/players"
          className="[&.active]:after:w-10/12 after:h-0.5 after:w-0 hover:after:w-10/12 after:transition-all after:duration-300 after:bg-blue-600 after:-translate-x-1/2 after:left-1/2 after:-bottom-2 capitalize relative after:absolute"
        >
          Players
        </Link>
        <Link
          to="/teams"
          className="[&.active]:after:w-10/12 after:h-0.5 after:w-0 hover:after:w-10/12 after:transition-all after:duration-300 after:bg-blue-600 after:-translate-x-1/2 after:left-1/2 after:-bottom-2 capitalize relative after:absolute"
        >
          Teams
        </Link>
      </header>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
