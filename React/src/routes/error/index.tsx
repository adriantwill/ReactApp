import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/error/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Error 404 No Page Found</h1>
      <a href="/" className="text-blue-600 underline">
        Return Home
      </a>
    </div>
  );
}
