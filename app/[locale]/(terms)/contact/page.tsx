import FbIcon from "@/public/icons/FbIcon";
import IgIcon from "@/public/icons/IgIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";

import React from "react";
import { FaXTwitter } from "react-icons/fa6";

const ContactPage: React.FC = () => {
  return (
    <div className="flex-1 text-black">
      {/* Header */}
      <div className=" mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Contact Us
        </h1>
      </div>
      <div className="">
        {/* Header Section */}
        <div className="text-left mb-5">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We are committed to make our website best it can be, but sometimes
            our human team can miss things our extra notice, and think about.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            If you need to get in contact with us for any reason of following,
            giving feedback, about legal issues, advertisement offers etc.,
            choose the following respective email address.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 pb-2">
            Our contact information:
          </h2>

          {/* Feedback Contact */}
          <div className="mb-2">
            <h3 className="text-xl font-bold  mb-3">Feedback Contact</h3>
            <div className=" py-2 mb-2">
              <a
                href="mailto:Feedback@targetfutureg"
                className=" text-lg font-medium transition-colors"
              >
                Feedback@superfan.ng
              </a>
            </div>
            <p className="text-gray-700 leading-relaxed">
              You value what does think, and keep working on a better user
              experience. If you take the time to share your ideas, we
              prioritize you as well evaluate it, and even implement it as fast
              as we call!
            </p>
          </div>

          {/* Legal Contact */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Legal and Taskroom Contact
            </h3>
            <div className="  py-2 mb-2">
              <a
                href="mailto:Regit@targetfutureg"
                className=" text-lg font-medium transition-colors"
              >
                legal@superfan.ng
              </a>
            </div>
            <p className="text-gray-700 leading-relaxed mb-2">
              We list contact from licences filling the criteria from our
              Licensing page. If we have mistaken or distributed messages,
              please visit our website at www.licensing.com. This is not a
              notice, your solicitor will be processed and we will inform you
              about it if this Plan 7 business days.
            </p>
            <p className=" font-medium  py-1 rounded inline-block">
              Usually we answer this requests in the same day.
            </p>
          </div>

          {/* Advertisement Contact */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Advertisement Contact
            </h3>
            <div className="   py-2 mb-2">
              <a
                href="mailto:info@targetfutureg"
                className=" text-lg font-medium transition-colors"
              >
                ads@superfan.ng
              </a>
            </div>
            <p className="text-gray-700 leading-relaxed mb-2">
              We offer inquiries ways to provide your business and products, its
              clients and respectful manner to our customers. We also include
              online advertising, promotional blogs posts, social media about
              color and weekly mail campaign mentions.
            </p>
            <div className=" p4 rounded">
              <p className=" text-sm">
                Keep in mind once our goal is to supply this contact, we will
                not sell your contact directly on our platform, or premium
                contact card when comes by your product with any reliable phone
                information.
              </p>
            </div>
          </div>

          {/* General Contact */}
          <div className="mb-2">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              General Contact
            </h3>
            <div className=" py-2 mb-2">
              <a
                href="mailto:info@targetfutureg"
                className=" text-lg font-medium transition-colors"
              >
                info@superfan.ng
              </a>
            </div>
            <p className="text-gray-700 leading-relaxed">
              If your reason to contact doesn&apos;t fit any other category, get
              in touch with us with this email. Keep in mind answer to this
              email might be known than others.
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Social Media Contact(s)
          </h3>

          <div className="flex space-x-6 mb-6">
            <div className="h-8 w-8">
              <FbIcon />
            </div>
            <div className="h-8 w-8">
              <FaXTwitter className="h-full w-full" />
            </div>
            <div className="h-8 w-8">
              <WhatsAppIcon />
            </div>
            <div className="h-8 w-8">
              <IgIcon />
            </div>
          </div>

          <p className="text-gray-700">
            You can follow and connect with us on any of our social media
            handlers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
