import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";

export default function AMLPolicyPage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex w-full flex-col items-center px-10 py-10 text-center">
          <div>
            <h2 className="text-3xl font-bold">CendMate</h2>
            <p className="text-lg text-muted-foreground">
              KYC / AML / CTF Policy
            </p>
          </div>
          <div className="mt-8 flex flex-col items-start text-justify">
            <span>
              Know Your Customer [KYL], Anti-Money Laundering [AML] & Counter
              Terrorist Funding [CTF]
            </span>
            <h3 className="mt-4 font-bold">AML & CTF Basics</h3>
            <p className="my-2">
              Money laundering involves taking money obtained by committing a
              crime and disguising the source to make it appear legitimate.
              Under the Criminal Code of Canada, it is illegal to launder money
              or knowingly assist in laundering money. The PCMLTFA and
              subsequent international regulatory boards require us to take
              appropriate measures to prevent criminal activity. According to
              the law, as a money service business, we must report all
              suspicious funds.
            </p>
            <p className="my-2">
              Terrorist financing is the movement of funds to pay for terrorist
              activities. Although the source of the funds is not always
              criminal, the use of funds tends to be. The Criminal Code of
              Canada states the following, it is illegal to knowingly assist in
              the financing of terrorism and to have terrorist funds or
              property. All known or suspected accumulation of terrorist
              properties in our possession must be reported immediately.
              CendMate operates within Canada and does not interact with
              countries listed as “Terrorist Friendly” by FINTRAC.
            </p>
            <h3 className="mt-4 font-bold">CendMate&apos;s Commitment</h3>
            <p className="my-2">
              CendMate reports to and follows the guidelines of the Financial
              Transactions and Reports Analysis Centre of Canada (FINTRAC).
              CendMate is committed to preventing, detecting, and deterring
              money laundering and terrorist financing. We have constructed
              policies to report standards and obligations, facilitate efficient
              record keeping, conduct extensive information collection, monitor
              staff responsibilities, and provide appropriate staff training. It
              is the responsibility of every employee (including contract and
              part-time employees) to comply with this program and all related
              Canadian legislation. FINTRAC is a Canadian federal initiative
              that regulates our industry to ensure that we are meeting our
              obligations. They have the power to review our documentation and
              to levy significant penalties if we are not compliant. Individuals
              that deliberately attempt to circumvent the law may also be
              charged criminally in addition to monetary penalties.
            </p>
            <h3 className="mt-4 font-bold">KYC Policy</h3>
            <p className="my-2">
              CendMate must verify the identity of customers for certain
              activities and transactions according to the Proceeds of Crime
              (Money Laundering) and Terrorist Financing Regulations (PCMLTFR).
              CendMate can confirm the identity of a customer by relying on an
              identity document where it is “valid and authentic.” We can
              confirm identification using acceptable documents, presented in an
              electronic format, so long as they can be authenticated. The
              individual&apos;s information is collected, and any suspicious
              transaction is reported to FINTRAC and further investigated by our
              compliance team. We refuse any transaction where required
              documents are not provided.
            </p>
            <h4 className="mt-2 font-semibold">
              The Identification document must fit the following requirements:
            </h4>
            <ul className="my-2 list-disc px-6">
              <li>
                Issued by a provincial, territorial or federal government in
                Canada or an equivalent foreign government; Valid (not expired)
              </li>
              <li>
                Bears a unique identifier number (such as a driver&apos;s
                license number)
              </li>
              <li>Bears the name of the individual being identified</li>
              <li>Bears a photo of the individual being identified.</li>
            </ul>
            <h4 className="mt-2 font-semibold">
              We must also collect and record the following information:
            </h4>
            <ul className="list-disc px-6 py-2">
              <li>
                Customer full name (no initials, short forms, or abbreviations)
              </li>
              <li>
                Customer&apos;s occupation (this should be as detailed as
                possible, without abbreviations or acronyms)
              </li>
              <li>
                The purpose of our business relationship with the customer (if
                applicable)
              </li>
              <li>
                Customer&apos;s date of birth (if this appears on the
                identification document, the date of birth that we record must
                match the document)
              </li>
              <li>
                Complete home address (post boxes, office addresses, and general
                delivery addresses are not acceptable for this purpose; if the
                customer wishes to provide a separate mailing address, we can
                collect this as well, but we must always record the full home
                address)
              </li>
              <li>The type of document used to identify the customer</li>
              <li>
                Place that the identification was issued (province, territory or
                state and country, not a city)
              </li>
              <li>
                Unique identification number (such as the driver’s license
                number)
              </li>
              <li>
                Expiry date of the identification provided (if the document has
                an expiry date; if it does not, please make a note to say that
                there was no expiry date on the document)
              </li>
              <li>The date on which we verified the document</li>
            </ul>
            <p>
              If a customer has been identified previously and the information
              in our records is up to date (the identification document used has
              not expired), and we can verify the customer&apos;s identity, then
              we do not need to request identification to complete a
              transaction.
            </p>
            <h4 className="mt-2 font-semibold">Anti-Fraud Initiative</h4>
            <p className="my-2 mb-10">
              In addition to ensuring our customers are verified via our KYC
              procedures, CendMate actively works to identify and cease
              fraudulent activity. If we suspect a customer is transacting under
              fraudulent pretenses, we contact that individual, investigate
              their reasoning for the purchase, and deny the transaction if it
              is ruled to be fraudulent in origin and report the transaction to
              FINTRAC.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
