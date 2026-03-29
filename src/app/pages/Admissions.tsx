import { CheckCircle, FileText, UserCheck, CreditCard, GraduationCap, Calendar, DollarSign, Award } from "lucide-react";
import { Link } from "react-router";

export function Admissions() {
  const admissionSteps = [
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete the online application form with all required details and documents.",
    },
    {
      icon: CreditCard,
      title: "Application Fee",
      description: "Pay the non-refundable application fee of $100 through our secure payment gateway.",
    },
    {
      icon: UserCheck,
      title: "Document Verification",
      description: "Our team will review your documents and academic credentials.",
    },
    {
      icon: Award,
      title: "Entrance Exam",
      description: "Attend the entrance examination or submit standardized test scores.",
    },
    {
      icon: CheckCircle,
      title: "Admission Decision",
      description: "Receive your admission decision within 2-3 weeks of application completion.",
    },
    {
      icon: GraduationCap,
      title: "Enrollment",
      description: "Accept your offer and complete enrollment formalities to secure your seat.",
    },
  ];

  const eligibilityCriteria = [
    {
      program: "Undergraduate Programs",
      requirements: [
        "Completion of high school (12th grade) or equivalent",
        "Minimum GPA of 3.0 or equivalent",
        "SAT/ACT scores (for international applicants)",
        "English proficiency test (TOEFL/IELTS for non-native speakers)",
      ],
    },
    {
      program: "Graduate Programs",
      requirements: [
        "Bachelor's degree from an accredited institution",
        "Minimum GPA of 3.5 in undergraduate studies",
        "GRE/GMAT scores (program dependent)",
        "Letters of recommendation (2-3)",
        "Statement of purpose",
      ],
    },
    {
      program: "Doctoral Programs",
      requirements: [
        "Master's degree in relevant field",
        "Exceptional academic record",
        "Research proposal",
        "Letters of recommendation (3)",
        "Interview with faculty committee",
      ],
    },
  ];

  const importantDates = [
    { event: "Early Decision Deadline", date: "November 15, 2026" },
    { event: "Regular Decision Deadline", date: "January 15, 2027" },
    { event: "Financial Aid Application", date: "February 1, 2027" },
    { event: "Admission Decisions Released", date: "March 31, 2027" },
    { event: "Enrollment Confirmation", date: "May 1, 2027" },
    { event: "Fall Semester Begins", date: "August 25, 2027" },
  ];

  const requiredDocuments = [
    "Completed application form",
    "Official transcripts from all previously attended institutions",
    "Letters of recommendation",
    "Personal statement or essay",
    "Standardized test scores (SAT/ACT/GRE/GMAT)",
    "Proof of English proficiency (if applicable)",
    "Copy of passport (for international students)",
    "Financial support documentation",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Admissions</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Start your journey to excellence. Join thousands of students pursuing their dreams at EduPlatform.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
            Apply Now
          </button>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">Follow these simple steps to apply</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {admissionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-blue-900 to-indigo-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4 mt-2">
                    <Icon className="w-7 h-7 text-blue-900" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
            <p className="text-xl text-gray-600">Minimum requirements for admission</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eligibilityCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{criteria.program}</h3>
                <ul className="space-y-3">
                  {criteria.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Required Documents</h2>
              <p className="text-gray-600 mb-8">
                Please ensure you have all the following documents ready before starting your application:
              </p>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-8 h-8" />
                <h3 className="text-3xl font-bold">Important Dates</h3>
              </div>
              <div className="space-y-4">
                {importantDates.map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold mb-1">{item.event}</div>
                    <div className="text-cyan-300 text-sm">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Aid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-900 to-indigo-700 rounded-full mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Financial Aid & Scholarships</h2>
            <p className="text-xl text-gray-600 mb-8">
              We offer various financial aid options and merit-based scholarships to help you achieve your educational goals. 
              Over 70% of our students receive some form of financial assistance.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-900 mb-2">$50M+</div>
                <div className="text-gray-600">In Financial Aid Annually</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-900 mb-2">70%</div>
                <div className="text-gray-600">Students Receive Aid</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-900 mb-2">200+</div>
                <div className="text-gray-600">Scholarship Programs</div>
              </div>
            </div>
            <button className="px-8 py-4 bg-blue-900 text-white rounded-xl hover:bg-indigo-800 transition-all">
              Learn About Financial Aid
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Apply?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Take the first step towards your future. Our admissions team is here to help you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
              Start Application
            </button>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
