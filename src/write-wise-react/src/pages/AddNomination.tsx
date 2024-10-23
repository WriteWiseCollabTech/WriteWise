import React, { useState } from 'react';
import PhaseTabs from '../components/PhaseTabs';
import AddNominationButton from '../components/AddNominationButton';
import { Nomination, Phase } from '../types/Competition';

interface AddNominationPageProps {
  competitionId: string;
  competitionPhase: Phase;
  onBack: () => void;
}

const AddNominationPage: React.FC<AddNominationPageProps> = ({ competitionId, competitionPhase, onBack }) => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [reason, setReason] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString() || '';
        setImageUrl(base64String); // Set the base64 string as imageUrl
      };
      reader.readAsDataURL(file); // Convert the image to a Base64 string
    }
  };

  const nomination: Nomination = {
    id: "1", 
    title,
    competitionId,
    link,
    description,
    imageUrl,
    reason,
    nominator: '',
    voteCount: 0
  };

  return (
    <div className="p-5">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-blue-600 mb-5">Add Nomination</h1>

      {/* Phase Tabs Component */}
      <PhaseTabs currentPhase={competitionPhase} layout="horizontal" />

      {/* Form Fields */}
      <div className="space-y-5 mb-5">

      <div>
          <label className="block font-semibold mb-1" htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Title of paper"
            maxLength={200}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Link to Publication Source */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="link">
            Link to publication source <span className="text-red-500">*</span>
          </label>
          <input
            id="link"
            type="url"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="https://"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            id="description"
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Description of paper (200 char max)"
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="link">
             Image Link
          </label>
          <input
            id="link"
            type="url"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="https://"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        {/* Reason for Nomination */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="reason">
            Reason for nomination <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reason"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Share your reasons for nominating.."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Back and Submit Buttons */}
      <div className="flex gap-4">
        <button
          className="flex-1 basis-1/2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          onClick={onBack}
        >
          Back
        </button>
        <div className="flex-1 basis-1/2">
          <AddNominationButton nomination={nomination}  onSuccess={() => onBack()}  />
        </div>
      </div>
    </div>
  );
};

export default AddNominationPage;

/*

<div>
          <label className="block font-semibold mb-1" htmlFor="link">
            Link to publication source <span className="text-red-500">*</span>
          </label>
          <input
            id="link"
            type="url"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="https://"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        */