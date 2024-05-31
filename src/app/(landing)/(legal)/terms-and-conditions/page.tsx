import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";

export default function TermsConditionsPage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex w-full flex-col items-center px-10 py-10 text-center">
          <div>
            <h2 className="text-3xl font-bold">CendMate</h2>
            <p className="text-lg text-muted-foreground">
              Terms and Conditions
            </p>
          </div>
          <div className="mt-8 flex flex-col items-start text-justify">
            <ul className="list-[upper-roman]">
              <li className="list-item font-semibold">Introduction</li>
              <p className="mt-2">
                Welcome to CendMate Inc., a Canadian corporation. By visiting
                our website and accessing the information, resources, services,
                products, and tools we provide, you understand and agree to
                accept and adhere to the following terms and conditions as
                stated in these Terms of Service (hereafter referred to as ‘User
                Agreement), along with the terms and conditions as stated in our
                Privacy Policy (as defined below):
              </p>
              <ul className="my-2 list-inside list-square">
                <li>
                  All visitors (“Site Visitors”) to Cendmate’s website located
                  at https://www.cendmate.com/ (the “Website”)
                </li>
                <li>
                  Anyone who downloads or uses (“Application Users”) CendMate’s
                  mobile application (the “Application”)
                </li>
                <li>
                  Anyone who enrolls for the Services of CendMate (“Clients”)
                </li>
              </ul>
              <p className="mt-2">
                Site Visitors, Application Users, and Clients are referred to
                collectively as “Users”. The Website and the Application
                together with the Services (as defined below) and all content
                contained therein are referred to collectively as the
                “Resources” as further described in the User Agreement.
              </p>
              <p className="mt-2">
                We reserve the right to change this User Agreement from time to
                time without notice by posting an updated copy of this User
                Agreement to the Site. You acknowledge and agree that it is your
                responsibility to review this User Agreement periodically to
                familiarize yourself with any modifications. Your continued use
                of this site after such modifications will constitute
                acknowledgment and agreement of the modified terms and
                conditions.
              </p>
              <li className="mt-2 list-item font-semibold">
                Responsible Use and Conduct
              </li>
              <ul className="list-decimal mt-2 list-inside">
                <li className="mt-2 list-item font-semibold">Resources</li>
                <p className="mt-1 pl-4">
                  By visiting our Website and accessing the information,
                  resources, Services (as defined below), Applications,
                  products, and tools we provide for you, either directly or
                  indirectly (hereafter referred to as “Resources”), you agree
                  to use these Resources only for the purposes intended as
                  permitted by (a) the terms of this User Agreement, and (b)
                  applicable laws, regulations and generally accepted online
                  practices or guidelines.
                </p>
                <li className="mt-2 font-semibold">Prohibited Usage</li>
                <ul className="mt-2 list-inside list-square pl-4">
                  <li>
                    In order to access our Resources, you may be required to
                    provide certain information about yourself (such as
                    identification, contact details, etc.) as part of the
                    registration process (the ‘Registration Information’), or as
                    part of your ability to use the Resources. You agree that
                    any information you provide will always be accurate,
                    correct, and up to date.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    any login information associated with any account you use to
                    access our Resources. Accordingly, you are responsible for
                    all activities that occur under your account.
                  </li>
                  <li>
                    Accessing (or attempting to access) any of our Resources by
                    any means other than through the means we provide, is
                    strictly prohibited. You specifically agree not to access
                    (or attempt to access) any of our Resources through any
                    automated, unethical or unconventional means.
                  </li>
                  <li>
                    Engaging in any activity that disrupts or interferes with
                    our Resources, including the servers and/or networks to
                    which our Resources are located or connected, is strictly
                    prohibited.
                  </li>
                  <li>
                    Attempting to copy, duplicate, reproduce, sell, trade, or
                    resell our Resources is strictly prohibited.
                  </li>
                  <li>
                    You are solely responsible for any consequences, losses, or
                    damages that we may directly or indirectly incur or suffer
                    due to any unauthorized activities conducted by you, as
                    explained above, and may incur criminal or civil liability.
                  </li>
                  <li>
                    We may provide various open communication tools on our
                    website, such as blog comments, blog posts, public chat,
                    forums, message boards, newsgroups, product ratings and
                    reviews, various social media services, etc. You understand
                    that generally we do not pre-screen or monitor the content
                    posted by users of these various communication tools, which
                    means that if you choose to use these tools to submit any
                    type of content to our website, then it is your personal
                    responsibility to use these tools in a responsible and
                    ethical manner. By posting information or otherwise using
                    any open communication tools as mentioned, you agree that
                    you will not upload, post, share, or otherwise distribute
                    any content that:
                    <ul className="list-inside list-disc pl-4">
                      <li>
                        Is illegal, threatening, defamatory, abusive, harassing,
                        degrading, intimidating, fraudulent, deceptive,
                        invasive, racist, or contains any type of suggestive,
                        inappropriate, or explicit language
                      </li>
                      <li>
                        Infringes on any trademark, patent, trade secret,
                        copyright, or other proprietary rights of any party
                      </li>
                      <li>
                        Contains any type of unauthorized or unsolicited
                        advertising
                      </li>
                      <li>
                        {" "}
                        Impersonates any person or entity, including any Company
                        employees or representatives
                      </li>
                    </ul>
                  </li>
                  <p className="mt-2">
                    We have the right at our sole discretion to remove any
                    content that we feel in our judgment does not comply with
                    this User Agreement, along with any content that we feel is
                    otherwise offensive, harmful, objectionable, inaccurate, or
                    violates any third-party copyrights or trademarks. We are
                    not responsible for any delay or failure in removing such
                    content. If you post content that we choose to remove, you
                    hereby consent to such removal, and consent to waive any
                    claim against us.
                  </p>
                </ul>
                <li className="mt-2 font-semibold">Eligibility</li>
                <p className="mt-2 pl-4">
                  This is a contract between you and CendMate. You must read and
                  agree to these terms before using CendMate’s Services. If you
                  do not agree, you may not use the Service or any of the
                  Resources. You may use the Service only if you can form a
                  binding contract with CendMate, and only in compliance with
                  this Agreement and all applicable local, state, national, and
                  international laws, rules and regulations. You are responsible
                  for the acts of others utilizing your access to the Resources
                  and will be held responsible for violations of the Service by
                  persons who gain access to the Resources using your account or
                  shared access. Any use or access to the Resources by anyone
                  under the Minimum Age is strictly prohibited and in violation
                  of this Agreement. The Resources are not available to any
                  Users previously removed from the Service by CendMate.
                </p>
                <p className="mt-2 pl-4">
                  “Minimum Age” means the greater of (i) 18 years old or (ii)
                  the age required by applicable law if such law requires that
                  you must be older in order for us to lawfully provide the
                  Services to you without parental consent (including using of
                  your personal data).
                </p>
                <li className="mt-2 font-semibold">
                  Accountholder Responsibilities:{" "}
                </li>
                <p className="mt-2 pl-4">You agree to:</p>
                <ul className="list-inside list-square pl-4">
                  <li>use a strong password and keep it confidential and</li>
                  <li>not transfer any part of your Account.</li>
                </ul>
                <p className="mt-2 pl-4">
                  You are responsible for anything that happens through your
                  Account unless you close it or report misuse. As between you
                  and others (including your employer), your Account belongs to
                  you. However, if the Services were purchased by another party
                  for you to use, the party paying for such Service has the
                  right to control access to and get reports, as applicable, on
                  your use of such paid Service; however, they do not have
                  rights to your personal Account.
                </p>
                <li className="mt-2 font-semibold">Reverse Engineering</li>
                <p className="mt-2 pl-4">
                  You will not use the Resources to create a product or service
                  with features that are substantially similar to or that
                  re-create the features of another Company product or service.
                </p>
              </ul>
              <li className="mt-2 font-semibold">Services and Payments:</li>
              <ul className="list-decimal list-inside">
                <li className="mt-2 list-item font-semibold">
                  Limited License
                </li>
                <p className="mt-2 pl-4">
                  {" "}
                  Subject to the terms and conditions of this Agreement, you are
                  hereby granted a nonexclusive, limited, non-transferable,
                  non-sublicensable, freely revocable license to use the
                  Resources for your personal, noncommercial use only and as
                  permitted by the features of the Service. CendMate reserves
                  all rights not expressly granted herein in the Resources and
                  CendMate Content (as defined below). CendMate may terminate
                  this license at any time for any reason or no reason.
                </p>
                <li className="mt-3 list-item font-semibold">
                  Type of Service, Eligibility and Account Access
                </li>
                <ul className="list-inside list-square pl-4">
                  <li className="mt-2">
                    You will have only one Account where your Available Balance
                    is located.
                  </li>
                  <li className="">
                    Your Remittance Services may not be activated unless we have
                    been provided with the required information so that we may
                    identify you and can comply with all applicable Customer Due
                    Diligence requirements. We shall keep records of such
                    information and documents in accordance with all applicable
                    legal and regulatory requirements. Reference to a currency
                    (e.g. Euros € or Sterling £) shall mean that amount or the
                    local currency equivalent in which your Account is
                    denominated.
                  </li>
                  <li>
                    Any Transaction on your Account in a currency other than the
                    currency in which your Account is denominated will require a
                    currency conversion using an Applicable Exchange Rate.
                  </li>
                  <li>
                    The Available Balance on your Account will not earn any
                    interest.
                  </li>
                  <li>
                    The Remittance Services are not a credit or bank product,
                    you must therefore ensure that you have a sufficient
                    Available Balance from time to time to pay for your
                    Transactions and applicable Fees as set forth on the Fee
                    Schedule. If for any reason a Transaction is processed, and
                    the Transaction amount exceeds the Available Balance, you
                    must repay us the amount of such excess immediately and we
                    shall be entitled to stop any existing or subsequent
                    Transactions from proceeding.
                  </li>
                  <li>
                    This Agreement does not give you any rights against the
                    Account Schemes, its affiliates or any third party.
                  </li>
                  <li>
                    Only persons over 18 years of age are entitled to register
                    for the Remittance Services. Each time you seek to access
                    the Account we will ask for your Access Codes (as defined
                    herein). As long as the correct Access Codes are entered, we
                    will assume that you are the person giving instructions and
                    making Transactions and you will be liable for them, except
                    to the extent provided for herein. We can refuse to act on
                    any instruction that we believe: (i) was unclear; (ii) was
                    not given by you; or (iii) might cause us to breach a legal
                    or other duty; or if we believe the Remittance Service is
                    being used for an illegal purpose.
                  </li>
                  <li>
                    We will do all that we reasonably can to prevent
                    unauthorized access to the Account.
                  </li>
                </ul>
                <li className="mt-2 font-semibold">
                  Use of the Remittance Services
                </li>
                <ul className="list-inside list-square pl-4">
                  <li className="mt-2">
                    You may access your Account information by logging into your
                    Account through our website. From here you will be able to
                    view details on your Transactions, including dates,
                    currencies, charges or exchange rates applied. This
                    information is accessible at any time and can be stored and
                    reproduced as necessary.
                  </li>
                  <li>
                    You can use the Remittance Services up to the amount of the
                    Available Balance for Transactions.
                  </li>
                  <li>
                    If the Available Balance is insufficient to make a
                    Transaction we will not permit you to combine the use of an
                    Account with other payment methods.
                  </li>
                  <li>
                    The value of each Transaction and the amount of any Fees
                    payable by you under this Agreement will be deducted from
                    the Available Balance.
                  </li>
                  <li>
                    Once a Transaction is authorized, the relevant payment order
                    may not be withdrawn (or revoked) by you after the time it
                    is received by us, except for Direct Debits, for which you
                    may revoke the payment order up until the end of the
                    Business Day before the day agreed for debiting the funds. A
                    Transaction will be deemed to have been received by us at
                    the time you authorize the Transaction as follows:
                    <ul className="list-inside list-disc pl-4">
                      <li>
                        A payment order for a Transfer or is provided to and
                        received by us at the time it is issued by you via the
                        Account
                      </li>
                      <li>
                        A request for a Direct Debit is deemed to be received on
                        the agreed day (if the agreed day is not a Business Day,
                        the request shall be deemed to have been received on the
                        following Business Day).
                      </li>
                    </ul>
                  </li>
                  <li>
                    Any Direct Debit will remain in effect until revoked by you
                    at the latest by the end of the Business Day preceding the
                    latest execution date for the relevant Direct Debit. You
                    accept responsibility for cancelling any Direct Debit on
                    your Account with the relevant organization it was intended
                    to pay. We will not be able to do this on your behalf and
                    cannot accept liability for any losses due to late or
                    non-cancellation of Direct Debits.
                  </li>
                  <li>
                    Where a revocation of an authorized payment is agreed upon
                    between you and CendMate, we may charge a Fee for
                    revocation.
                  </li>
                  <li>
                    We may refuse to authorize any use of the Remittance
                    Services which could breach these terms and conditions or if
                    we have reasonable grounds for suspecting that you or a
                    third party have committed or are planning to commit fraud
                    or any other illegal or unpermitted use of the Remittance
                    Services.
                  </li>
                  <li>
                    Your ability to use or access the Remittance Services may
                    occasionally be interrupted, for example, if we need to
                    carry out maintenance on our systems. Please contact
                    customer services via our website to notify us of any
                    problems you are experiencing using your account and we will
                    endeavour to resolve any problem.
                  </li>
                  <li>
                    You agree to only use the Remittance Services for lawful
                    purposes and to adhere at all times to all laws, rules and
                    regulations applicable to the use of the Remittance
                    Services, including the terms of this Agreement.
                  </li>
                  <li>
                    You may not use the Remittance Services to receive or
                    transfer any funds on behalf of any other natural person or
                    legal entity.
                  </li>
                </ul>
                <li className="mt-2 font-semibold">
                  Access by Third-Party Providers
                </li>
                <ul className="mt-2 list-inside list-square pl-4">
                  <li className="mt-2">
                    You may consent to regulated third-party providers (PISPs or
                    AISPs) accessing your account online to make payments or
                    obtain information about balances or Transactions on your
                    account.
                  </li>
                  <li>
                    The PISPs and/or AISPs must be appropriately registered and
                    authorized in accordance with PSD2. You should check with
                    the regulatory authority of the relevant country before
                    giving consent to the relevant PISP/AISP.
                  </li>
                  <li>
                    Any consent you give to a third-party provider is an
                    agreement between you and it, we will have no liability for
                    any loss whatsoever, as a result of any such agreement.
                    Before giving consent, you should satisfy yourself as to
                    what degree of access you are consenting to, how it will be
                    used and to whom it may be passed on.
                  </li>
                  <li>
                    You should make yourself aware of any rights to withdraw the
                    consent of access from the third-party provider and what
                    process it has in place to remove access.
                  </li>
                  <li>
                    To the extent permitted by law or regulation and subject to
                    any right to refund you may have under this Agreement,
                    between you and us, we are not responsible for any actions
                    that the relevant third party takes in relation to
                    suspending or terminating your use of their service or for
                    any resulting losses. We are also not responsible for, or a
                    party to, any agreement that you enter into with any
                    relevant third party. You should make sure that you read and
                    comply with such agreement or other applicable policies and
                    note that this Agreement will continue to apply between us
                    including to any Remittance Services and our Fees as stated
                    continue to apply.
                  </li>
                  <li>
                    Where appropriate, we may deny access to your Account, to
                    any third party where we consider such access to be a risk
                    of money laundering or terrorism financing, fraud or other
                    criminal activity. Should we need to take these actions and
                    where possible, we will give reasons for doing so unless
                    restricted by law or for internal security reasons.
                  </li>
                </ul>
                <li className="mt-2 font-semibold">Identity Verification</li>
                <ul className="mt-2 list-inside list-square pl-4">
                  <li className="mt-2">
                    If you enter into transactions over the internet, some
                    websites require you to enter your name and address. In such
                    cases, you should supply the most recent address which has
                    been registered with us by you as the Account address. The
                    Account address is also the address to which we will send
                    any correspondence.
                  </li>
                  <li>
                    You must notify us within 7 days of any change in the
                    Account address or your other contact details. You can
                    notify us by contacting Customer Services who may require
                    you to confirm such notification in writing. You will be
                    liable for any loss that directly results from any failure
                    to notify us of such a change as a result of undue delay,
                    gross negligence or fraud. We will need to verify your new
                    Account address and shall request the relevant proof from
                    you.
                  </li>
                  <li>
                    We reserve the right at any time to satisfy ourselves as to
                    your identity and home address (for example, by requesting
                    relevant original documents) including for the purposes of
                    preventing fraud and/or money laundering. In addition, at
                    the time of your application or at any time in the future,
                    in connection with your Account, you authorize us to perform
                    electronic identity verification checks directly or using
                    relevant third parties.
                  </li>
                </ul>
                <li className="mt-2 font-semibold">
                  Termination or Suspension of Your Account and/or Processing of
                  Transactions
                </li>
                <ul className="mt-2 list-inside list-square pl-4">
                  <li className="mt-2">
                    We may terminate this Agreement and your use of the
                    Remittance Services with prior notice of at least 2 months.
                  </li>
                  <li>
                    This Agreement and your use of the Remittance Services will
                    also end when your ability to initiate all Transactions
                    ceases.
                  </li>
                  <li>
                    We may terminate or suspend, for such period as may
                    reasonably be required, your use of the Remittance Services
                    in whole or in part at any time or the processing of any
                    Transaction(s) if:
                    <ul className="list-inside list-disc pl-4">
                      <li>
                        there is any fault or failure in the relevant data
                        processing system(s)
                      </li>
                      <li>
                        we reasonably believe that you have used or are likely
                        to use the Remittance Services, or allow them to be
                        used, in breach of this Agreement or to commit an
                        offence;
                      </li>
                      <li>
                        any Available Balance may be at risk of fraud or misuse
                      </li>
                      <li>
                        we suspect that you have provided false or misleading
                        information
                      </li>
                      <li>
                        we are required to do so by law, the police, a court or
                        any relevant governmental or regulatory authority
                      </li>
                      <li>
                        required to fulfil our legal obligations in relation to
                        the fight against money
                      </li>
                      <li>laundering and financing of terrorism</li>
                      <li>
                        there is suspicion of unauthorized or fraudulent access
                        to or use of your Account or
                      </li>
                      <li>
                        that any of its security features have been compromised,
                        including the unauthorized or fraudulent initiation of a
                        Transaction
                      </li>
                      <li>
                        we have reasonable grounds to believe you are carrying
                        out a prohibited or illegal activity
                      </li>
                      <li>
                        we are unable to verify your identity or any other
                        information pertaining to you, your Account or a
                        Transaction
                      </li>
                    </ul>
                  </li>
                  <li className="mt-2">
                    Where it is practicable and lawful for us to do so or would
                    not compromise reasonably justified security reasons, we
                    will notify you via email of the suspension or restriction
                    and the reasons for it before such measures take place or
                    immediately thereafter.
                  </li>
                  <li>
                    We will reinstate your Account or execute the relevant
                    Transaction(s) as soon as practicable after the reasons
                    pursuant hereto no longer apply or exist.
                  </li>
                  <li>
                    If you wish to terminate the Remittance Services at any
                    time, you must request termination and the return of your
                    Available Balance by email to our address in herein from the
                    email address registered in your Account. Our Customer
                    Services department will then suspend all further use of
                    your Remittance Services.
                  </li>
                  <li>
                    Once we have received all the necessary information from you
                    (including any Customer Due Diligence) and all Transactions
                    and applicable Fees and charges have been processed, we will
                    refund you any available balance less any fees and charges
                    payable to us, provided that:
                    <ul className="mt-2 list-inside list-disc pl-4">
                      <li>
                        you have not acted fraudulently or with gross negligence
                        or in such a way as to give rise to reasonable suspicion
                        of fraud or gross negligence; and
                      </li>
                      <li>
                        we are not required to withhold your available balance
                        by law or regulation, or at the request of the police, a
                        court or any regulatory authority.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Once the Remittance Services have been terminated, it will
                    be your responsibility to destroy the Account(s) that were
                    provided to you.
                  </li>
                  <li>
                    If, following reimbursement of your Available Balance, any
                    further Transactions are found to have been made or charges
                    or Fees incurred using the Account(s) or we receive a
                    reversal of any prior funding Transaction, we will notify
                    you of the amount and you must immediately repay to us such
                    amount on demand as a debt.
                  </li>
                </ul>
                <li className="mt-2 font-semibold">
                  Liability for Unauthorized or Incorrectly Executed
                  Transactions
                </li>
                <ul className="mt-2 list-inside list-square pl-4">
                  <li>
                    Subject to this Agreement we will reimburse you in full for
                    all unauthorized Transactions sent from your Account
                    immediately and in any event no later than the end of the
                    following Business Day after noting or being notified of the
                    Transaction (except where we have reasonable grounds for
                    suspecting fraud), provided that you have informed us of the
                    unauthorized Transaction without undue delay after becoming
                    aware of the Transaction and in any event, no later than 13
                    months after the Transaction was executed. Where applicable,
                    we shall restore your Account to the state in which it would
                    have been had the unauthorized Transaction not taken place,
                    so that the credit value date shall be no later than the
                    date the amount had been debited.
                  </li>
                  <li>
                    You may be liable for losses relating to any unauthorized
                    Transactions up to a maximum of £35 resulting from the use
                    of a lost or stolen Account or the misappropriation of your
                    Account unless the loss, theft or misappropriation was not
                    detectable to you prior to payment (except where you acted
                    fraudulently) or was caused by acts or lack of action of our
                    employee, agent, branch or service provider.
                  </li>
                  <li>
                    You are liable for any losses incurred by an unauthorized
                    Transaction if you have acted fraudulently or failed either
                    intentionally or through gross negligence, to use your
                    Account in accordance with the terms of this Agreement or to
                    keep your Access Codes confidential and secure in accordance
                    herewith.
                  </li>
                  <li>
                    You shall not be liable for losses incurred by an
                    unauthorized Transaction which takes place after you have
                    notified us of a compromise of your Access Codes according
                    to the terms hereof, unless you have acted fraudulently, or
                    where we have failed to provide you with the means to notify
                    us in the agreed manner without delay on you becoming aware
                    of the loss, theft, misappropriation or unauthorized use of
                    your Account or Account.{" "}
                  </li>
                  <li>
                    We shall not liable for a refund or losses incurred by an
                    incorrectly or non-executed payment Transaction if the
                    details of the payee’s account provided by you were
                    incorrect or we can prove that the full amount of the
                    Transaction was duly received by the Remittance Service
                    provider of the payee.
                  </li>
                  <li>
                    We shall not be liable for any unauthorized or incorrectly
                    executed Transactions in case the Transaction was affected
                    by abnormal and unforeseeable circumstances beyond our
                    reasonable control or where we acted in accordance with a
                    legal obligation.
                  </li>
                  <li>
                    Where we are liable for the incorrect execution of a
                    Transfer that you receive under this Agreement, we shall
                    immediately place the amount of the Transaction at your
                    disposal in accordance and credit the corresponding amount
                    to your Account no later than the date on which the amount
                    would have been valuing dated, had the Transaction been
                    correctly executed.
                  </li>
                  <li>
                    Where we are liable for the incorrect execution of a
                    Payment, Transfer or by you as payer, we shall, without
                    undue delay, refund to you the amount of the non-executed or
                    defective transaction, and, where applicable, restore the
                    debited Account to the state in which it would have been had
                    the defective Transaction not taken place.
                  </li>
                  <li>
                    In the case of a non-executed or defectively executed
                    Payment, Transfer or by you as payer, we shall, regardless
                    of whether we are liable, on request, make immediate efforts
                    to trace the Transaction and notify you of the outcome, free
                    of charge.
                  </li>
                  <li>
                    If at any time we have incorrectly deducted money from your
                    Available Balance, we shall refund the amount to you. If we
                    subsequently establish that the refunded amount had been
                    correctly deducted, we may deduct it from your Available
                    Balance and may charge you a Fee. If you do not have
                    sufficient Available Balance, you must repay us the amount
                    immediately on demand.
                  </li>
                </ul>
                <li className="mt-2 font-semibold">Termination of Use</li>
                <ul className="mt-2 list-inside list-disc pl-4">
                  <li className="font-semibold">Generally</li>
                  <p className="mt-2">
                    You agree that we may, at our sole discretion, suspend or
                    terminate your access to all or part of the Resources with
                    or without notice and for any reason, including, without
                    limitation, breach of this User Agreement, and nonpayment of
                    any Fees. Any suspected illegal, fraudulent or abusive
                    activity may be grounds for terminating your relationship
                    and may be referred to appropriate law enforcement
                    authorities. Upon suspension or termination, your right to
                    use the Resources we provide will immediately cease, and we
                    reserve the right to remove or delete any information that
                    you may have on file with us, including any Registration
                    Information.
                  </p>
                </ul>
                <li className="mt-2 font-semibold">Limitation of Liability</li>
                <ul className="mt-2 list-inside list-disc pl-4">
                  <li className="mt-2 font-semibold">As-is</li>
                  <p>
                    By using our website, you understand and agree that all
                    Resources we provide are “as is” and “as available”.
                    CendMate makes no representations or warranties that:
                  </p>
                  <p>
                    the use of our Resources will meet your needs or
                    requirements; the use of our Resources will be
                    uninterrupted, timely, secure and free from errors; the
                    information obtained by using our Resources will be accurate
                    or reliable; and any defects in the operation or
                    functionality of any Resources we provide will be repaired
                    or corrected.
                  </p>
                  <p>
                    Furthermore, you understand and agree that (i) any content
                    downloaded or otherwise obtained through the use of our
                    Resources is done at your own discretion and risk and that
                    you are solely responsible for any damage to your computer
                    or other devices for any loss of data that may result from
                    the download of such content, and (ii) no information or
                    advice, whether expressed, implied, oral or written,
                    obtained by you from CendMate or through any Resources we
                    provide shall create any warranty, guarantee, or conditions
                    of any kind, except for those expressly outlined in this
                    User Agreement. You authorize your wireless carrier to use
                    or disclose information about your account and your wireless
                    device, if available, to us or our service provider for the
                    duration of your business relationship, solely to help them
                    identify you or your wireless device and to prevent fraud.
                    See our Privacy Policy for how we treat your data.
                  </p>
                  <li className="mt-2 list-item font-semibold">Warrants</li>
                  <p>
                    Use of the Service is at your own risk. To the maximum
                    extent permitted by applicable law, the Service is provided
                    without warranties of any kind, whether express or implied,
                    including, but not limited to, implied warranties of
                    merchantability, fitness for a particular purpose, or
                    non-infringement. No advice or information, whether oral or
                    written, obtained by you from CendMate or through the
                    Service will create any warranty not expressly stated
                    herein. Without limiting the foregoing, CendMate, its
                    subsidiaries, its affiliates, and its licensors do not
                    warrant that the content is accurate, reliable or correct;
                    that the Service will meet your requirements; that the
                    Service will be available at any particular time or
                    location, uninterrupted or secure; that any defects or
                    errors will be corrected; or that the Service is free of
                    viruses or other harmful components. Any content downloaded
                    or otherwise obtained through the use of the Service is
                    downloaded at your own risk and you will be solely
                    responsible for any damage to your computer system or mobile
                    device or loss of data that results from such download or
                    your use of the Service. Further, CendMate does not warrant,
                    endorse, guarantee, or assume responsibility for any product
                    or service advertised or offered by a third party through
                    the Service or any hyperlinked website or service, and
                    CendMate will not be a party to or in any way monitor any
                    transaction between you and third-party providers of
                    products or services.
                  </p>
                  <p>
                    Federal law, some states, provinces and other jurisdictions
                    do not allow the exclusion and limitations of certain
                    implied warranties, so the above exclusions may not apply to
                    you. This Agreement gives you specific legal rights, and you
                    may also have other rights which vary from state to state.
                    The disclaimers and exclusions under this Agreement will not
                    apply to the extent prohibited by applicable law.
                  </p>
                  <li className="mt-2 list-inside font-semibold">
                    Limitation of Liability
                  </li>
                  <p className="mt-2">
                    To the maximum extent permitted by applicable law, in no
                    event shall CendMate, its affiliates, agents, directors,
                    employees, suppliers or licensors be liable for any
                    indirect, punitive, incidental, special, consequential or
                    exemplary damages, including without limitation damages for
                    loss of profits, goodwill, use, data or other intangible
                    losses, arising out of or relating to the use of, or
                    inability to use, the Service. Under no circumstances will
                    CendMate be responsible for any damage, loss or injury
                    resulting from hacking, tampering or other unauthorized
                    access or use of the Service or your account or the
                    information contained therein.
                  </p>
                  <p>
                    To the maximum extent permitted by applicable law, CendMate
                    assumes no liability or responsibility for any:
                    <ul className="mt-2 list-inside list-square pl-4">
                      <li className="mt-2">
                        errors, mistakes, or inaccuracies of content
                      </li>
                      <li>
                        personal injury or property damage, of any nature
                        whatsoever, resulting from your access to or use of our
                        service
                      </li>
                      <li>
                        any unauthorized access to or use of our secure servers
                        and/or any and all personal information stored therein
                      </li>
                      <li>
                        any interruption or cessation of transmission to or from
                        the Service; any bugs, viruses, trojan horses, or the
                        like that may be transmitted to or through our service
                        by any third party
                      </li>
                      <li>
                        any errors or omissions in any content or for any loss
                        or damage incurred as a result of the use of any content
                        posted, emailed, transmitted, or otherwise made
                        available through the Service
                      </li>
                      <li>
                        User Content or the defamatory, offensive, or illegal
                        conduct of any third party
                      </li>
                      <li>
                        any act, omission, transaction, or exchange of services
                        by and between Users
                      </li>
                      <li>
                        injury or harm resulting from or in connection with
                        advice, counselling, or services given by Providing
                        Users to Client Users. In no event shall CendMate, its
                        affiliates, agents, directors, employees, suppliers, or
                        licensors be liable to you for any claims, proceedings,
                        liabilities, obligations, damages, losses or costs in an
                        amount exceeding the amount you paid to CendMate
                        hereunder or $100.00, whichever is greater
                      </li>
                    </ul>
                  </p>
                  <p className="mt-2">
                    This limitation of liability section applies whether the
                    alleged liability is based on contract, tort, negligence,
                    strict liability, or any other basis, even if CendMate has
                    been advised of the possibility of such damage. Some states
                    do not allow the exclusion or limitation of incidental or
                    consequential damages, so the above limitations or
                    exclusions may not apply to you. This Agreement gives you
                    specific legal rights, and you may also have other rights
                    which vary from state to state. The disclaimers, exclusions,
                    and limitations of liability under this Agreement will not
                    apply to the extent prohibited by applicable law.
                  </p>
                  <li className="mt-2 list-inside font-semibold">
                    Indemnification
                  </li>
                  <p className="mt-2">
                    You agree to defend, indemnify and hold harmless CendMate
                    and its subsidiaries, agents, licensors, managers, and other
                    affiliated companies, and their employees, contractors,
                    agents, officers and directors (the “Indemnified Parties”),
                    from and against any and all claims, damages, obligations,
                    losses, liabilities, costs or debt, and expenses including
                    but not limited to attorney’s fees (each, a “Claim”) arising
                    from: (i) your use of and access to the Service, including
                    any data or content transmitted or received by you; (ii)
                    your violation of any term of this Agreement, including
                    without limitation your breach of any of the representations
                    and warranties above; (iii) your violation of any
                    third-party right, including without limitation any right of
                    privacy or Intellectual Property Rights; (iv) your violation
                    of any applicable law, rule or regulation; (v) User Content
                    or any content that is submitted by you including without
                    limitation misleading, false, or inaccurate information;
                    (vi) your willful misconduct; or (vii) any other party’s
                    access and use of the Service with your unique username,
                    password or other appropriate security code.
                  </p>
                  <li className="mt-2 font-semibold">Third-party Content</li>
                  <p className="mt-2">
                    This User Agreement does not apply to the websites or
                    services of any other person or entity. We may provide, or
                    third parties may provide, links to other worldwide websites
                    or resources. You acknowledge and agree that we are not
                    responsible for the availability of such external sites or
                    resources, and do not endorse (and are not responsible or
                    liable for) any content, advertising, products, or other
                    materials on or available from such websites or resources.
                    You further acknowledge and agree that, under no
                    circumstances, will we be held responsible or liable,
                    directly or indirectly, for any loss or damage that is
                    caused or alleged to have been caused to you in connection
                    with your use of, or reliance on, any content,
                    advertisements, products or other resources available on any
                    other website (regardless of whether we directly or
                    indirectly link to such content, advertisements, products or
                    other resources). You should direct any concerns with
                    respect to any other website to that website’s administrator
                    or webmaster.
                  </p>
                  <li className="mt-2 list-inside font-semibold">Security</li>
                  <p className="mt-2">
                    CendMate cares about the integrity and security of your
                    personal information. CendMate uses commercially reasonable
                    physical, managerial, and technical safeguards to preserve
                    the integrity and security of your personal information and
                    implement your privacy settings. However, we cannot
                    guarantee that unauthorized third parties will ever be able
                    to defeat our security measures or use your personal
                    information for improper purposes. You acknowledge that you
                    provide your personal information at your own risk.
                  </p>
                  <li className="mt-2 font-semibold">No Professional Advice</li>
                  <p className="mt-2">
                    If the Service provides professional information (for
                    example, legal or financial), such information is for
                    informational purposes only and should not be construed as
                    professional advice. No action should be taken based on any
                    information contained in the Service. You should seek
                    independent professional advice from a person who is
                    licensed and/or qualified in the applicable area.
                  </p>
                  <li className="mt-2 list-item font-semibold">Disclaimers</li>
                  <p className="mt-2">
                    <strong>CendMate</strong> shall not be liable:
                    <ul className="mt-2 list-inside list-square pl-4">
                      <li>
                        if you are unable to use the Account or Remittance
                        Services for any valid reason stated in this Agreement
                      </li>
                      <li>
                        For any fault or failure beyond our reasonable control
                        relating to the use of the
                      </li>
                      <li>
                        Remittance Services, including but not limited to, a
                        lack of Available Balance or fault in or failure of data
                        processing systems
                      </li>
                      <li>
                        For any loss, fault or failure relating to the use of a
                        Third-Party Provider
                      </li>
                      <li>
                        If a Merchant refuses to accept a Payment or fails to
                        cancel an authorization or preauthorization
                      </li>
                      <li>
                        For the goods or services that are purchased with your
                        Account
                      </li>
                      <li>
                        For any dispute, you might have with a Merchant or other
                        user of the Remittance Service where you acted with
                        undue delay, fraudulently, or with gross negligence
                        (including where losses arise due to your failure to
                        keep us notified of your correct personal details)
                      </li>
                    </ul>
                  </p>
                  <li className="mt-2 list-item font-semibold">
                    To the Fullest Extent Permitted by Relevant law, Our Total
                    Liability Under of Arising from this Agreement shall be
                    limited as follows
                  </li>
                  <p className="mt-2">
                    where your Account is faulty due to our default, our
                    liability shall be limited to replacement of the Account or,
                    at our choice, repayment to you of the Available Balance;
                    and in all other circumstances of our default, our liability
                    will be limited to repayment of the amount of the Available
                    Balance
                  </p>
                  <li className="mt-2 font-semibold">Authorized Use</li>
                  <p className="mt-2">
                    You agree that you will not use the Remittance Services in
                    an illegal manner and you agree to indemnify us against any
                    claim or proceeding brought about by such illegal use of the
                    Remittance Services by you. Nothing in this Agreement shall
                    exclude or limit either Party&apos;s liability in respect of
                    death or personal injury arising from that party&apos;s
                    negligence or fraudulent misrepresentation. No party shall
                    be liable for or be considered in breach of this Agreement
                    on account of, any delay or failure to perform as required
                    by this Agreement as a result of any causes or conditions
                    which are beyond such Party&apos;s reasonable control.
                  </p>
                </ul>
                <li className="mt-2 font-semibold">Regulatory Information</li>
                <p className="mt-2">
                  All relevant funds corresponding to your Available Balance are
                  segregated from our funds and held in the Customer Funds
                  Account in accordance with the safeguarding requirements of
                  the Electronic Money Regulations 2011 by law. In the event
                  that we became insolvent, those funds are protected against
                  claims made by any of our creditors.
                </p>
                <li className="mt-2 font-semibold">Miscellaneous Provisions</li>
                <ul className="list-inside list-disc pl-4">
                  <li className="mt-2 font-semibold">
                    Choice of Forum & Governing Law
                  </li>
                  <p className="mt-2">
                    Any disputes related to this agreement shall be heard
                    exclusively in the courts of the City of Vancouver, British
                    Columbia, and the law of the Province of British Columbia
                    shall apply.
                  </p>
                  <li className="mt-2 font-semibold">Severability</li>
                  <p className="mt-2">
                    If any provision of this User Agreement shall be unlawful,
                    void, or for any reason is unenforceable, then that
                    provision shall be deemed severable from these terms and
                    shall not affect the validity and enforceability of any
                    remaining provisions.
                  </p>
                  <li className="mt-2 font-semibold">Amendments</li>
                  <p className="mt-2">
                    We may modify this Contract, our Privacy Policy and our
                    Cookies Policy from time to time. If we make material
                    changes to it, we will provide you notice through our Site,
                    or by other means, to provide you with the opportunity to
                    review the changes before they become effective. We agree
                    that changes cannot be retroactive. If you object to any
                    changes, you may close your account and terminate your use
                    of the Resources. Your continued use of the Resources after
                    we publish or send a notice about our changes to these terms
                    means that you are consenting to the updated terms as of
                    their effective date.
                  </p>
                  <li className="mt-2 font-semibold">Assignment</li>
                  <p className="mt-2">
                    We may assign our rights and obligations under this User
                    Agreement. This User Agreement will inure to the benefit of
                    our successors, assigns and licensees.
                  </p>
                  <li className="mt-2 font-semibold">Waiver</li>
                  <p>
                    The failure of either party to insist upon or enforce the
                    strict performance of the other party with respect to any
                    provision of this User Agreement, or to exercise any right
                    under this User Agreement, will not be construed as a waiver
                    or relinquishment to any extent of such party’s right to
                    assert or rely upon any such provision or right in that or
                    any other instance; rather, the same will be and remain in
                    full force and effect
                  </p>
                  <li className="mt-2 font-semibold">Business Days</li>
                  <p className="mt-2">
                    If any time period for giving notice or taking action
                    hereunder falls on a day which is a Saturday, Sunday or
                    legal holiday in Vancouver, British Columbia, the time
                    period shall automatically be extended to the business day
                    immediately following such Saturday, Sunday or legal
                    holiday.
                  </p>
                  <li className="mt-2 font-semibold">Notices</li>
                  <p className="mt-2">
                    Key information relating to your Transactions will be
                    provided to you at the email address you register with us
                    and/or in your Account. You may access, download and print
                    this information at any time by logging in to your Account.
                    In addition, you agree that we may provide notices or other
                    information to you from time to time by posting it in your
                    Account, emailing it to your registered email address,
                    mailing it to your registered physical address, calling you
                    by phone or sending you mobile messages. Notices to you by
                    email or mobile messages shall be deemed given 24 hours
                    after the email is sent unless the sending party is notified
                    that the email address is invalid. Notices sent by
                    registered mail shall be deemed to have been received three
                    days after the date of mailing. You may contact us as
                    specified in Section 11.
                  </p>
                  <li className="mt-2 font-semibold">Construction</li>
                  <p className="mt-2">
                    In the event an ambiguity or question of intent or
                    interpretation arises, this User Agreement shall be
                    construed as if drafted jointly by the Parties and no
                    presumption or burden of proof shall arise favouring or
                    disfavoring any Party by virtue of the authorship of any of
                    the provisions of this Agreement. Any reference to any law
                    shall be deemed also to refer to all rules and regulations
                    promulgated thereunder unless the context requires
                    otherwise. The English language shall be the controlling
                    language for purposes of the definitive interpretation of
                    this Agreement. The word “including” shall mean including
                    without limitation. Pronouns shall be deemed to refer to the
                    masculine, feminine, and neutral and to the singular or
                    plural as context requires. The section headings are
                    included for convenience purposes only and shall not affect
                    the meaning or construction of the substantive provisions
                    hereof. The Recitals are incorporated into this Agreement by
                    reference as if fully set forth herein. Each of CendMate and
                    you are referred to as a “Party” and together, the
                    “Parties”.
                  </p>
                </ul>
              </ul>
              <li className="mt-2 font-semibold">Refunds</li>
              <p className="mt-2">All remittance transactions are final.</p>
              <li className="mt-2 font-semibold">Contact Information</li>
              <p className="mt-2">
                If you have any questions or comments about this User Agreement
                as outlined above, you can contact us at:
              </p>
              <p>
                Customer Service: <strong>support@cendmate.com</strong>
              </p>
              <p className="mb-10">
                Complaint Team: <strong>support@cendmate.com</strong>
              </p>
            </ul>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
