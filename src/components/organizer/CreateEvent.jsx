import { useEffect, useRef, useState } from "react";
import { Header } from "../Header";
import { Upload, Calendar, MapPin, Users, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useNavigation } from "../../contexts/NavigationContext";

export function CreateEvent() {
  const {
    showSuccessPopup,
    showErrorPopup,
    navigateTo,
    activeEvent,
    setActiveEvent,
    setEventOverride,
    addCreatedEvent,
    updateCreatedEvent,
  } = useNavigation();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    capacity: "",
    startDate: "",
    endDate: "",
    venue: "",
    description: "",
  });
  const [posterFile, setPosterFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const posterInputRef = useRef(null);
  const materialsInputRef = useRef(null);
  const draftKey = "organizerEventDraft";
  const isEditing = Boolean(activeEvent);
  const isEditingCustom = isEditing && activeEvent?.isCustom;

  useEffect(() => {
    // If editing an existing event, pre-fill from the selected event
    if (activeEvent) {
      setFormData((prev) => ({
        ...prev,
        title: activeEvent.title || "",
        category: activeEvent.category || "",
        capacity: activeEvent.capacity?.toString() || "",
        startDate: activeEvent.startDate || "",
        endDate: activeEvent.endDate || "",
        venue: activeEvent.venue || "",
        description: activeEvent.description || "",
      }));
      return;
    }

    const savedDraft = localStorage.getItem(draftKey);
    if (!savedDraft) return;
    try {
      const parsed = JSON.parse(savedDraft);
      setFormData((prev) => ({
        ...prev,
        ...parsed,
      }));
      if (parsed.posterName) {
        setPosterFile({ name: parsed.posterName });
      }
      if (parsed.materialNames) {
        setMaterials(parsed.materialNames.map((name) => ({ name })));
      }
    } catch (err) {
      console.error("Failed to load draft", err);
    }
  }, [activeEvent]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem(draftKey);

    const formatDisplayDate = (value) => {
      if (!value) return "Date TBD";
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return value;
      return parsed.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
    };

    const formatTimeRange = (start, end) => {
      const formatTime = (val) => {
        if (!val) return null;
        const parsed = new Date(val);
        if (Number.isNaN(parsed.getTime())) return null;
        return parsed.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      };
      const startT = formatTime(start);
      const endT = formatTime(end);
      if (startT && endT) return `${startT} - ${endT}`;
      if (startT) return startT;
      return "Time TBD";
    };

    const requiredFields = [
      { key: "title", label: "Event title" },
      { key: "category", label: "Category" },
      { key: "capacity", label: "Capacity" },
      { key: "startDate", label: "Start date" },
      { key: "venue", label: "Venue" },
      { key: "description", label: "Description" },
    ];

    const missing = requiredFields.filter((f) => !formData[f.key]?.toString().trim());
    const capacityNumber = formData.capacity ? parseInt(formData.capacity, 10) : NaN;

    if (missing.length > 0) {
      showErrorPopup(
        "Missing required fields",
        `Please fill: ${missing.map((f) => f.label).join(", ")}.`
      );
      return;
    }

    if (Number.isNaN(capacityNumber) || capacityNumber <= 0) {
      showErrorPopup("Invalid capacity", "Capacity must be a number greater than 0.");
      return;
    }

    if (formData.startDate && formData.endDate) {
      const startMs = Date.parse(formData.startDate);
      const endMs = Date.parse(formData.endDate);
      if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
        showErrorPopup("Invalid dates", "Please provide valid start and end dates.");
        return;
      }
      if (endMs <= startMs) {
        showErrorPopup("End date must follow start date", "End date/time must be after start date/time.");
        return;
      }
    }

    const commonFields = {
      ...formData,
      capacity: capacityNumber,
      venue: formData.venue || "Venue TBD",
      description: formData.description || "",
      date: formatDisplayDate(formData.startDate),
      time: formatTimeRange(formData.startDate, formData.endDate),
    };

    if (isEditing) {
      if (isEditingCustom) {
        const updatedEvent = {
          ...activeEvent,
          ...commonFields,
          registrations: activeEvent?.registrations || 0,
          status: activeEvent?.status || "Pending",
          startDate: formData.startDate || activeEvent.startDate || "",
          endDate: formData.endDate || activeEvent.endDate || "",
          date: commonFields.date || activeEvent.date || "Date TBD",
          time: commonFields.time || activeEvent.time || "Time TBD",
          isCustom: true,
        };
        updateCreatedEvent(activeEvent.id, updatedEvent);
        showSuccessPopup("Event updated", "Your event changes were saved.");
      } else {
        const updatedEvent = {
          ...activeEvent,
          ...commonFields,
          registrations: activeEvent?.registrations || 0,
          status: "Pending", // require re-approval after edits
        };
        setEventOverride(updatedEvent.title, updatedEvent);
        showSuccessPopup("Event updated", "Changes saved and sent for re-approval (status set to Pending).");
      }
      setActiveEvent(null);
    } else {
      const newEvent = {
        id: `custom-${Date.now()}`,
        title: formData.title || "Untitled Event",
        category: formData.category || "General",
        status: "Pending",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        date: commonFields.date,
        time: commonFields.time,
        venue: commonFields.venue,
        description: commonFields.description,
        registrations: 0,
        capacity: commonFields.capacity,
        isCustom: true,
      };
      addCreatedEvent(newEvent);
      showSuccessPopup(
        "Event submitted for approval",
        "Your event was sent to the admin team. We'll notify you once it's reviewed."
      );
    }
    navigateTo("organizer-dashboard");
  };

  const handleSaveDraft = () => {
    const payload = {
      ...formData,
      posterName: posterFile?.name || null,
      materialNames: materials.map((file) => file.name),
    };
    localStorage.setItem(draftKey, JSON.stringify(payload));
    showSuccessPopup(
      isEditing ? "Draft update saved locally" : "Draft saved locally",
      isEditing
        ? "Your edits were saved in this browser. You can continue later."
        : "Your event details were saved in this browser. You can continue later."
    );
  };

  const handlePosterSelect = (fileList) => {
    if (fileList && fileList[0]) {
      setPosterFile(fileList[0]);
    }
  };

  const handleMaterialsSelect = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const selection = Array.from(fileList);
    setMaterials((prev) => [...prev, ...selection]);
  };

  const handlePosterDrop = (e) => {
    e.preventDefault();
    handlePosterSelect(e.dataTransfer.files);
  };

  const handleMaterialsDrop = (e) => {
    e.preventDefault();
    handleMaterialsSelect(e.dataTransfer.files);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="organizer" />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">{isEditing ? "Edit Event" : "Create New Event"}</h2>
          <p className="text-gray-600">
            {isEditing
              ? "Update your event details and save changes."
              : "Fill in the details to submit your event for approval"}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Event Title */}
            <div>
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                className="mt-2 bg-gray-50"
                value={formData.title}
                onChange={handleInputChange("title")}
              />
            </div>

            {/* Category and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="mt-2 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                  value={formData.category}
                  onChange={handleInputChange("category")}
                >
                  <option value="">Select category</option>
                  <option>Academic</option>
                  <option>Sports</option>
                  <option>Cultural</option>
                  <option>Technology</option>
                  <option>Career</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="capacity">Capacity *</Label>
                <div className="relative mt-2">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Maximum attendees"
                    className="pl-10 bg-gray-50"
                    value={formData.capacity}
                    onChange={handleInputChange("capacity")}
                  />
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startDate">Start Date & Time *</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="startDate"
                    type="datetime-local"
                    className="pl-10 bg-gray-50"
                    value={formData.startDate}
                    onChange={handleInputChange("startDate")}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="endDate">End Date & Time *</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="endDate"
                    type="datetime-local"
                    className="pl-10 bg-gray-50"
                    value={formData.endDate}
                    onChange={handleInputChange("endDate")}
                  />
                </div>
              </div>
            </div>

            {/* Venue */}
            <div>
              <Label htmlFor="venue">Venue *</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="venue"
                  placeholder="Building, room number, or location"
                  className="pl-10 bg-gray-50"
                  value={formData.venue}
                  onChange={handleInputChange("venue")}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide details about your event, agenda, speakers, etc."
                className="mt-2 bg-gray-50 min-h-32"
                value={formData.description}
                onChange={handleInputChange("description")}
              />
            </div>

            {/* Event Poster */}
            <div>
              <Label htmlFor="poster">Event Poster / Flyer (Optional)</Label>
              <input
                ref={posterInputRef}
                id="poster"
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
                onChange={(e) => handlePosterSelect(e.target.files)}
              />
              <div
                className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-kfupm-green transition-colors cursor-pointer"
                onClick={() => posterInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handlePosterDrop}
              >
                <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-gray-600 mb-1">
                  {posterFile ? posterFile.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-gray-400">PNG, JPG or PDF (max. 5MB)</p>
              </div>
            </div>

            {/* Additional Files */}
            <div>
              <Label htmlFor="files">Additional Materials (Optional)</Label>
              <input
                ref={materialsInputRef}
                id="files"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleMaterialsSelect(e.target.files)}
              />
              <div
                className="mt-2 border border-gray-300 rounded-lg p-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleMaterialsDrop}
              >
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FileText size={20} className="text-gray-400" />
                  <span>Slides, documents, or other resources</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    type="button"
                    onClick={() => materialsInputRef.current?.click()}
                  >
                    <Upload size={16} className="mr-2" />
                    Upload Files
                  </Button>
                </div>
                {materials.length > 0 && (
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    {materials.map((file, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-kfupm-green" />
                        <span className="break-all">{file.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button type="submit" className="bg-kfupm-green hover:bg-kfupm-green-dark text-white">
                Submit for Approval
              </Button>
              <Button type="button" variant="outline" onClick={handleSaveDraft}>
                Save
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="ml-auto"
                onClick={() => navigateTo("organizer-dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="mb-3 text-blue-900">Event Submission Guidelines</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Events must be submitted at least 7 days before the event date</li>
            <li>• All required fields must be completed</li>
            <li>• Event descriptions should be clear and informative</li>
            <li>• Posters should be appropriate and professional</li>
            <li>• Admin approval is required before the event is published</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
