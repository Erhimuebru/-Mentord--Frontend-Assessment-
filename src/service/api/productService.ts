const API_URL = process.env.NEXT_PUBLIC_API_URL; 

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function fetchProductById(id: string | number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}
