import React from 'react';

interface Props {
  onAccept?: () => void;
  onDecline?: () => void;
  showActions?: boolean;
  maxHeight?: string;
}

const page: React.FC<Props> = ({ 
  onAccept, 
  onDecline, 
  showActions = false,
  maxHeight = '70vh'
}) => {
  return (
    <div className="flex-1">
      {/* Header */}
      <div className=" mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Terms of Use
        </h1>
      </div>

      {/* Scrollable Content */}
      <div 
        className="  mb-6 overflow-y-auto"
        style={{ maxHeight }}
      >
        <div className="space-y-4">
          <p className="text-gray-700 leading-6">
            Any software or product created by Superfan NG has no warranty, unless otherwise is stated. 
            We don&apos;t accept liability for legal, medical or technical issues that might occur in result 
            of using our products, services and software distributions.
          </p>

          <p className="text-gray-700 leading-6">
            Superfan NG is not liable for misusing artwork or source code listed in Licensing page, 
            please take the extra step to make sure you are using content appropriate way.
          </p>

          <p className="text-gray-700 leading-6">
            Superfan NG is hosted in Hostinger via Vercel, see their terms of service.
          </p>

          <p className="text-gray-700 leading-6">
            Additionally Google&apos;s Terms of Use apply.
          </p>

          <p className="text-gray-700 leading-6">
            Accepting the terms to use our products and services means you have reviewed and accept 
            our Privacy Policy. Please check Privacy Policy page for more information on how we treat 
            your data and collect information.
          </p>

          <p className="text-gray-700 leading-6">
            We will notify you using the best contact channel (via email and/or social media channels) 
            we can for you to review and accept the changes to this terms.
          </p>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onDecline}
            className="px-8 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200 font-semibold flex-1 sm:flex-none"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold flex-1 sm:flex-none"
          >
            Accept Terms
          </button>
        </div>
      )}
    </div>
  );
};

export default page;