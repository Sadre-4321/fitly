import { Award, Users, Scissors, Heart, Clock, Star, TrendingUp, Shield, CheckCircle, BadgeCheck } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Clock, label: '35+', value: 'Years of Excellence', color: 'from-indigo-500 to-blue-500' },
    { icon: Users, label: '1,000,000+', value: 'Customers Served', color: 'from-purple-500 to-pink-500' },
    { icon: Scissors, label: '100%', value: 'Men\'s Wear Specialist', color: 'from-red-500 to-rose-500' },
    { icon: BadgeCheck, label: 'Since 1989', value: 'Trusted Legacy', color: 'from-green-500 to-teal-500' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Master Craftsmanship',
      description: 'Every garment crafted with 35+ years of expertise and precision',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Users,
      title: 'Customer First Always',
      description: '1 Million+ satisfied customers trust us for their wardrobe needs',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: TrendingUp,
      title: 'Traditional Meets Modern',
      description: 'Classic tailoring techniques enhanced with digital convenience',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Shield,
      title: 'Trust & Authenticity',
      description: 'Single owner business ensuring consistent quality since 1989',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const timeline = [
    { year: '1989', event: 'You Like Tailor founded by Md Imam in Bettiah', icon: '🏪' },
    { year: '1995', event: 'Crossed 10,000 satisfied customers', icon: '🎯' },
    { year: '2005', event: 'Became Bettiah\'s most trusted tailor shop', icon: '⭐' },
    { year: '2015', event: 'Served 500,000+ customers milestone', icon: '🎉' },
    { year: '2024', event: 'Reached 1 Million+ customers served', icon: '🏆' },
    { year: '2026', event: 'Launched Fitly - Digital Platform', icon: '🚀' }
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', text: 'Best tailor in Bettiah! Been coming here for 15 years.', rating: 5 },
    { name: 'Amit Singh', text: 'Perfect fit every time. Md Imam sir is a master craftsman.', rating: 5 },
    { name: 'Suresh Yadav', text: 'Three generations of my family trust You Like Tailor.', rating: 5 }
  ];

  const employees = [
    { name: 'Md Najir Alam', role: 'Master Tailor', experience: '22+ Years', specialization: 'Kurta & Pajama Expert', icon: '🥻' },
    { name: 'Naagin Kumar', role: 'Senior Tailor', experience: '22+ Years', specialization: 'Kurta & Pajama Specialist', icon: '🥻' },
    { name: 'Bablu Kumar', role: 'Shirt Specialist', experience: '22+ Years', specialization: 'Shirt Man', icon: '👔' },
    { name: 'Sarju Kumar', role: 'Master Tailor', experience: '22+ Years', specialization: 'Shirt Expert', icon: '👔' },
    { name: 'Guddu Kumar', role: 'Tailor', experience: '15+ Years', specialization: 'Shirt Stitching', icon: '👔' },
    { name: 'Md Afroj Alam', role: 'Pant Specialist', experience: '20+ Years', specialization: 'Custom Pants & Formal Wear', icon: '👖' },
    { name: 'Md Sohrab Alam', role: 'Master Pants', experience: '35+ Years', specialization: 'Formal Pants Expert', icon: '👖' },
    { name: 'Babujaan Alam', role: 'Master Pants', experience: '35+ Years', specialization: 'Formal Pants Specialist', icon: '👖' },
    { name: 'Mumtaaj Alam', role: 'Master Pants', experience: '35+ Years', specialization: 'Formal Pants Stitching', icon: '👖' },
    { name: 'Sheikh Abbash', role: 'Kids Wear Specialist', experience: '20+ Years', specialization: 'Kids Shirts, Pants, Kurtas & Frocks', icon: '👶' },
    { name: 'Taiyab Alam', role: 'Pant Man', experience: '30+ Years', specialization: 'Pants Expert', icon: '👖' },
    { name: 'Najir Alam', role: 'Suit Specialist', experience: '25+ Years', specialization: 'Coat, Bandi, Waistcoat Expert', icon: '🤵' },
    { name: 'Manohar Patel', role: 'Super Specialist Shirt Man', experience: '30+ Years', specialization: 'Shirt Stitching Expert', icon: '👔' },
    { name: 'Sheru Alam', role: 'Super Specialist Shirt', experience: '15+ Years', specialization: 'Shirt Stitching', icon: '👔' }
  ];

  const certifications = [
    { icon: '✓', text: 'ISO Quality Certified' },
    { icon: '✓', text: '35+ Years Experience' },
    { icon: '✓', text: '1M+ Happy Customers' },
    { icon: '✓', text: 'Premium Fabric Partners' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-24 px-4">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-block p-6 bg-white/20 backdrop-blur rounded-full mb-6 animate-bounce">
            <Scissors size={64} className="text-white" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
            You Like Tailor
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 font-light max-w-3xl mx-auto mb-4">
            35 Years of Stitching Dreams into Reality
          </p>
          <p className="text-xl text-white/80 font-medium">
            Founded by Md Imam | Since 1989 | Bettiah, Bihar
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-all">
                <div className={`inline-block p-4 bg-gradient-to-r ${stat.color} rounded-full mb-4`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-2">{stat.label}</h3>
                <p className="text-lg text-gray-600 font-semibold">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Owner & Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold mb-4">
              🏆 Single Owner Business - Consistent Quality Guaranteed
            </div>
            <h2 className="text-5xl font-black text-gray-800 mb-6">
              The Legacy of Md Imam
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              In <span className="font-bold text-indigo-600">1989</span>, <span className="font-bold">Md Imam</span> founded <span className="font-bold text-indigo-600">You Like Tailor</span> in Bettiah, Bihar with a simple vision: to provide men with perfectly fitted clothes that boost their confidence.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Over <span className="font-bold text-indigo-600">35 years</span>, we've served <span className="font-bold text-indigo-600">1 Million+ customers</span>, specializing exclusively in <span className="font-bold">men's wear</span>. From traditional kurtas to modern formal wear, every garment is crafted with the same dedication and precision.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              As a <span className="font-bold">single owner business</span>, Md Imam personally ensures that every customer receives the same quality and attention that built our reputation. Now with <span className="font-bold text-indigo-600">Fitly</span>, we're bringing this trusted legacy to your fingertips.
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg">
              <p className="text-lg italic text-gray-700">
                "Every stitch carries my promise of quality. Your trust is my greatest achievement."
              </p>
              <p className="text-sm font-bold text-indigo-600 mt-2">- Md Imam, Founder</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea1f1d58?w=600" 
                alt="You Like Tailor Shop"
                className="w-full h-96 object-cover rounded-2xl mb-6"
              />
              <div className="text-center space-y-4">
                <p className="text-3xl font-black text-gray-800">You Like Tailor</p>
                <p className="text-xl font-bold text-indigo-600">Est. 1989 | Bettiah, Bihar</p>
                <p className="text-gray-600 font-semibold">Md Imam - Master Tailor</p>
                <div className="flex justify-center gap-2 mt-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="#fbbf24" className="text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-500">1,000,000+ Satisfied Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-white text-center mb-16">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/30"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                    <div className="bg-white/20 backdrop-blur rounded-2xl p-6 inline-block">
                      <p className="text-3xl font-black text-white mb-2">{item.year}</p>
                      <p className="text-xl text-white/90">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-2xl">
                    {item.icon}
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-gray-800 mb-4">Why Customers Trust Us</h2>
          <p className="text-xl text-gray-600">1 Million+ customers can't be wrong</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-green-500">
              <div className="text-4xl text-green-500 mb-3">{cert.icon}</div>
              <p className="font-bold text-gray-800">{cert.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-800 mb-4">Our Expert Team</h2>
          <p className="text-xl text-gray-600">Experienced craftsmen with decades of expertise</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {employees.map((employee, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-6xl mb-4">{employee.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{employee.name}</h3>
                <p className="text-indigo-600 font-semibold mb-3">{employee.role}</p>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-3">
                  <p className="text-sm text-gray-600 mb-1">Experience</p>
                  <p className="text-lg font-bold text-indigo-600">{employee.experience}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700">{employee.specialization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-gray-800 text-center mb-16">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#fbbf24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-indigo-600">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-5xl font-black text-gray-800 text-center mb-16">Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:-translate-y-2">
                <div className={`inline-block p-4 bg-gradient-to-r ${value.color} rounded-2xl mb-6`}>
                  <Icon size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quality Assurance */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-12 text-white">
          <h2 className="text-4xl font-black text-center mb-8">Our Quality Promise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Fabrics Only</h3>
              <p className="text-white/90">Sourced from trusted suppliers</p>
            </div>
            <div className="text-center">
              <CheckCircle size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Perfect Fit Guarantee</h3>
              <p className="text-white/90">Free alterations if needed</p>
            </div>
            <div className="text-center">
              <CheckCircle size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Craftsmanship</h3>
              <p className="text-white/90">35+ years of experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Join 1 Million+ Satisfied Customers
          </h2>
          <p className="text-2xl text-white/90 mb-10">
            Experience the trusted quality that has served Bettiah for 35 years
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => window.location.href = '/shop'}
              className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl"
            >
              Shop Ready-Made
            </button>
            <button
              onClick={() => window.location.href = '/stitching-request'}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-2xl hover:shadow-3xl"
            >
              Custom Stitching
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h3 className="text-4xl font-black text-gray-800 text-center mb-8">Visit You Like Tailor</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📍</div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">Address</p>
                  <p className="text-gray-600">New bus stand road, Bettiah</p>
                  <p className="text-gray-600">West Champaran, Bihar - 845438</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">⏰</div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">Working Hours</p>
                  <p className="text-gray-600">Monday - Sunday</p>
                  <p className="text-gray-600">8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📞</div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">Contact</p>
                  <p className="text-gray-600">+91 9955404332</p>
                  <p className="text-sm text-indigo-600 mt-2">Call for custom orders & inquiries</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">👔</div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">Specialization</p>
                  <p className="text-gray-600">Men's Wear Exclusively</p>
                  <p className="text-sm text-gray-500">Shirts, Pants, Kurtas, Suits & More</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-lg">
              <span className="font-bold text-indigo-600">Md Imam</span> - Founder & Master Tailor
            </p>
            <p className="text-sm text-gray-500 mt-2">Serving Bettiah with pride since 1989</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
