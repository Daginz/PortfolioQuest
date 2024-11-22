import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentPath } from "../store/slices/navigationSlice";
import { useEffect } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const dispatch = useAppDispatch();
  const { currentPath } = useAppSelector((state) => state.navigation);
  const { isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setCurrentPath(location));
  }, [location, dispatch]);

  const navItems = [
    { href: "/who-am-i", label: "Who Am I" },
    { href: "/projects", label: "Cave of Trials and Suffering" },
    { href: "/family", label: "Daginz Family" },
    { href: "/games", label: "Igromania" },
    { href: "/blog", label: "Blog" },
    ...(isAuthenticated && isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  location === item.href
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
