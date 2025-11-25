"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  title: string;
  price: string;
  images: string[];
  colors: string[]; // Now this will store color names
  sizes: string[];
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Selfin Hoodie",
    price: "$37.50",
    images: [
      "/download (1).jpeg",
      "/download.jpeg",
    ],
    colors: ["White", "Light Gray", "Beige"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: "Promo available",
  },
  { 
    id: 2,
    title: "Selfin T-shirt",
    price: "$27.20",
    images: ["/download.jpeg"],
    colors: ["Light Blue", "Silver", "Gray"],
    sizes: ["S","M","L","XL"],
  },
  {
    id: 3,
    title: "Selfin Hoodie (Black)",
    price: "$57.20",
    images: ["/download (1).jpeg"],
    colors: ["Black", "Dark Gray", "Charcoal"],
    sizes: ["S","M","L","XL"],
  },
  {
    id: 4,
    title: "Selfin sweatshirt",
    price: "$51.74",
    images: ["/download.jpeg"],
    colors: ["Dark Gray", "Graphite"],
    sizes: ["S","M","L"],
  },
  {
    id: 5,
    title: "Selfin oversized t-shirt",
    price: "$37.37",
    images: ["/download (1).jpeg"],
    colors: ["Navy Blue", "Royal Blue", "Black"],
    sizes: ["S","M","L","XL","2XL"],
  }
];

// Color mapping from name to hex code
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const COLOR_MAP: { [key: string]: string } = {
  "White": "#ffffff",
  "Light Gray": "#cfcfcf",
  "Beige": "#e8dcc3",
  "Light Blue": "#bfd7ff",
  "Silver": "#e6e6e6",
  "Gray": "#bcbcbc",
  "Black": "#000000",
  "Dark Gray": "#111111",
  "Charcoal": "#333333",
  "Graphite": "#222222",
  "Navy Blue": "#1a4fbf",
  "Royal Blue": "#3d6ee8",
};

export default function ShopPage() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function openProductModal(product: Product) {
    setSelectedProduct(product);
    setOpen(true);
  }

  return (
    <div className="min-h-screen p-5 bg-white">
      <div className="grid grid-cols-5 gap-6">
        {PRODUCTS.map((p) => (
          <article
            key={p.id}
            onClick={() => openProductModal(p)}
            className="cursor-pointer rounded-xl bg-[#ecf2f5] p-6 relative shadow-sm hover:shadow-md transition-shadow"
          >
            {p.badge && (
              <span className="absolute top-3 right-3 text-xs bg-teal-600 text-white px-2 py-1 rounded-full">
                {p.badge}
              </span>
            )}
            <img src={p.images[0]} alt={p.title} className="w-full h-54 object-contain" />
            <h3 className="mt-4 text-gray-800 text-center text-sm">{p.title}</h3>
            <p className="text-center text-sm text-gray-500">{p.price}</p>

            <div className="flex justify-center gap-2 mt-2">
              {p.colors.map((colorName, index) => (
                <span
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: colorName || "#cccccc" }}
                  title={colorName}
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      <ProductModal product={selectedProduct} open={open} onOpenChange={setOpen} />
    </div>
  );
}

function ProductModal({ product, open, onOpenChange }: { product: Product | null; open: boolean; onOpenChange: (v: boolean) => void; }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors[0] ?? null);
      setSelectedSize(product.sizes[0] ?? null);
      setQty(1);
    }
  }, [product]);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90%] w-full h-[500px] gap-0 p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left thumbnails */}
          <aside className="w-20 bg-white p-2 border-r">
            <div className="flex flex-col gap-4">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`rounded-md p-1 border ${selectedImage === i ? "ring-2 ring-blue-400" : "opacity-60"}`}
                >
                  <img src={src} className="w-14 h-14 object-contain" alt={`${product.title} view ${i + 1}`} />
                </button>
              ))}
            </div>
          </aside>

          {/* Large Image */}
          <div className="flex-1 bg-[#e9f0f2] p-4 flex items-center justify-center">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain" 
            />
          </div>

          {/* Right details */}
          <div className="w-1/3 p-4 space-y-2 overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                {product.badge && (
                  <span className="inline-block text-xs bg-teal-600 text-white px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <h2 className="mt-2 text-xl font-bold tracking-tight text-[#08333a]">
                  {product.title.toUpperCase()}
                </h2>
                <p className="mt-2 textlg font-semibold">{product.price}</p>
              </div>
            </div>

            {/* Colors */}
            <div>
              <div className="text-sm text-gray-600">
                Select color: <span className="font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                {product.colors.map((colorName) => (
                  <button
                    key={colorName}
                    onClick={() => setSelectedColor(colorName)}
                    className={`w-5 h-5  border rounded-full flex items-center justify-center ${selectedColor === colorName ? "ring-2 ring-black" : ""}`}
                    style={{ backgroundColor: colorName || "#cccccc" }}
                    title={colorName}
                    aria-label={`Color ${colorName}`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="text-sm text-gray-600">Select size</div>
              <div className="flex gap-3 mt-1 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-2 rounded-lg border text-sm ${selectedSize === s ? "bg-black text-white" : "bg-white"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="decrease quantity"
                >
                  -
                </button>
                <div className="px-4 py-2 w-12 text-center">{qty}</div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="increase quantity"
                >
                  +
                </button>
              </div>

              <Button
                onClick={() => alert(`Added ${qty}x ${product.title} (${selectedSize}, ${selectedColor}) to cart`)}
                className="flex-1 py-3 rounded-full font-semibold transition"
                variant="outline"
              >
                Add to Cart
              </Button>
            </div>

            {/* Product details bullet list */}
            <div>
              <h3 className="text-sm font-medium text-gray-700">Product Details</h3>
              <ul className="mt3 text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>65% ring-spun cotton, 35% polyester</li>
                <li>Charcoal Heather is 60% ring-spun cotton, 40% polyester</li>
                <li>Carbon Grey is 55% ring-spun cotton, 45% polyester</li>
                <li>Heavyweight fabric (8.5 oz)</li>
                <li>Regular fit but can run a bit tight</li>
                <li>Unisex sizing</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}