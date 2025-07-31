import React from 'react';

const TermsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg text-gray-700 mx-auto">
          <p>
            Welcome to our application. These terms and conditions outline the rules and regulations for the use of our services.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
          <p>
            By accessing this application, we assume you accept these terms and conditions. Do not continue to use our services if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, we and/or our licensors own all the intellectual property rights and materials contained in this application. You are granted a limited license only for purposes of viewing the material contained on this app.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Restrictions</h2>
          <p>
            You are specifically restricted from all of the following:
          </p>
          <ul>
            <li>Publishing any application material in any other media.</li>
            <li>Selling, sublicensing and/or otherwise commercializing any application material.</li>
            <li>Publicly performing and/or showing any application material.</li>
            <li>Using this application in any way that is or may be damaging to this application.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Your Content</h2>
          <p>
            In these terms and conditions, “Your Content” shall mean any audio, video, text, images or other material you choose to display on this application. By displaying Your Content, you grant us a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">No warranties</h2>
          <p>
            This application is provided “as is,” with all faults, and we express no representations or warranties, of any kind related to this application or the materials contained on this application.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law & Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the State, and you submit to the non-exclusive jurisdiction of the state and federal courts located in for the resolution of any disputes.
          </p>

          <p className="mt-8">
            This is a placeholder document. Please replace this with your own Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 