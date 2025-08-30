import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20 lg:py-32">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mb-6 sm:mb-8 leading-tight">
              School
              <br className="sm:hidden" />
              <span className="gradient-text block sm:inline"> Management</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Streamline your educational institution management with our comprehensive system. 
              Add schools, manage information, and explore educational opportunities effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-20">
              <Link 
                href="/addSchool" 
                className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-105 shadow-2xl font-bold text-lg sm:text-xl"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New School
              </Link>
              
              <Link 
                href="/showSchools" 
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-gray-800 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl hover:bg-gray-50 transform transition-all duration-300 hover:scale-105 shadow-xl border-2 border-gray-200 font-bold text-lg sm:text-xl"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Browse Schools
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-20">
          {/* Add School Card */}
          <div className="card-hover bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-100 group cursor-pointer">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Add New School</h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                Register new educational institutions with comprehensive details including contact information, 
                location data, and high-quality images for better visibility.
              </p>
              <Link 
                href="/addSchool" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transform transition-all duration-200 hover:scale-105 shadow-lg font-semibold text-base sm:text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Get Started
              </Link>
            </div>
          </div>

          {/* Browse Schools Card */}
          <div className="card-hover bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-100 group cursor-pointer">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Browse Schools</h3>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                Explore our comprehensive directory of educational institutions. View detailed information, 
                stunning images, and complete contact details in an intuitive interface.
              </p>
              <Link 
                href="/showSchools" 
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transform transition-all duration-200 hover:scale-105 shadow-lg font-semibold text-base sm:text-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Explore Now
              </Link>
            </div>
          </div>
        </div>

        {/* Features Highlight Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-100">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Platform <span className="gradient-text">Features</span>
            </h3>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              Discover the powerful features that make our school management system the perfect choice for educational institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 text-lg sm:text-xl">Smart Validation</h4>
              <p className="text-sm sm:text-base text-gray-600">Comprehensive form validation ensures data integrity and accuracy</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 text-lg sm:text-xl">Image Management</h4>
              <p className="text-sm sm:text-base text-gray-600">Secure image upload with preview and automatic optimization</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 text-lg sm:text-xl">Smart Search</h4>
              <p className="text-sm sm:text-base text-gray-600">Advanced search functionality across names, cities, and locations</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-red-100 to-red-200 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-2 text-lg sm:text-xl">Responsive Design</h4>
              <p className="text-sm sm:text-base text-gray-600">Fully optimized for desktop, tablet, and mobile devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
