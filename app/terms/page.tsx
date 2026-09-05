import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Batin Lateef Capital",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        This website is provided for informational purposes to qualified limited partners and
        accredited investors. It does not constitute an offer to sell, or a solicitation of an
        offer to buy, any security of Batin Lateef Capital or any affiliated vehicle.
      </p>
      <p>
        Content may change without notice. Metrics and waterfall mechanics describe target
        architecture and are not warranties of performance. You are responsible for obtaining
        independent legal, tax, and investment advice before making any allocation decision.
      </p>
      <p>
        Unauthorized access to the investor portal is prohibited. By using this site you agree
        not to scrape, reverse engineer, or misrepresent your investor status. These terms are
        governed by the laws applicable to the entity that operates the site within the dual
        jurisdiction structure, without regard to conflict-of-law rules.
      </p>
    </LegalPage>
  );
}
