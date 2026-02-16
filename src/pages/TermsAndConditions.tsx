import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        
        <h1 className="text-4xl font-display font-bold mb-6">
          Terms & Conditions
        </h1>

        <p className="text-muted-foreground mb-10">
          Effective Date: 15 February 2026
        </p>

        <p className="mb-8 leading-relaxed">
          These Terms & Conditions govern all quotations, services, and agreements
          provided by <strong>Crafty Construction & Technical Services</strong>.
          By requesting a quotation or engaging our services, you agree to the
          terms outlined below.
        </p>

        {/* 1 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Quotation Validity</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All quotations are valid for 14 days from the date of issue.</li>
            <li>
              After this period, pricing may be subject to change due to
              material cost fluctuations or supplier adjustments.
            </li>
          </ul>
        </section>

        {/* 2 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Scope of Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Work will be carried out as detailed in the approved quotation.
            </li>
            <li>
              Any variations, additions, or changes requested by the client
              will be charged separately.
            </li>
            <li>
              All work is performed according to standard construction practices.
            </li>
          </ul>
        </section>

        {/* 3 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Materials</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Materials will be supplied as specified in the quotation.</li>
            <li>
              Any substitutions require prior client approval.
            </li>
            <li>
              Delays due to supplier shortages or availability are beyond the
              contractor’s control.
            </li>
          </ul>
        </section>

        {/* 4 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Site Access</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The client must provide clear and unobstructed access to the site.
            </li>
            <li>
              Restricted access may result in delays or additional costs.
            </li>
          </ul>
        </section>

        {/* 5 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Site Facilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The client is responsible for providing a hired toilet for site use.
            </li>
            <li>
              The client is responsible for payment and removal of all site rubble,
              unless otherwise agreed in writing.
            </li>
          </ul>
        </section>

        {/* 6 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Project Delays</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The contractor is not liable for delays caused by adverse weather.
            </li>
            <li>
              Delays caused by client decisions, late approvals, or changes
              may affect the project timeline.
            </li>
          </ul>
        </section>

        {/* 7 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Warranty</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              A 12-month workmanship warranty applies from the date of completion.
            </li>
            <li>
              This warranty does not cover normal wear and tear,
              misuse, structural movement, or third-party damage.
            </li>
          </ul>
        </section>

        {/* 8 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">8. Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payments must follow the agreed payment schedule.</li>
            <li>
              Late payments incur interest of 2% per month on outstanding balances.
            </li>
            <li>
              All payments are to be made in South African Rand (ZAR).
            </li>
          </ul>
        </section>

        {/* 9 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">9. Termination</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Either party may terminate the agreement with 14 days written notice.
            </li>
            <li>
              All costs incurred up to the date of termination remain payable.
            </li>
          </ul>
        </section>

        {/* 10 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            10. Contingency & VAT
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              A contingency allowance of 5% may be included for unforeseen works.
            </li>
            <li>
              VAT at 15% is applicable where required by law.
            </li>
          </ul>
        </section>

        {/* 11 */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">
            11. Scaffolding & Site Preparation
          </h2>
          <p>
            Any scaffolding, special site preparation, or additional structural
            requirements will be listed separately and agreed upon before
            commencement of work.
          </p>
        </section>

        <div className="border-t pt-8 text-sm text-muted-foreground">
          By engaging Crafty Construction & Technical Services, you acknowledge
          that you have read, understood, and agreed to these Terms & Conditions.
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
