import { useRouteError } from "react-router-dom";

export default function RouteError() {
  const error = useRouteError();
  console.error(error);

  return (
      <div class="route-error flex flex-col w-full items-center justify-center min-h-screen">
        <h1>404</h1>
        <span>It happens, don't worry! You can navigate to pages from the navigation block 😁🖖</span>
    </div>
  );
}
