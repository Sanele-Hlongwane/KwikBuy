'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';

export default function PostProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Upload function
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(path, file);

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(path);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // eslint-disable-next-line prefer-const
    let imageUrls: string[] = [];

    try {
      if (images) {
        for (const image of Array.from(images)) {
          const path = `product-${Date.now()}-${image.name}`;
          const publicUrl = await uploadFile(image, path);
          imageUrls.push(publicUrl);
        }
      }

      console.log('Uploaded image URLs:', imageUrls);

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error);
        alert(error.message);
      } else {
        console.error('Unknown error:', error);
        alert('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-yellow-400 mb-6">📤 Post Your Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Input type="number" placeholder="Price (e.g. 1500)" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <Input type="file" multiple onChange={(e) => setImages(e.target.files)} required />

        <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-800" disabled={loading}>
          {loading ? 'Uploading & Posting...' : 'Post Product'}
        </Button>
      </form>
    </div>
  );
}
