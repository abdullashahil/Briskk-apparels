"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import ProductGallery from "@/components/product/product-gallery"
import ProductInfo from "@/components/product/product-info"
import ReviewsSection from "@/components/product/reviews-section"
import RecommendedProducts from "@/components/product/recommended-products"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  _id: string
  title: string
  price: number
  description: string
  category: string
  images: string[]
  rating: {
    rate: number
    count: number
  }
}

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://briskk-server.vercel.app/api/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-20 h-20" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-[#5c564a]">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 hidden md:flex items-center space-x-2">
        <span className="cursor-pointer hover:text-[#5c564a]">Home</span>
        <span>/</span>
        <span className="cursor-pointer hover:text-[#5c564a]">{product.category}</span>
        <span>/</span>
        <span className="text-[#5c564a] font-medium truncate max-w-[300px]">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Gallery */}
        <ProductGallery images={product.images} title={product.title} />

        {/* Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Recommended Products */}
      <RecommendedProducts />
    </div>
  )
}

