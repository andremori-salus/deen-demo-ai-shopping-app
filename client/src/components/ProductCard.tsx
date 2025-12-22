import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`}>
      <Card className="group overflow-hidden hover-elevate active-elevate-2 cursor-pointer h-full flex flex-col">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              data-testid={`img-product-${product.id}`}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4 flex-1">
          <h3 className="font-semibold text-lg line-clamp-2 leading-snug" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
            {product.shortDescription}
          </p>
          <p className="text-2xl font-bold" data-testid={`text-price-${product.id}`}>
            ${parseFloat(product.price).toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
