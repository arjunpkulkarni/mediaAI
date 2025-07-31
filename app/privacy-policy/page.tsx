import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg text-gray-700 mx-auto">
          <p>
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our application.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our application</li>
            <li>Improve, personalize, and expand our application</li>
            <li>Understand and analyze how you use our application</li>
            <li>Develop new products, services, features, and functionality</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Security</h2>
          <p>
            The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>

          <p className="mt-8">
            This is a placeholder document. Please replace this with your own Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 