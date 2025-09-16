"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Upload, X, Trash } from "lucide-react"

interface Photo {
  _id?: string; // Add _id to identify photos for deletion
  src: string;
  alt: string;
  caption: string;
}

interface UploadModalProps {
  newPhoto: Photo;
  setNewPhoto: React.Dispatch<React.SetStateAction<Photo>>;
  isUploading: boolean;
  closeModal: () => void;
  handleUpload: (e: React.FormEvent) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newPhoto, setNewPhoto] = useState<Photo>({ src: "", alt: "", caption: "" })
  const [isUploading, setIsUploading] = useState(false)

  const API_BASE_URL = "https://harshu-backend.onrender.com" // direct API URL

  // Fetch photos
  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/photos`)
      if (!res.ok) throw new Error("Failed to fetch photos")
      const data = await res.json()
      setPhotos(data)
    } catch (error) {
      console.error("Error fetching photos:", error)
    }
  }, [])

  useEffect(() => { fetchPhotos() }, [fetchPhotos])

  // Auto-advance carousel
  useEffect(() => {
    if (photos.length > 1) {
      const timer = setInterval(() => setCurrentIndex(prev => (prev + 1) % photos.length), 4000)
      return () => clearInterval(timer)
    }
  }, [photos.length])

  const goToPrevious = () => setCurrentIndex(prev => prev === 0 ? photos.length - 1 : prev - 1)
  const goToNext = () => setCurrentIndex(prev => (prev + 1) % photos.length)

  // File selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.match("image.*")) return alert("Please select an image file")

    const reader = new FileReader()
    reader.onload = (e) => setNewPhoto(prev => ({ ...prev, src: e.target?.result as string }))
    reader.readAsDataURL(file)
  }

  // Upload photo
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPhoto.src) return alert("Please select an image to upload")
    setIsUploading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/api/photos/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPhoto),
      })
      if (!res.ok) throw new Error("Failed to upload photo")
      await fetchPhotos()
      setShowUploadModal(false)
      setNewPhoto({ src: "", alt: "", caption: "" })
    } catch (error) {
      console.error("Error uploading photo:", error)
      alert("Error uploading photo. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  // Delete photo
  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!confirm("Are you sure you want to delete this photo?")) return

    try {
      const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete photo")
      await fetchPhotos()
      alert("Photo deleted successfully")
      setCurrentIndex(0)
    } catch (error) {
      console.error(error)
      alert("Error deleting photo")
    }
  }

  const closeModal = () => { setShowUploadModal(false); setNewPhoto({ src: "", alt: "", caption: "" }) }

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-200">
      {/* Upload Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={() => setShowUploadModal(true)} size="sm" className="bg-pink-500 hover:bg-pink-600">
          <Upload className="mr-2 h-4 w-4" /> Add Photo
        </Button>
      </div>

      {/* Main Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={photos[currentIndex]?.src || "/placeholder.svg"}
          alt={photos[currentIndex]?.alt}
          className="w-full h-full object-contain"
          loading="lazy"
        />

        {/* Delete Button */}
        {photos[currentIndex]?._id && (
          <Button
            onClick={() => handleDelete(photos[currentIndex]._id)}
            variant="destructive"
            size="icon"
            className="absolute top-2 left-2 bg-red-500 text-white"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}

        {/* Navigation */}
        {photos.length > 1 && (
          <>
            <Button onClick={goToPrevious} variant="outline" size="icon" className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-200">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={goToNext} variant="outline" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-200">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50 text-center">
        <p className="text-muted-foreground font-medium">{photos[currentIndex]?.caption}</p>
      </div>

      {/* Dots */}
      {photos.length > 1 && (
        <div className="flex justify-center space-x-2 p-4">
          {photos.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-pink-500 scale-125" : "bg-pink-200 hover:bg-pink-300"}`} />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          newPhoto={newPhoto}
          setNewPhoto={setNewPhoto}
          isUploading={isUploading}
          closeModal={closeModal}
          handleUpload={handleUpload}
          handleFileSelect={handleFileSelect}
        />
      )}
    </div>
  )
}

function UploadModal({ newPhoto, setNewPhoto, isUploading, closeModal, handleUpload, handleFileSelect }: UploadModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add a New Photo</h2>
          <Button variant="ghost" onClick={closeModal}><X className="h-4 w-4" /></Button>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Image</label>
            <input type="file" accept="image/*" onChange={handleFileSelect} className="w-full p-2 border rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Alt Text</label>
            <input type="text" value={newPhoto.alt} onChange={(e) => setNewPhoto(prev => ({ ...prev, alt: e.target.value }))} className="w-full p-2 border rounded" placeholder="Describe the image for accessibility" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Caption</label>
            <textarea value={newPhoto.caption} onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))} className="w-full p-2 border rounded" placeholder="Add a meaningful caption" rows={3} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
            <Button type="submit" disabled={isUploading}>{isUploading ? "Uploading..." : "Upload Photo"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
