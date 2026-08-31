import { CheckCircle2, FileText, UserCheck, CreditCard, GraduationCap, Calendar, DollarSign, Award, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { Link } from "react-router";
import { HighlighterUnderline } from "../../../components/ui/HighlighterUnderline";
import { useTenant } from "../../auth/context/TenantContext";

export function Admissions() {
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";

  const admissionSteps = [
    {
      step: "01",
      icon: FileText,
      title: "Submit Online Application",
      description: "Complete your online applicant dossier with high school or undergraduate transcripts and statement of intent.",
    },
    {
      step: "02",
      icon: CreditCard,
      title: "Dossier Processing Fee",
      description: "Submit the standard $100 processing fee through our secure digital payment gateway (fee waivers available for eligible scholars).",
    },
    {
      step: "03",
      icon: UserCheck,
      title: "Credential Verification",
      description: "Our academic registrar team verifies all certified transcripts, letters of recommendation, and test scores.",
    },
    {
      step: "04",
      icon: Award,
      title: "Entrance & Faculty Interview",
      description: "Complete the standardized entrance assessment or attend a virtual dialogue with department faculty chairs.",
    },
    {
      step: "05",
      icon: CheckCircle2,
      title: "Admissions Decision",
      description: "Receive your official notification of admission and scholarship awards within 2 to 3 weeks of file completion.",
    },
    {
      step: "06",
      icon: GraduationCap,
      title: "Matriculation & Enrollment",
      description: "Accept your offer, select your residential college or housing, and access your new student digital desk portal.",
    },
  ];

  const eligibilityCriteria = [
    {
      program: "Undergraduate Degrees",
      requirements: [
        "Completion of Higher Secondary / 12th Grade or equivalent",
        "Minimum GPA of 3.0 / 4.0 or equivalent percentage",
        "Standardized test scores (SAT/ACT optional for domestic applicants)",
        "Proof of English proficiency (TOEFL/IELTS for non-native speakers)",
      ],
      badge: "B.Tech • BBA • B.Sc",
    },
    {
      program: "Graduate & Master's",
      requirements: [
        "Bachelor's degree from a recognized accredited university",
        "Minimum cumulative undergraduate GPA of 3.2",
        "GRE/GMAT scores (subject-specific requirements apply)",
        "2 Academic Letters of Recommendation & Statement of Purpose",
      ],
      badge: "MBA • M.Tech • M.Sc",
    },
    {
      program: "Doctoral Programs (Ph.D.)",
      requirements: [
        "Master's degree in relevant discipline with distinction",
        "Formal peer-reviewed research proposal (3,000 words)",
        "3 Faculty Letters of Endorsement",
        "Admissions committee interview and defense",
      ],
      badge: "Ph.D. Fellowships",
    },
  ];

  const importantDates = [
    { event: "Early Decision Application Deadline", date: "November 15, 2026", tag: "Early Action" },
    { event: "Regular Decision Filing Closes", date: "January 15, 2027", tag: "Main Cohort" },
    { event: "Need & Merit Financial Aid Submissions", date: "February 01, 2027", tag: "Scholarships" },
    { event: "Admissions & Merit Decisions Released", date: "March 31, 2027", tag: "Decision Day" },
    { event: "Enrollment Confirmation & Deposit", date: "May 01, 2027", tag: "Commitment" },
    { event: "Fall Semester Orientation & Move-In", date: "August 25, 2027", tag: "Campus Life" },
  ];

  const requiredDocuments = [
    "Completed electronic application dossier",
    "Official transcripts from all secondary & tertiary institutions",
    "2–3 Academic letters of recommendation from faculty mentors",
    "Personal Statement of Purpose and career objectives",
    "Standardized score reports (SAT / GRE / GMAT if required)",
    "Certified English language proficiency scores",
    "Government identity documentation / valid passport copy",
    "Financial aid and scholarship sponsorship forms",
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 ambient-glow-amber rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EDE9DF] text-[#12172B] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8B93F]" />
              <span>Fall 2026 Admissions Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#12172B] tracking-tight leading-tight">
              Begin Your Journey of{" "}
              <HighlighterUnderline color="#E8B93F">
                Scholarship
              </HighlighterUnderline>
            </h1>

            <p className="text-base sm:text-lg text-[#5C6788] leading-relaxed">
              Step into an environment where academic curiosity is nurtured, research is prioritized, and your ambitions are backed by world-class faculty.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#process"
                className="px-6 py-3 bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2 text-sm"
              >
                <span>View 6-Step Process</span>
                <ArrowRight className="w-4 h-4 text-[#E8B93F]" />
              </a>

              <Link
                to="/contact"
                className="px-6 py-3 bg-white hover:bg-[#EDE9DF] text-[#12172B] font-semibold rounded-xl border border-[#E5E0D2] transition-all text-sm"
              >
                Inquire with Admissions Desk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Admission Roadmap */}
      <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Roadmap</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] mt-1">
            The Admissions Journey
          </h2>
          <p className="text-sm text-[#5C6788] mt-2">
            A transparent, streamlined six-stage evaluation process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admissionSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="paper-card p-6 sm:p-7 relative flex flex-col justify-between space-y-4 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#12172B] text-[#E8B93F] flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold font-serif text-[#D7D0C0]">
                    {step.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-serif text-[#12172B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5C6788] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5E0D2]/70 text-[11px] font-semibold text-[#12172B]">
                  Stage {index + 1} of 6
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Eligibility Criteria Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E5E0D2]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Requirements</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B] mt-1">
              Eligibility by Program Level
            </h2>
          </div>
          <span className="margin-note text-xs">
            Accredited Standards
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {eligibilityCriteria.map((c, idx) => (
            <div key={idx} className="paper-card p-7 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E8B93F]">
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-[#12172B]">
                  {c.program}
                </h3>

                <ul className="space-y-3 pt-2">
                  {c.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#5C6788] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D68] mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5E0D2]">
                <Link
                  to="/courses"
                  className="text-xs font-bold text-[#12172B] hover:text-[#E8B93F] flex items-center gap-1 transition-colors"
                >
                  <span>Explore Eligible Degrees</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documents & Key Calendar Deadlines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Documents Checklist (7 cols) */}
          <div className="lg:col-span-7 paper-card p-7 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C6788]">Checklist</span>
              <h3 className="text-2xl font-bold font-serif text-[#12172B] mt-1">
                Required Application Documents
              </h3>
              <p className="text-xs text-[#5C6788] mt-1">
                Ensure all documents are uploaded as certified PDFs before the deadline.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="p-3 rounded-xl bg-[#EDE9DF]/40 border border-[#E5E0D2] flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12172B] mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-[#12172B] font-medium leading-snug">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Deadlines Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#12172B] text-white p-7 sm:p-8 rounded-3xl border border-[#232D4B] shadow-2xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <Calendar className="w-6 h-6 text-[#E8B93F]" />
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Admissions Calendar</h3>
                <p className="text-xs text-[#8B96B5]">Academic Cycle 2026–2027</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {importantDates.map((item, index) => (
                <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-white">{item.event}</p>
                    <p className="text-[11px] text-[#E8B93F] font-semibold mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold bg-white/10 text-[#EDE9DF] px-2 py-0.5 rounded flex-shrink-0">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Financial Aid & Scholarships Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF9E6] text-[#9C7515] border border-[#E8B93F]/40 flex items-center justify-center mx-auto shadow-xs">
            <DollarSign className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#12172B]">
              Tuition, Grants & Merit Fellowships
            </h2>
            <p className="text-sm sm:text-base text-[#5C6788] max-w-2xl mx-auto leading-relaxed">
              We are committed to ensuring that financial limitations never stand in the way of exceptional academic talent. Over 70% of enrolled scholars receive substantial financial assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
            <div className="p-5 rounded-xl bg-[#EDE9DF]/50 border border-[#E5E0D2]">
              <h4 className="text-3xl font-bold font-serif text-[#12172B]">$50M+</h4>
              <p className="text-xs font-semibold text-[#5C6788] mt-1">Annual Aid & Endowments</p>
            </div>
            <div className="p-5 rounded-xl bg-[#EDE9DF]/50 border border-[#E5E0D2]">
              <h4 className="text-3xl font-bold font-serif text-[#E8B93F]">70%</h4>
              <p className="text-xs font-semibold text-[#5C6788] mt-1">Scholars Receiving Aid</p>
            </div>
            <div className="p-5 rounded-xl bg-[#EDE9DF]/50 border border-[#E5E0D2]">
              <h4 className="text-3xl font-bold font-serif text-[#2E7D68]">200+</h4>
              <p className="text-xs font-semibold text-[#5C6788] mt-1">Specialized Scholarships</p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#12172B] hover:bg-[#1f2742] text-white font-semibold rounded-xl transition-all shadow-xs text-sm inline-flex items-center gap-2"
            >
              <span>Consult Financial Aid Counselor</span>
              <ArrowRight className="w-4 h-4 text-[#E8B93F]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

