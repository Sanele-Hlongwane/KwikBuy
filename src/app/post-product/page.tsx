'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PostProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrls: string[] = [];

    // Upload images to Supabase
    if (images) {
      for (const image of Array.from(images)) {
        const { data, error } = await supabase.storage
          .from('products') // 👈 Create 'products' bucket in Supabase
          .upload(`product-${Date.now()}-${image.name}`, image);

        if (error) {
          console.error('❌ Image upload failed:', error);
          alert('Failed to upload image!');
          setLoading(false);
          return;
        }

        const publicURL = supabase.storage
          .from('products')
          .getPublicUrl(data.path).data.publicUrl;

        imageUrls.push(publicURL);
      }
    }

    // Submit product data with image URLs array
    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        imageUrls,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('🎉 Product posted successfully!');
      router.push('/shop');
    } else {
      alert('❌ Failed to post product. Try again!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-yellow-400 mb-6">📤 Post Your Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price (e.g. 1500)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          required
        />

        <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-800" disabled={loading}>
          {loading ? 'Posting...' : 'Post Product'}
        </Button>
      </form>
    </div>
  );
}
