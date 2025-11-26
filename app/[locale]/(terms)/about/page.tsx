const AboutPage = () => {
    return (
   
        <div className="flex-1">
          {/* Page Title */}
          <div className=" mb-6">
            <h1 className="text-3xl font-bold text-gray-900">About the company</h1>
          </div>
  
          {/* Content Section */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb6 leading-relaxed">
              Superfan NG is a Nigerian edtech platform that offers aptitude tests in
              quantitative and qualitative reasoning in indigenous knowledge.
            </p>
  
            <p className="text-gray-700 mb6 leading-relaxed">
              The platform features a gamification system that incentivizes user
              engagement through rewards including points and cash payouts.
            </p>
  
            <p className="text-gray-700 leading-relaxed">
              While operating on a freemium model, the company offers ad-supported
              free access to its platform, while generating primary revenue through
              premium subscriptions that grant unlimited test access and generative AI
              capabilities.
            </p>
          </div>
        </div>
    
    );
  };
  
  export default AboutPage;