import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import { useLocation } from "wouter";
import Welcome from "./components/Welcome";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigation from "./components/Navigation";
import WhoAmI from "./pages/WhoAmI";
import Projects from "./pages/Projects";
import Family from "./pages/Family";
import Games from "./pages/Games";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";

function Router() {
  const [location] = useLocation();
  const showNavigation = location !== "/";

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && <Navigation />}
      <main className={showNavigation ? "container mx-auto px-4 py-8" : ""}>
        <Switch>
          <Route path="/" component={Welcome} />
          <Route path="/who-am-i" component={WhoAmI} />
          <Route path="/projects" component={Projects} />
          <Route path="/family" component={Family} />
          <Route path="/games" component={Games} />
          <Route path="/blog" component={Blog} />
          <Route path="/admin" component={Admin} />
          <Route>404 Page Not Found</Route>
        </Switch>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
