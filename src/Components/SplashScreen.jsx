import React from 'react';

const SplashScreen = ({ isExiting }) => {
  return (
    <>
      <div className={`fixed inset-0 z-50 transition-all duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-teal-700 via-emerald-700 to-green-800 p-4 rounded-3xl shadow-2xl">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" fill="currentColor" fillOpacity="0.2"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="8" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-6xl font-black text-white tracking-tight">
                Fitly
              </h1>
            </div>
            <p className="text-sm text-gray-400 font-semibold">
              Md Imam - Trusted You Like Tailor Since 1989
            </p>
          </div>
        </div>
      </div>
      
      {/* Green Column Sweep Animation */}
      {isExiting && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-green-900 via-green-700 to-green-900 animate-sweep-right shadow-2xl"></div>
        </div>
      )}
    </>
  );
};

export default SplashScreen;
