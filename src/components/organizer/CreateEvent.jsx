import { Header } from "../Header";
import { Upload, Calendar, MapPin, Users, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export function CreateEvent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="organizer" />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Create New Event</h2>
          <p className="text-gray-600">Fill in the details to submit your event for approval</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <form className="space-y-6">
            {/* Event Title */}
            <div>
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                className="mt-2 bg-gray-50"
              />
            </div>

            {/* Category and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="mt-2 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
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
              />
            </div>

            {/* Event Poster */}
            <div>
              <Label htmlFor="poster">Event Poster / Flyer (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-kfupm-green transition-colors cursor-pointer">
                <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-400">PNG, JPG or PDF (max. 5MB)</p>
              </div>
            </div>

            {/* Additional Files */}
            <div>
              <Label htmlFor="files">Additional Materials (Optional)</Label>
              <div className="mt-2 border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FileText size={20} className="text-gray-400" />
                  <span>Slides, documents, or other resources</span>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Upload size={16} className="mr-2" />
                    Upload Files
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button className="bg-kfupm-green hover:bg-kfupm-green-dark text-white">
                Submit for Approval
              </Button>
              <Button variant="outline">
                Save
              </Button>
              <Button variant="ghost" className="ml-auto">
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
