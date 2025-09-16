"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Upload, X } from "lucide-react"

interface Photo {
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
  const [newPhoto, setNewPhoto] = useState<Photo>({
    src: "",
    alt: "",
    caption: ""
  })
  const [isUploading, setIsUploading] = useState(false)

  // Fetch photos from API
  const fetchPhotos = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/api/photos')
      if (res.ok) {
        const data = await res.json()
        setPhotos(data)
      } else {
        console.error('Failed to fetch photos')
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  // Auto-advance carousel
  useEffect(() => {
    if (photos.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
      }, 4000)

      return () => clearInterval(timer)
    }
  }, [photos.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file')
      return
    }
    
    // Convert to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      setNewPhoto(prev => ({ ...prev, src: e.target?.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPhoto.src) {
      alert('Please select an image to upload')
      return
    }
    
    setIsUploading(true)
    
    try {
      const res = await fetch('http://localhost:5000/api/photos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPhoto),
      })
      
      if (res.ok) {
        await fetchPhotos()
        setShowUploadModal(false)
        setNewPhoto({ src: "", alt: "", caption: "" })
      } else {
        console.error('Failed to upload photo')
        alert('Failed to upload photo. Please try again.')
      }
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert('Error uploading photo. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const closeModal = () => {
    setShowUploadModal(false)
    setNewPhoto({ src: "", alt: "", caption: "" })
  }

  if (photos.length === 0) {
    return (
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-200 p-8 text-center">
        <p className="mb-4">No photos yet. Add your first memory!</p>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload className="mr-2 h-4 w-4" /> Upload Photo
        </Button>
        
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

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-200">
      {/* Upload Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          onClick={() => setShowUploadModal(true)} 
          size="sm"
          className="bg-pink-500 hover:bg-pink-600"
        >
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

        {/* Navigation Buttons - Only show if there's more than one photo */}
        {photos.length > 1 && (
          <>
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-pink-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 bg-gradient-to-r from-pink-50 to-red-50">
        <p className="text-center text-muted-foreground font-medium">
          {photos[currentIndex]?.caption}
        </p>
      </div>

      {/* Dots Indicator - Only show if there's more than one photo */}
      {photos.length > 1 && (
        <div className="flex justify-center space-x-2 p-4">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-pink-500 scale-125" : "bg-pink-200 hover:bg-pink-300"
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
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

// Separate modal component
function UploadModal({ 
  newPhoto, 
  setNewPhoto, 
  isUploading, 
  closeModal, 
  handleUpload, 
  handleFileSelect
}: UploadModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add a New Photo</h2>
          <Button variant="ghost" onClick={closeModal}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Alt Text</label>
            <input 
              type="text" 
              value={newPhoto.alt}
              onChange={(e) => setNewPhoto(prev => ({...prev, alt: e.target.value}))}
              className="w-full p-2 border rounded"
              placeholder="Describe the image for accessibility"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Caption</label>
            <textarea 
              value={newPhoto.caption}
              onChange={(e) => setNewPhoto(prev => ({...prev, caption: e.target.value}))}
              className="w-full p-2 border rounded"
              placeholder="Add a meaningful caption"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}