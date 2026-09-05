import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Batin Lateef Capital",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Batin Lateef Capital collects only the information you submit through the investor
        prospectus request form, including your name, institutional email address, and investor
        type. That information is used solely to evaluate eligibility and to correspond about
        confidential offering materials.
      </p>
      <p>
        We do not sell personal information. Access is limited to personnel who administer
        investor relations and compliance. Records are retained for as long as needed to meet
        legal, tax, and regulatory obligations in the dual-jurisdiction structure, then securely
        deleted or anonymized.
      </p>
      <p>
        This site may log standard technical data (browser type, IP address, and pages viewed)
        to maintain security. Cookies are used only as required to operate the site. For privacy
        inquiries, use the prospectus request channel and identify the message as a privacy
        request.
      </p>
    </LegalPage>
  );
}
