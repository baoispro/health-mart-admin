import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex items-center text-gray-500 text-sm space-x-2">
      <Link to="/" className="hover:underline">Dashboard</Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={routeTo} className="flex items-center space-x-2">
            <ChevronRightIcon className="w-4 h-4" />
            {isLast ? (
              <span className="font-semibold text-gray-800">{name}</span>
            ) : (
              <Link to={routeTo} className="hover:underline">{name}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
