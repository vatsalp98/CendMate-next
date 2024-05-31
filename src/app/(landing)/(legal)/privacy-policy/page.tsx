import Link from "next/link";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";

export default function PrivacyPolicyPage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex w-full flex-col items-center px-10 py-10 text-center">
          <div>
            <h2 className="text-3xl font-bold">CendMate</h2>
            <p className="text-lg text-muted-foreground">Privacy Policy</p>
          </div>
          <div className="mt-8 flex flex-col items-start text-justify">
            <h3 className="mt-4 font-bold">1. Introduction</h3>
            <p className="mt-2">
              This Privacy Policy (the “Policy”) represents the policy of
              CendMate Inc., a Canadian corporation regarding the collection,
              use, and management of personal data belonging to:
            </p>
            <ul className="mt-2 list-disc px-6">
              <li>
                All visitors (“Site Visitors”) to the Company’s website, located
                at https://www.cendmate.com/ (the “Website”)
              </li>
              <li>
                Anyone who downloads or uses (“Application Users”) the Company’s
                mobile application (the “Application”)
              </li>
              <li>
                Anyone who enrolls for the Services of the Company (“Clients”),
                including Site Visitors, Application Users, and Clients are
                referred to collectively as “Users”. The website and the
                application together with the Services (as defined below) and
                all content contained therein are referred to collectively as
                the “Resources” as further described in the User Agreement.
              </li>
            </ul>
            <p className="mt-2">
              To ensure the free, informed, and unambiguous consent of our Users
              to the collection and use of personal data, the Company requires
              all Users to read this Policy and accept the terms and conditions
              contained herein, together with consent to release personal data
              subject to such terms and conditions.
            </p>
            <h3 className="mt-4 font-bold">2. Collect Data</h3>
            <ul className="list-disc px-6">
              <li className="mt-2 list-item">
                <h4 className="font-semibold">Contact Information</h4>
                <p>
                  Your full legal name, telephone number, location, postal
                  address, e-mail address, date of birth, means of
                  identification, occupation, personal description and
                  photograph. From time to time, CendMate may require you and/or
                  your beneficiary to provide us with additional information
                  and/or documentation to confirm your identity and your
                  eligibility to use CendMate’s service.
                </p>
              </li>
              <li className="mt-2 list-item">
                <h4 className="font-semibold">Registration Information</h4>
                <p>
                  Username and password, reminder questions and answers, account
                  numbers, and communication preferences such as which
                  newsletters you would like to receive (when you provide that
                  information to us).
                </p>
              </li>
              <li className="mt-2 list-item">
                <h4 className="font-semibold">Payment Information</h4>
                <p>
                  Credit card or bank account number, expiration date, and card
                  verification number (when you provide that information to us).
                  Information about your Beneficiary, which may include
                  sensitive personal information such as your Beneficiary&apos;s
                  name, address, mobile phone number and/or bank account
                  information.
                </p>
              </li>
              <li className="mt-2 list-item">
                <h4 className="font-semibold">Online Identifiers</h4>
                <p>
                  IP address, advertising ID, unique device ID, other
                  information about your device, and internal and third-party
                  IDs that have been assigned to you.
                </p>
              </li>
            </ul>
            <h3 className="mt-4 font-bold">2. Data Usage and processing</h3>
            <p className="my-2">
              We collect and use personal data only where we have one or more
              lawful grounds for doing so. Such grounds may vary depending on
              where our Users are located, but generally include processing
              personal data:
            </p>
            <ul className="list-[upper-roman] px-6">
              <li className="mt-2 list-item">
                <h4 className="font-semibold">
                  {" "}
                  To provide requested services and features:
                </h4>
                <p>
                  To provide our Services, we must collect and use certain
                  personal data. This includes:
                </p>
                <ul className="list-square px-4">
                  <li>
                    User profile data, which we use to establish and maintain
                    User accounts; verify User identity; communicate with Users
                    about their orders and accounts; and enable Users to make or
                    receive payments (as and if applicable)
                  </li>
                  <li>
                    Usage data, which is necessary to maintain, optimize, and
                    enhance the Company’s Services
                  </li>
                  <li>Transaction information</li>
                  <li>Information relating to customer support</li>
                </ul>
              </li>
              <li className="mt-2 list-item">
                <h4 className="font-semibold">
                  For purposes of the legitimate interests of the Company or
                  other parties:
                </h4>
                <p>
                  This includes using personal data to maintain and enhance our
                  User&apos;s safety and security. For example, we use personal
                  data to prevent the use of our Services by Users who have
                  engaged in inappropriate or dangerous behaviour, such as by
                  retaining data of banned Users to prevent their use of the
                  Application.
                </p>
                <p className="my-1">
                  This also includes purposes such as combating fraud; improving
                  our Services, direct marketing, research, and development; and
                  enforcing the Company’s User Agreement.
                </p>
                <p className="my-1">
                  In addition, it includes using personal data to the extent
                  necessary for the interests of other people or the general
                  public, such as in connection with legal or insurance claims,
                  and protecting the rights and safety of others.
                </p>
              </li>
              <li className="mt-2 list-item">
                <h4 className="font-semibold">
                  To fulfill the Company&apos;s legal obligations:
                </h4>
                <p>
                  We collect and use personal data to comply with applicable
                  laws. The Company may also share data with law enforcement
                  regarding criminal acts or threats to public safety, or
                  requests by third parties pursuant to legal processes.
                </p>
              </li>
              <li className="mt-2 list-item">
                <h4 className="font-semibold">With consent</h4>
                <p className="my-1">
                  The Company may collect and use personal data based on the
                  User’s consent. For example, we may collect personal data
                  through voluntary surveys. Responses to such surveys are
                  collected on the basis of consent and will be deleted once no
                  longer necessary for the purposes collected.
                </p>
                <p className="my-1">
                  A User who has provided consent to the collection or use of
                  their personal data can revoke it at any time. However, the
                  User will not be able to use any Service or feature that
                  requires the collection or use of that personal data.
                </p>
              </li>
            </ul>
            <h3 className="mt-4 font-bold">4. Policy Changes</h3>
            <p className="my-2">
              It is our policy to post any changes we make to our Policy on this
              page. If we make material changes to how we treat our user&apos;s
              personal information, through a notice on the Website home page or
              in the Application. The date the Policy was last revised is
              identified at the top of the page. You are responsible for
              ensuring we have an up-to-date active and deliverable email
              address for you, and for periodically visiting our Resources and
              this Policy to check for any changes.
            </p>
            <h3 className="mt-4 font-bold">5. Our contact</h3>
            <p className="my-2">
              If you have any questions about this Policy or the data we hold
              from you, or you would like to exercise one of your data
              protection rights, please do not hesitate to contact us: Email:
              inquiry@cendmate.com
            </p>
            <h3 className="mt-4 font-bold">6. Authorities</h3>
            <p className="my-2">
              Should you wish to report a complaint or if you feel that the
              Company has not addressed your concern in a satisfactory manner,
              you may contact your local Data Protection Authority.
            </p>
            <p className="mb-10 mt-2">
              Website:{" "}
              <Link href="https://www.priv.gc.ca/en/" target="_blank">
                https://www.priv.gc.ca/en/
              </Link>
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
