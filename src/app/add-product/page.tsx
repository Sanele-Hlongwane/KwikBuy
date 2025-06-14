"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabaseClient";
import LoadingDots from "@/components/ui/LoadingDots";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState("");

  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [suburbInput, setSuburbInput] = useState("");

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFiles((prev) => [...prev, file]);
      setPreviewUrls((prev) => [...prev, URL.createObjectURL(file)]);
    }
  }

  function removeImage(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function addCity() {
    if (cityInput.trim() && !cities.includes(cityInput.trim())) {
      setCities((prev) => [...prev, cityInput.trim()]);
      setCityInput("");
    }
  }

  function removeCity(city: string) {
    setCities((prev) => prev.filter((c) => c !== city));
  }

  function addSuburb() {
    if (suburbInput.trim() && !suburbs.includes(suburbInput.trim())) {
      setSuburbs((prev) => [...prev, suburbInput.trim()]);
      setSuburbInput("");
    }
  }

  function removeSuburb(suburb: string) {
    setSuburbs((prev) => prev.filter((s) => s !== suburb));
  }

  async function uploadFile(file: File): Promise<string> {
    const filePath = `product-images/${uuidv4()}_${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(filePath, file);
    if (error) throw error;

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(filePath);
    if (!urlData.publicUrl) throw new Error("Failed to get public URL");
    return urlData.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const numericPrice = Number(price);
if (isNaN(numericPrice) || numericPrice <= 0) {
  toast.error("Please enter a valid price.");
  return;
}

    if (!name || !description || !numericPrice || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (cities.length === 0 || suburbs.length === 0) {
      toast.error("Please add at least one City/Town and one Suburb.");
      return;
    }

    setIsSaving(true);
    setIsUploading(true);

    try {
      // Upload all images first
      const uploadedImageUrls: string[] = [];
      for (const file of imageFiles) {
        const url = await uploadFile(file);
        uploadedImageUrls.push(url);
      }

      // Now send to database
      const res = await fetch("/api/post-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          numericPrice,
          category,
          cities,
          suburbs,
          imageUrls: uploadedImageUrls,
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product added successfully!");
        // Reset everything
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setCities([]);
        setSuburbs([]);
        setImageFiles([]);
        setPreviewUrls([]);
      }
    } catch (error: any) {
      toast.error("Failed to add product: " + (error.message || "Unknown error"));
    } finally {
      setIsUploading(false);
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-2">Product Name *</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description *</label>
          <textarea
            rows={4}
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-2">Price (ZAR) *</label>
          <input
            type="number"
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">Category *</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        {/* Cities */}
        <div>
          <label className="block font-semibold mb-2">Cities / Towns *</label>
          <div className="flex space-x-3 mb-3">
            <input
              type="text"
              className="flex-grow p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
              placeholder="Add city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCity();
                }
              }}
            />
            <button
              type="button"
              onClick={addCity}
              className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <div key={city} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center space-x-2">
                <span>{city}</span>
                <button onClick={() => removeCity(city)} type="button" className="font-bold hover:text-red-600">&times;</button>
              </div>
            ))}
          </div>
        </div>

        {/* Suburbs */}
        <div>
          <label className="block font-semibold mb-2">Suburbs *</label>
          <div className="flex space-x-3 mb-3">
            <input
              type="text"
              className="flex-grow p-3 rounded-lg border bg-gray-50 dark:bg-gray-800"
              placeholder="Add suburb"
              value={suburbInput}
              onChange={(e) => setSuburbInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSuburb();
                }
              }}
            />
            <button
              type="button"
              onClick={addSuburb}
              className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {suburbs.map((suburb) => (
              <div key={suburb} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center space-x-2">
                <span>{suburb}</span>
                <button onClick={() => removeSuburb(suburb)} type="button" className="font-bold hover:text-red-600">&times;</button>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload & Preview */}
        <div>
          <label className="block font-semibold mb-2">Product Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
            disabled={isUploading}
            className="mb-3"
          />
          <div className="flex flex-wrap gap-4">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full px-2 py-0 text-sm"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSaving || isUploading}
            className={`bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow ${
              isSaving || isUploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving || isUploading ? <LoadingDots /> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
