import { useState } from "react";
import {
  FaMapPin,
  FaDollarSign,
  FaBriefcase,
  FaClock,
  FaEye,
  FaDownload,
  FaFile,
  FaBuilding,
} from "react-icons/fa6";

const Member = ({ member, handlePreview, handleResumeDownload }) => {
  return (
    <>
      <div className="group relative bg-white rounded-lg border border-gray-100 hover:bg-gray-100">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 " />

        <div className="relative p-6">
          {/* Header: Profile + Status */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                {member.picturePath ? (
                  <img
                    src={`http://localhost:8000/${member.picturePath}`}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {member.firstName}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-3 border-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">{`${member.firstName} ${member.lastName}`}</h3>
                <p className="text-gray-600 font-medium">{member.jobTitle}</p>
                <p className="text-gray-600 font-light">
                  {member.userDoc.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <FaBuilding className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {member.employer}
                  </span>
                </div>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                member.empStatus === "Employed"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
              {member.empStatus}
            </span>
          </div>

          {/* Job Posting Section */}
          <div className="space-y-4 pt-5 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">
                {member.jobDocs.title}
              </h4>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {member.jobDocs.jobType}
              </span>
            </div>

            <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
              {member.jobDocs.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <FaBriefcase className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{member.jobDocs.company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaMapPin className="w-4 h-4 text-gray-500" />
                <span>{member.jobDocs.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaDollarSign className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-green-700">
                  ${member.jobDocs.salary.toLocaleString()}/yr
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaClock className="w-4 h-4 text-gray-500" />
                <span>{member.jobDocs.hoursPerWeek} hrs/week</span>
              </div>
            </div>
          </div>

          {/* Resume Actions */}
          <div className="mt-6 flex gap-3">
            {true ? (
              <>
                <button
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                  <FaEye className="w-5 h-5" />
                  Preview Resume
                </button>

                <button
                  onClick={(e) => handleResumeDownload(member._id)}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors border border-gray-300">
                  <FaDownload className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center w-full py-3 text-gray-500 text-sm italic">
                <FaFile className="w-5 h-5 mr-2 opacity-60" />
                No resume uploaded
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;
