import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ruler, Calendar, CreditCard, Scissors, CheckCircle, Info } from 'lucide-react';

const StitchingRequest = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('landing'); // landing, selection, measurement
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customVideo, setCustomVideo] = useState(null);
  const [formData, setFormData] = useState({
    garmentType: 'Shirt',
    fitting: 'Regular Fit',
    length: '',
    chest: '',
    stomach: '',
    shoulder: '',
    handLength: '',
    elbow: '',
    neck: '',
    pickupDate: '',
    pickupTime: 'Morning (9AM-12PM)',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    paymentMethod: 'COD',
    specialInstructions: ''
  });

  // Garment categories
  const singleItems = [
    { name: 'Shirt', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPgsvKXpfuHv0a8HtxV9xiPsIlpl6AsTtDw&s', price: '₹310', video: 'https://www.youtube.com/embed/2T4DWefO_4w' },
    { name: 'Pant', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuiDgKZPY2xMgBGufefasuE12tgohSlfebzW2_Ln2qIw&s', price: '₹375', video: 'https://www.youtube.com/embed/RVz2YbwKldk' },
    { name: 'Kurta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-q9Oo6dWzYosBnUXlN_TP9jvfwXiL8eyxQA&s', price: '₹310', video: 'https://www.youtube.com/embed/fuqYheOkHY4' },
    { name: 'Coat', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDYUywqja37WBc2Nqmzu8sNjhW-bpXOxflg&s', price: '₹2300', video: 'https://www.youtube.com/embed/2T4DWefO_4w' },
    { name: 'Bandi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXB_AsVT-WQYs0L9Ug-PFtz1CmcfA0nu2vFQ&s', price: '₹1350', video: 'https://www.youtube.com/embed/2T4DWefO_4w' }
  ];

  const pairedItems = [
    { name: 'Pant Shirt', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWhtXke_97CGzHnU6evtHO-t3ujeMFW2csg&s', price: '₹650', video: 'https://www.youtube.com/embed/2T4DWefO_4w' },
    { name: '2 Piece', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtHy530f-7TvcvKHeCpG2Mfjis9IdvOHJDiQ&s', price: '₹2900', video: 'https://www.youtube.com/embed/2T4DWefO_4w' },
    { name: '3 Piece', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxaZ8aIrzMGwNEGu0SsW1lMXCd7yMDI7C7g&s', price: '₹3800', video: 'https://www.youtube.com/embed/2T4DWefO_4w' },
    { name: 'Kurta Pajama', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMOUGnWmf8HwfFVkxqauGHaSAYCMl88Wcvw&s', price: '₹650', video: 'https://www.youtube.com/embed/2T4DWefO_4w' }
  ];

  const garmentTypes = ['Shirt', 'Pant', 'Kurta', 'Blazer', 'Sherwani'];
  
  const getFittingOptions = (garmentType) => {
    const fittingStyles = {
      'Shirt': [
        { value: 'Slim Fit', label: 'Slim Fit', icon: '👔', desc: 'Body-hugging fit' },
        { value: 'Regular Fit', label: 'Regular Fit', icon: '👕', desc: 'Comfortable fit' },
        { value: 'Loose Fit', label: 'Loose Fit', icon: '🧥', desc: 'Relaxed fit' }
      ],
      'Pant': [
        { value: 'Slim Fit', label: 'Slim Fit', icon: '👖', desc: 'Body-hugging fit' },
        { value: 'Regular Fit', label: 'Regular Fit', icon: '👖', desc: 'Comfortable fit' },
        { value: 'Loose Fit', label: 'Loose Fit', icon: '👖', desc: 'Relaxed fit' }
      ],
      'Kurta': [
        { value: 'Slim Fit', label: 'Slim Fit', icon: '🥻', desc: 'Body-hugging fit' },
        { value: 'Regular Fit', label: 'Regular Fit', icon: '🥻', desc: 'Comfortable fit' },
        { value: 'Loose Fit', label: 'Loose Fit', icon: '🥻', desc: 'Relaxed fit' }
      ]
    };
    return fittingStyles[garmentType] || fittingStyles['Shirt'];
  };
  const timeSlots = ['Morning (9AM-12PM)', 'Afternoon (12PM-3PM)', 'Evening (3PM-6PM)'];

  // Pant measurements
  const pantMeasurements = [
    { name: 'length', label: 'Length', placeholder: '40', color: 'from-red-50 to-orange-50', borderColor: 'red-200', focusColor: 'red-500', point: '1' },
    { name: 'mohri', label: 'Mohri/Bottom', placeholder: '16', color: 'from-blue-50 to-indigo-50', borderColor: 'blue-200', focusColor: 'blue-500', point: '2' },
    { name: 'knees', label: 'Ghootna/Knees', placeholder: '18', color: 'from-green-50 to-emerald-50', borderColor: 'green-200', focusColor: 'green-500', point: '3' },
    { name: 'thigh', label: 'Thigh', placeholder: '24', color: 'from-purple-50 to-pink-50', borderColor: 'purple-200', focusColor: 'purple-500', point: '4' },
    { name: 'waist', label: 'Waist/Kamar', placeholder: '32', color: 'from-cyan-50 to-blue-50', borderColor: 'cyan-200', focusColor: 'cyan-500', point: '5' },
    { name: 'hips', label: 'Hips', placeholder: '38', color: 'from-yellow-50 to-amber-50', borderColor: 'yellow-200', focusColor: 'yellow-500', point: '6' },
    { name: 'gedhry', label: 'Gedhry', placeholder: '12', color: 'from-pink-50 to-rose-50', borderColor: 'pink-200', focusColor: 'pink-500', point: '7' }
  ];
   // Shirt measurements with visual guide
  const shirtMeasurements = [
    { name: 'length', label: 'Length', placeholder: '28', color: 'from-red-50 to-orange-50', borderColor: 'red-200', focusColor: 'red-500', point: '1' },
    { name: 'chest', label: 'Chest', placeholder: '38', color: 'from-blue-50 to-indigo-50', borderColor: 'blue-200', focusColor: 'blue-500', point: '2' },
    { name: 'stomach', label: 'Stomach', placeholder: '36', color: 'from-green-50 to-emerald-50', borderColor: 'green-200', focusColor: 'green-500', point: '3' },
    { name: 'shoulder', label: 'Shoulder', placeholder: '16', color: 'from-purple-50 to-pink-50', borderColor: 'purple-200', focusColor: 'purple-500', point: '4' },
    { name: 'handLength', label: 'Hand Length', placeholder: '24', color: 'from-cyan-50 to-blue-50', borderColor: 'cyan-200', focusColor: 'cyan-500', point: '5' },
    { name: 'elbow', label: 'Elbow', placeholder: '14', color: 'from-yellow-50 to-amber-50', borderColor: 'yellow-200', focusColor: 'yellow-500', point: '6' },
    { name: 'neck', label: 'Neck', placeholder: '15', color: 'from-pink-50 to-rose-50', borderColor: 'pink-200', focusColor: 'pink-500', point: '7' }
  ];

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setCustomVideo(videoUrl);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('✅ Stitching request submitted! Our delivery partner will reach you within 30 minutes.');
      navigate('/my-orders');
    }, 2000);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => {
    if (step === 1) {
      setCurrentPage('selection');
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setStep(1);
  };

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6 animate-bounce">
              <Scissors size={64} className="text-white" />
            </div>
            <h1 className="text-6xl font-black text-gray-800 mb-4">Custom Stitching Service</h1>
            <p className="text-2xl text-gray-600 mb-8">Perfect Fit, Premium Quality, Fast Delivery</p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center hover:scale-105 transition-all">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Best Stitch Quality</h3>
              <p className="text-gray-600">Expert tailors with 20+ years experience ensuring premium quality stitching</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center hover:scale-105 transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fit As You Want</h3>
              <p className="text-gray-600">Slim, Regular, or Loose fit - customized exactly to your measurements</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center hover:scale-105 transition-all">
              <div className="text-5xl mb-4">🆓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Free Alteration</h3>
              <p className="text-gray-600">Not satisfied? We'll re-stitch for FREE until it fits perfectly!</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentPage('selection')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-2xl hover:scale-110"
            >
              Start Stitching Order →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Selection Page
  if (currentPage === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-800 mb-3">What You Want To Stitch?</h1>
            <p className="text-xl text-gray-600">Choose your garment type</p>
          </div>

          {/* Single Items */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Single</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {singleItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setFormData({ ...formData, garmentType: item.name });
                    setSelectedCategory(item);
                    setCurrentPage('measurement');
                  }}
                  className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:scale-110 hover:shadow-2xl transition-all text-center"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                  ) : (
                    <div className="text-6xl mb-3">{item.icon}</div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-indigo-600">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Paired Items */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Paired</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {pairedItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setFormData({ ...formData, garmentType: item.name });
                    setSelectedCategory(item);
                    setCurrentPage('measurement');
                  }}
                  className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:scale-110 hover:shadow-2xl transition-all text-center"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                  ) : (
                    <div className="text-6xl mb-3">{item.icon}</div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-2xl font-bold text-purple-600">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleBackToLanding}
              className="text-gray-600 hover:text-gray-800 font-bold text-lg"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 animate-bounce">
            <Scissors size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-800 mb-3">Custom Stitching</h1>
          <p className="text-xl text-gray-600">Get your clothes stitched perfectly - Pickup within 30 minutes!</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= num 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-110 shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 3 && <div className={`w-16 h-1 ${step > num ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Garment Type & Measurements */}
          {step === 1 && formData.garmentType === 'Shirt' && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <Ruler className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Shirt Measurements</h2>
              </div>

              {/* Visual Guide + Form Side by Side */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Left: Visual Guide */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Info size={24} className="text-indigo-600" />
                    Measurement Guide
                  </h3>
                  
                  {/* Video Tutorial */}
                  <div className="relative bg-black rounded-xl shadow-2xl overflow-hidden">
                    {customVideo ? (
                      <video 
                        className="w-full h-auto rounded-xl"
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        key={customVideo}
                      >
                        <source src={customVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        className="w-full aspect-video rounded-xl"
                        src="https://www.youtube.com/embed/2T4DWefO_4w?autoplay=1&mute=1&loop=1&playlist=2T4DWefO_4w"
                        title="Shirt Measurement Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                    
                    {/* Upload Custom Video Button */}
                    <div className="absolute bottom-4 right-4">
                      <label className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Video
                        <input 
                          type="file" 
                          accept="video/*" 
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Watch this HD tutorial to learn proper measurement techniques!
                    </p>
                  </div>

                  <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <p className="text-sm text-yellow-800 font-semibold">
                      💡 Tip: Measure in inches. Keep the tape snug but not tight!
                    </p>
                  </div>
                </div>

                {/* Right: Measurement Form */}
                <div className="space-y-4">
                  {/* Fitting Preference */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200 mb-6">
                    <label className="text-lg font-bold text-gray-800 mb-4 block">Choose Fitting Style</label>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {getFittingOptions('Shirt').map((fit) => (
                        <label
                          key={fit.value}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${
                            formData.fitting === fit.value
                              ? 'border-indigo-600 bg-indigo-100 shadow-lg scale-105'
                              : 'border-gray-200 bg-white hover:border-indigo-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="fitting"
                            value={fit.value}
                            checked={formData.fitting === fit.value}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className="text-3xl mb-2">{fit.icon}</div>
                          <div className="font-bold text-sm text-gray-800">{fit.label}</div>
                          <div className="text-xs text-gray-600 mt-1">{fit.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {shirtMeasurements.map((measurement) => (
                    <div key={measurement.name} className={`bg-gradient-to-br ${measurement.color} p-5 rounded-2xl border-2 border-${measurement.borderColor} hover:shadow-lg transition-all`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold`}>
                          {measurement.point}
                        </div>
                        <label className="text-lg font-bold text-gray-800">{measurement.label}</label>
                      </div>
                      <input
                        type="number"
                        step="0.5"
                        name={measurement.name}
                        value={formData[measurement.name]}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 border-${measurement.borderColor} rounded-xl focus:border-${measurement.focusColor} focus:outline-none text-lg font-semibold`}
                        placeholder={`${measurement.placeholder} inches`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Next: Pickup Details →
              </button>
            </div>
          )}

          {/* Pant Measurements */}
          {step === 1 && formData.garmentType === 'Pant' && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <Ruler className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Pant Measurements</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Info size={24} className="text-indigo-600" />
                    Measurement Guide
                  </h3>
                  
                  <div className="relative bg-black rounded-xl shadow-2xl overflow-hidden">
                    {customVideo ? (
                      <video className="w-full h-auto rounded-xl" controls autoPlay loop muted playsInline key={customVideo}>
                        <source src={customVideo} type="video/mp4" />
                      </video>
                    ) : (
                      <iframe
                        className="w-full aspect-video rounded-xl"
                        src="https://www.youtube.com/embed/RVz2YbwKldk?autoplay=1&mute=1&loop=1&playlist=RVz2YbwKldk"
                        title="Pant Measurement Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                    
                    <div className="absolute bottom-4 right-4">
                      <label className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Video
                        <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Watch this HD tutorial to learn proper measurement techniques!
                    </p>
                  </div>

                  <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <p className="text-sm text-yellow-800 font-semibold">
                      💡 Tip: Measure in inches. Keep the tape snug but not tight!
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200 mb-6">
                    <label className="text-lg font-bold text-gray-800 mb-4 block">Choose Fitting Style</label>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {getFittingOptions('Pant').map((fit) => (
                        <label key={fit.value} className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${formData.fitting === fit.value ? 'border-indigo-600 bg-indigo-100 shadow-lg scale-105' : 'border-gray-200 bg-white hover:border-indigo-300'}`}>
                          <input type="radio" name="fitting" value={fit.value} checked={formData.fitting === fit.value} onChange={handleChange} className="hidden" />
                          <div className="text-3xl mb-2">{fit.icon}</div>
                          <div className="font-bold text-sm text-gray-800">{fit.label}</div>
                          <div className="text-xs text-gray-600 mt-1">{fit.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {pantMeasurements.map((measurement) => (
                    <div key={measurement.name} className={`bg-gradient-to-br ${measurement.color} p-5 rounded-2xl border-2 border-${measurement.borderColor} hover:shadow-lg transition-all`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                          {measurement.point}
                        </div>
                        <label className="text-lg font-bold text-gray-800">{measurement.label}</label>
                      </div>
                      <input
                        type="number"
                        step="0.5"
                        name={measurement.name}
                        value={formData[measurement.name]}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 border-${measurement.borderColor} rounded-xl focus:border-${measurement.focusColor} focus:outline-none text-lg font-semibold`}
                        placeholder={`${measurement.placeholder} inches`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Next: Pickup Details →
              </button>
            </div>
          )}

          {/* Kurta Measurements - Same as Shirt */}
          {step === 1 && formData.garmentType === 'Kurta' && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <Ruler className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Kurta Measurements</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Info size={24} className="text-indigo-600" />
                    Measurement Guide
                  </h3>
                  
                  <div className="relative bg-black rounded-xl shadow-2xl overflow-hidden">
                    {customVideo ? (
                      <video className="w-full h-auto rounded-xl" controls autoPlay loop muted playsInline key={customVideo}>
                        <source src={customVideo} type="video/mp4" />
                      </video>
                    ) : (
                      <iframe
                        className="w-full aspect-video rounded-xl"
                        src="https://www.youtube.com/embed/fuqYheOkHY4?autoplay=1&mute=1&loop=1&playlist=fuqYheOkHY4"
                        title="Kurta Measurement Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                    
                    <div className="absolute bottom-4 right-4">
                      <label className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Upload Video
                        <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Watch this HD tutorial to learn proper measurement techniques!
                    </p>
                  </div>

                  <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <p className="text-sm text-yellow-800 font-semibold">
                      💡 Tip: Measure in inches. Keep the tape snug but not tight!
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200 mb-6">
                    <label className="text-lg font-bold text-gray-800 mb-4 block">Choose Fitting Style</label>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {getFittingOptions('Kurta').map((fit) => (
                        <label key={fit.value} className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${formData.fitting === fit.value ? 'border-indigo-600 bg-indigo-100 shadow-lg scale-105' : 'border-gray-200 bg-white hover:border-indigo-300'}`}>
                          <input type="radio" name="fitting" value={fit.value} checked={formData.fitting === fit.value} onChange={handleChange} className="hidden" />
                          <div className="text-3xl mb-2">{fit.icon}</div>
                          <div className="font-bold text-sm text-gray-800">{fit.label}</div>
                          <div className="text-xs text-gray-600 mt-1">{fit.desc}</div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {shirtMeasurements.map((measurement) => (
                    <div key={measurement.name} className={`bg-gradient-to-br ${measurement.color} p-5 rounded-2xl border-2 border-${measurement.borderColor} hover:shadow-lg transition-all`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                          {measurement.point}
                        </div>
                        <label className="text-lg font-bold text-gray-800">{measurement.label}</label>
                      </div>
                      <input
                        type="number"
                        step="0.5"
                        name={measurement.name}
                        value={formData[measurement.name]}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border-2 border-${measurement.borderColor} rounded-xl focus:border-${measurement.focusColor} focus:outline-none text-lg font-semibold`}
                        placeholder={`${measurement.placeholder} inches`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Next: Pickup Details →
              </button>
            </div>
          )}

          {/* Step 2: Pickup Date & Address */}
          {step === 2 && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Pickup Schedule</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
                  <label className="block text-lg font-bold text-gray-800 mb-3">Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:outline-none text-lg font-semibold"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <label className="block text-lg font-bold text-gray-800 mb-3">Pickup Time Slot</label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg font-semibold"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl">
                  <label className="block text-lg font-bold text-gray-800 mb-3">Pickup Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                    placeholder="House No, Street, Area"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="400001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Next: Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment & Confirm */}
          {step === 3 && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Payment & Confirm</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl">
                  <label className="block text-lg font-bold text-gray-800 mb-4">Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 border-2 border-green-200 rounded-xl cursor-pointer hover:border-green-500 transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={formData.paymentMethod === 'COD'}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="font-bold text-gray-800">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-4 p-4 border-2 border-purple-200 rounded-xl cursor-pointer hover:border-purple-500 transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={formData.paymentMethod === 'UPI'}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="font-bold text-gray-800">UPI Payment</p>
                        <p className="text-sm text-gray-600">PhonePe, GPay, Paytm</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Special Instructions (Optional)</label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                    placeholder="Any specific requirements..."
                  />
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                  <p className="text-center text-lg font-bold text-orange-700">
                    ⚡ Our delivery partner will reach you within 30 minutes!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-2 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : (
                    <>
                      <CheckCircle size={24} />
                      Confirm Request
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StitchingRequest;
