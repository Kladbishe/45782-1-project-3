import { useEffect, useRef, useState } from "react"
import "./ImagePicker.css"

interface ImagePickerProps {
  label?: string
  initialUrl?: string | null   
  onChange(file: File | null): void
}

export default function ImagePicker(props: ImagePickerProps) {

  const { label = "cover image", initialUrl, onChange } = props

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(initialUrl || null)

  useEffect(() => {

    if (initialUrl) setPreview(initialUrl)
  }, [initialUrl])

  function handleClick() {
    inputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      onChange(null)
      setPreview(initialUrl || null)
      return
    }

    onChange(file)

    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div className="ImagePicker">
      <div className="ImagePicker-label">{label}</div>

      <div className="ImagePicker-box" onClick={handleClick}>
        {preview ? (
          <>
            <img src={preview} alt="cover" className="ImagePicker-img" />
            <div className="ImagePicker-overlay">
              <span>Change Image</span>
            </div>
          </>
        ) : (
          <div className="ImagePicker-empty">
            <div className="ImagePicker-empty-icon" />
            <span>Select Image</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  )
}
