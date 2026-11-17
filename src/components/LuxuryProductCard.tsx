"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ProductVariant } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function LuxuryProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="luxury-product-card">
      {/* Product Image Stage */}
      <Link href={`/products/${product.handle}`} className="product-image-stage">
        <span className="product-card-badge">Single-Estate</span>
        <img
          src={product.image}
          alt={product.title}
          className="product-stage-img"
          loading="lazy"
        />
      </Link>

      {/* Title & Subtitle */}
      <div className="product-meta-header">
        <h3 className="product-card-heading">
          <Link href={`/products/${product.handle}`}>
            {product.title}
          </Link>
        </h3>
        <p className="product-card-subheading">{product.subtitle}</p>
      </div>

      {/* Description */}
      <p className="product-description-short">{product.description}</p>

      {/* Size Selector (500ml, 1L, 5L) */}
      <div>
        <span className="size-selector-label">Select Bottle Size</span>
        <div className="size-pill-group">
          {product.variants.map((v) => (
            <button
              key={v.size}
              type="button"
              className={`size-pill ${selectedVariant.size === v.size ? "active" : ""
                }`}
              onClick={() => setSelectedVariant(v)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price & Direct Add to Cart */}
      <div className="card-action-row">
        <div className="price-display">
          <span className="price-current">${selectedVariant.price}</span>
          {selectedVariant.comparePrice && (
            <span className="price-compare">${selectedVariant.comparePrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-add-to-cart"
          aria-label={`Add ${product.title} ${selectedVariant.label} to cart`}
        >
          {added ? "✓ ADDED TO CART" : `ADD TO CART · $${selectedVariant.price}`}
        </button>
      </div>
    </div>
  );
}
