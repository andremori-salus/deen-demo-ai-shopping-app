import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import ProductCatalog from "@/pages/ProductCatalog";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/not-found";

function Router({ searchQuery }: { searchQuery: string }) {
  return (
    <Switch>
      <Route path="/" component={() => <ProductCatalog searchQuery={searchQuery} />} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <Router searchQuery={searchQuery} />
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
