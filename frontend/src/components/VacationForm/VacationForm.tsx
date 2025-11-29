import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import "./VacationForm.css";
import vacationsService from "../../services/vacations";

import type VacationDraft from "../../models/vacation-draft";
import ImagePicker from "../../common/ImagePicker";

type FormValues = {
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number | string;
};

export default function VacationForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      destination: "",
      description: "",
      startDate: "",
      endDate: "",
      price: "",
    },
  });

  const startDateValue = watch("startDate");

  useEffect(() => {
    if (!isEdit || !id) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const vacations = await vacationsService.getAll();
        const found = vacations.find(v => v.id === id) || null;

        if (!found) {
          setError("Vacation not found");
          return;
        }

        reset({
          destination: found.destination,
          description: found.description,
          startDate: found.startDate.slice(0, 10),
          endDate: found.endDate.slice(0, 10),
          price: found.price,
        });

        setExistingImageUrl(found.imageUrl || null);
        setLikesCount(found.likesCount || 0);
      } catch (e) {
        console.log(e);
        setError("Failed to load vacation");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, reset]);

  async function onSubmit(values: FormValues) {
    try {
      setError(null);

      const draft: VacationDraft = {
        destination: values.destination,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        price: Number(values.price),
        likesCount: likesCount,
        image: imageFile,
      };

      if (isEdit && id) {
        await vacationsService.update(id, draft);
      } else {
        await vacationsService.create(draft);
      }

      navigate("/");
    } catch (e) {
      console.log(e);
      setError("Failed to save vacation, try again.");
    }
  }

  if (loading) {
    return (
      <div className="VacationForm-page">
        <div className="VacationForm-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="VacationForm-page">
      <form className="VacationForm-card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="VacationForm-title">
          {isEdit ? "Edit vacation" : "Add new vacation"}
        </h2>

        <p className="VacationForm-subtitle">
          {isEdit
            ? "Update the vacation details."
            : "Fill in the details for the new vacation."}
        </p>

        {error && <div className="VacationForm-error">{error}</div>}

        <label className="VacationForm-label">
          Destination
          <input
            className="VacationForm-input"
            placeholder="Where to?"
            {...register("destination", {
              required: "Destination is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
          />
          {errors.destination && (
            <div className="VacationForm-fieldError">
              {errors.destination.message}
            </div>
          )}
        </label>

        <label className="VacationForm-label">
          Description
          <textarea
            className="VacationForm-textarea"
            placeholder="Short description"
            rows={3}
            {...register("description", {
              required: "Description is required",
              minLength: { value: 5, message: "At least 5 characters" },
            })}
          />
          {errors.description && (
            <div className="VacationForm-fieldError">
              {errors.description.message}
            </div>
          )}
        </label>

        <div className="VacationForm-row">
          <label className="VacationForm-label">
            Start date
            <input
              className="VacationForm-input"
              type="date"
              {...register("startDate", {
                required: "Start date is required",
              })}
            />
            {errors.startDate && (
              <div className="VacationForm-fieldError">
                {errors.startDate.message}
              </div>
            )}
          </label>

          <label className="VacationForm-label">
            End date
            <input
              className="VacationForm-input"
              type="date"
              {...register("endDate", {
                required: "End date is required",
                validate: value => {
                  if (!startDateValue || !value) return true;
                  return (
                    value >= startDateValue ||
                    "End date cannot be before start date"
                  );
                },
              })}
            />
            {errors.endDate && (
              <div className="VacationForm-fieldError">
                {errors.endDate.message}
              </div>
            )}
          </label>
        </div>

        <label className="VacationForm-label">
          Price
          <div className="VacationForm-priceWrapper">
            <span className="VacationForm-pricePrefix">$</span>
            <input
              className="VacationForm-input VacationForm-priceInput"
              type="number"
              step="1"
              min="0"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
            />
          </div>
          {errors.price && (
            <div className="VacationForm-fieldError">
              {errors.price.message as string}
            </div>
          )}
        </label>

        <div className="VacationForm-imageSection">
          <ImagePicker
            label="add image"
            initialUrl={existingImageUrl || undefined}
            onChange={file => setImageFile(file)}
          />
        </div>

        <div className="VacationForm-actions">
          <button className="VacationForm-submit" type="submit">
            {isEdit ? "Update" : "Create"}
          </button>

          <button
            className="VacationForm-cancel"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
