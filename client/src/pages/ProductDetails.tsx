import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@shared/schema";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const productUrl = id ? `/api/products/${id}` : "";
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [productUrl],
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (error || (!isLoading && !product)) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Link href="/" data-testid="link-back-catalog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-12 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/" data-testid="link-back">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Catalog
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight" data-testid="text-name">
                {product.name}
              </h1>
              <p className="text-4xl font-bold" data-testid="text-price">
                ${parseFloat(product.price).toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Description
              </h2>
              <p className="text-base leading-relaxed" data-testid="text-description">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <Button
                size="lg"
                className="w-full md:w-auto px-8 py-6 text-base font-semibold gap-2"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                {isAdded ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>

              {product.stock > 0 && (
                <p className="text-sm text-muted-foreground">
                  {product.stock} items in stock
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
