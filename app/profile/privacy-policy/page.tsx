import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-900">Privacy and Policies</h1>
        <Link
          href="/profile"
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded-md transition-colors"
        >
          Back to Profile
        </Link>
      </div>

      <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-stone-900">School Data Privacy Notice</h2>
        <p className="text-stone-700 leading-relaxed">
          This page contains a sample privacy policy for demonstration purposes. The school
          collects only the student information needed to provide learning services, track
          grades, and support class communication.
        </p>
        <p className="text-stone-700 leading-relaxed">
          Personal data such as full name, student ID, and email are processed securely and
          are only available to authorized school personnel. Student records are retained in
          accordance with school policy and applicable regulations.
        </p>
        <p className="text-stone-700 leading-relaxed">
          Students may request corrections to personal profile information by using the
          Edit Profile feature. For official concerns, contact the registrar or data privacy
          officer through the school administration office.
        </p>
      </section>

      <section className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-stone-900">Acceptable Use Summary</h2>
        <ul className="list-disc pl-6 text-stone-700 space-y-2">
          <li>Use your own account credentials and do not share passwords.</li>
          <li>Respect academic integrity and avoid posting harmful or misleading content.</li>
          <li>Do not attempt unauthorized access to other student or staff accounts.</li>
          <li>Follow school and platform guidelines while using forums and submissions.</li>
        </ul>
      </section>
    </div>
  );
}
