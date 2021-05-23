import { makeStyles, Paper } from "@material-ui/core";
import BackButton from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
    height: "80vh",
    margin: "auto",
    marginTop: "5vh",
    padding: theme.spacing(4, 6),
    borderRadius: "0.5em",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "5vh",
  },
}));

const Terms = () => {
  const history = useHistory();
  const classes = useStyles();
  const onBackClick = () => {
    history.push("/chat");
  };
  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={5}>
        <IconButton
          edge="start"
          className={classes.button}
          color="inherit"
          aria-label="Back to Home Page"
          onClick={onBackClick}
        >
          <BackButton />
        </IconButton>
        <strong className={classes.title}>Terms and conditions</strong>
      </Paper>
      <Paper className={classes.root} elevation={5}>
        <h1>CO-convo-EP Terms & Privacy Policy </h1>
        CO-convo-EP is designed to never collect or store any sensitive
        information. CO-convo-EP messages and calls cannot be accessed by us or
        other third parties because they are always end-to-end encrypted,
        private, and secure. Our Terms of Service and Privacy Policy are
        available below.
        <br />
        <h2>Terms of Service Privacy Policy Terms of Service CO-convo-EP.</h2>
        (“CO-convo-EP”) utilizes state-of-the-art security and end-to-end
        encryption to provide private messaging, Internet calling, and other
        services to users worldwide. You agree to our Terms of Service (“Terms”)
        by installing or using our apps, services, or website (together,
        “Services”).
        <br />
        About our services Minimum Age. You must be at least 13 years old to use
        our Services. The minimum age to use our Services without parental
        approval may be higher in your home country.
        <br />
        Account Registration. To create an account you must register for our
        Services using your college mail. You agree to receive text messages and
        phone calls (from us or our third-party providers) with verification
        codes to register for our Services.
        <br />
        <h2>Privacy of user data.</h2>
        CO-convo-EP does not sell, rent or monetize your personal data or
        content in any way – ever.
        <br />
        Please read our Privacy Policy to understand how we safeguard the
        information you provide when using our Services. For the purpose of
        operating our Services, you agree to our data practices as described in
        our Privacy Policy, as well as the transfer of your encrypted
        information and metadata to the United States and other countries where
        we have or use facilities, service providers or partners. Examples would
        be Third Party Providers sending you a verification code and processing
        your support tickets.
        <br />
        Software. In order to enable new features and enhanced functionality,
        you consent to downloading and installing updates to our Services.
        <br />
        Fees and Taxes. You are responsible for data and mobile carrier fees and
        taxes associated with the devices on which you use our Services.
        <br />
        Using CO-convo-EP Our Terms and Policies. You must use our Services
        according to our Terms and posted policies. If we disable your account
        for a violation of our Terms, you will not create another account
        without our permission.
        <br />
        Legal and Acceptable Use. You agree to use our Services only for legal,
        authorized, and acceptable purposes. You will not use (or assist others
        in using) our Services in ways that: (a) violate or infringe the rights
        of CO-convo-EP, our users, or others, including privacy, publicity,
        intellectual property, or other proprietary rights; (b) involve sending
        illegal or impermissible communications such as bulk messaging,
        auto-messaging, and auto-dialing.
        <br />
        Harm to CO-convo-EP. You must not (or assist others to) access, use,
        modify, distribute, transfer, or exploit our Services in unauthorized
        manners, or in ways that harm CO-convo-EP, our Services, or systems. For
        example you must not (a) gain or try to gain unauthorized access to our
        Services or systems; (b) disrupt the integrity or performance of our
        Services; (c) create accounts for our Services through unauthorized or
        automated means; (d) collect information about our users in any
        unauthorized manner; or (e) sell, rent, or charge for our Services.
        <br />
        Keeping Your Account Secure. CO-convo-EP embraces privacy by design and
        does not have the ability to access your messages. You are responsible
        for keeping your device and your CO-convo-EP account safe and secure. If
        you lose your phone, follow the steps on our Support site to re-register
        for our Services. When you register with a new device, your old device
        will stop receiving all messages and calls.
        <br />
        No Access to Emergency Services. Our Services do not provide access to
        emergency service providers like the police, fire department, hospitals,
        or other public safety organizations. Make sure you can contact
        emergency service providers through a mobile, fixed-line telephone, or
        other service.
        <br />
        Third-party services. Our Services may allow you to access, use, or
        interact with third-party websites, apps, content, and other products
        and services. When you use third-party services, their terms and privacy
        policies govern your use of those services.
        <br />
        Your Rights and License with CO-convo-EP Your Rights. You own the
        information you submit through our Services. You must have the rights to
        the phone number you use to sign up for your CO-convo-EP account.
        <br />
        Signal’s Rights. We own all copyrights, trademarks, domains, logos,
        trade dress, trade secrets, patents, and other intellectual property
        rights associated with our Services. You may not use our copyrights,
        trademarks, domains, logos, trade dress, patents, and other intellectual
        property rights unless you have our written permission. To report
        copyright, trademark, or other intellectual property infringement,
        please contact abuse@signal.org.
        <br />
        Signal’s License to You. CO-convo-EP grants you a limited, revocable,
        non-exclusive, and non-transferable license to use our Services in
        accordance with these Terms.
        <br />
        Disclaimers and Limitations Disclaimers. YOU USE OUR SERVICES AT YOUR
        OWN RISK AND SUBJECT TO THE FOLLOWING DISCLAIMERS. WE PROVIDE OUR
        SERVICES ON AN “AS IS” BASIS WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES,
        INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS
        FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND FREEDOM FROM
        COMPUTER VIRUS OR OTHER HARMFUL CODE. SIGNAL DOES NOT WARRANT THAT ANY
        INFORMATION PROVIDED BY US IS ACCURATE, COMPLETE, OR USEFUL, THAT OUR
        SERVICES WILL BE OPERATIONAL, ERROR-FREE, SECURE, OR SAFE, OR THAT OUR
        SERVICES WILL FUNCTION WITHOUT DISRUPTIONS, DELAYS, OR IMPERFECTIONS. WE
        DO NOT CONTROL, AND ARE NOT RESPONSIBLE FOR, CONTROLLING HOW OR WHEN OUR
        USERS USE OUR SERVICES. WE ARE NOT RESPONSIBLE FOR THE ACTIONS OR
        INFORMATION (INCLUDING CONTENT) OF OUR USERS OR OTHER THIRD PARTIES. YOU
        RELEASE US, AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, PARTNERS, AND
        AGENTS (TOGETHER, “SIGNAL PARTIES”) FROM ANY CLAIM, COMPLAINT, CAUSE OF
        ACTION, CONTROVERSY, OR DISPUTE (TOGETHER, “CLAIM”) AND DAMAGES, KNOWN
        AND UNKNOWN, RELATING TO, ARISING OUT OF, OR IN ANY WAY CONNECTED WITH
        ANY SUCH CLAIM YOU HAVE AGAINST ANY THIRD PARTIES.
        <br />
        Limitation of liability. THE SIGNAL PARTIES WILL NOT BE LIABLE TO YOU
        FOR ANY LOST PROFITS OR CONSEQUENTIAL, SPECIAL, PUNITIVE, INDIRECT, OR
        INCIDENTAL DAMAGES RELATING TO, ARISING OUT OF, OR IN ANY WAY IN
        CONNECTION WITH OUR TERMS, US, OR OUR SERVICES, EVEN IF THE SIGNAL
        PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
        AGGREGATE LIABILITY RELATING TO, ARISING OUT OF, OR IN ANY WAY IN
        CONNECTION WITH OUR TERMS, US, OR OUR SERVICES WILL NOT EXCEED ONE
        HUNDRED DOLLARS ($100). THE FOREGOING DISCLAIMER OF CERTAIN DAMAGES AND
        LIMITATION OF LIABILITY WILL APPLY TO THE MAXIMUM EXTENT PERMITTED BY
        APPLICABLE LAW. THE LAWS OF SOME STATES OR JURISDICTIONS MAY NOT ALLOW
        THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OR ALL OF THE
        EXCLUSIONS AND LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO YOU.
        NOTWITHSTANDING ANYTHING TO THE CONTRARY IN OUR TERMS, IN SUCH CASES,
        THE LIABILITY OF THE SIGNAL PARTIES WILL BE LIMITED TO THE FULLEST
        EXTENT PERMITTED BY APPLICABLE LAW.
        <br />
        Availability of Our Services. Our Services may be interrupted, including
        for maintenance, upgrades, or network or equipment failures. We may
        discontinue some or all of our Services, including certain features and
        the support for certain devices and platforms, at any time.
        <br />
        Resolving Disputes and Ending Terms Resolving disputes. You agree to
        resolve any Claim you have with us relating to or arising out of our
        Terms, us, or our Services exclusively in the United States District
        Court for the Northern District of California or a state court in San
        Mateo County, California. You also agree to submit to the personal
        jurisdiction of such courts for the purpose of litigating all such
        disputes. The laws of the State of California govern our Terms, as well
        as any disputes, whether in court or arbitration, which might arise
        between CO-convo-EP and you, without regard to conflict of law
        provisions.
        <br />
        Ending these Terms. You may end these Terms with CO-convo-EP at any time
        by deleting CO-convo-EP Messenger from your device and discontinuing use
        of our Services. We may modify, suspend, or terminate your access to or
        use of our Services anytime for any reason, such as if you violate the
        letter or spirit of our Terms or create harm, risk, or possible legal
        exposure for CO-convo-EP. The following provisions will survive
        termination of your relationship with CO-convo-EP: “Licenses,”
        “Disclaimers,” “Limitation of Liability,” “Resolving dispute,”
        “Availability” and “Ending these Terms,” and “General”.
        <br />
        General CO-convo-EP may update the Terms from time to time. When we
        update our Terms, we will update the “Last Modified” date associated
        with the updated Terms. Your continued use of our Services confirms your
        acceptance of our updated Terms and supersedes any prior Terms. You will
        comply with all applicable export control and trade sanctions laws. Our
        Terms cover the entire agreement between you and CO-convo-EP regarding
        our Services. If you do not agree with our Terms, you should stop using
        our Services.
        <br />
        If we fail to enforce any of our Terms, that does not mean we waive the
        right to enforce them. If any provision of the Terms is deemed unlawful,
        void, or unenforceable, that provision shall be deemed severable from
        our Terms and shall not affect the enforceability of the remaining
        provisions. Our Services are not intended for distribution to or use in
        any country where such distribution or use would violate local law or
        would subject us to any regulations in another country. We reserve the
        right to limit our Services in any country. If you have specific
        questions about these Terms, please contact us at privacy@signal.org.
        <br />
        Privacy Policy CO-convo-EP utilizes state-of-the-art security and
        end-to-end encryption to provide private messaging and Internet calling
        services to users worldwide (“Services”). Your calls and messages are
        always encrypted, so they can never be shared or viewed by anyone but
        yourself and the intended recipients.
        <br />
        Information you provide Account Information. You register a phone number
        when you create a CO-convo-EP account. Phone numbers are used to provide
        our Services to you and other CO-convo-EP users. You may optionally add
        other information to your account, such as a profile name and profile
        picture. This information is end-to-end encrypted.
        <br />
        Messages. CO-convo-EP cannot decrypt or otherwise access the content of
        your messages or calls. CO-convo-EP queues end-to-end encrypted messages
        on its servers for delivery to devices that are temporarily offline
        (e.g. a phone whose battery has died). Your message history is stored on
        your own devices.
        <br />
        Additional technical information is stored on our servers, including
        randomly generated authentication tokens, keys, push tokens, and other
        material that is necessary to establish calls and transmit messages.
        CO-convo-EP limits this additional technical information to the minimum
        required to operate the Services.
        <br />
        Contacts. CO-convo-EP can optionally discover which contacts in your
        address book are CO-convo-EP users, using a service designed to protect
        the privacy of your contacts. Information from the contacts on your
        device may be cryptographically hashed and transmitted to the server in
        order to determine which of your contacts are registered.
        <br />
        User Support. If you contact CO-convo-EP User Support, any personal data
        you may share with us is kept only for the purposes of researching the
        issue and contacting you about your case.
        <br />
        Managing your information. You can manage your personal information in
        Signal’s application Settings. For example, you can update your profile
        information or choose to enable additional privacy features like a
        Registration Lock PIN.
        <br />
        Information we may share Third Parties. We work with third parties to
        provide some of our Services. For example, our Third-Party Providers
        send a verification code to your phone number when you register for our
        Services. These providers are bound by their Privacy Policies to
        safeguard that information. If you use other Third-Party Services like
        YouTube, Spotify, Giphy, etc. in connection with our Services, their
        Terms and Privacy Policies govern your use of those services.
        <br />
        Other instances where CO-convo-EP may need to share your data
        <br />
        To meet any applicable law, regulation, legal process or enforceable
        governmental request. To enforce applicable Terms, including
        investigation of potential violations. To detect, prevent, or otherwise
        address fraud, security, or technical issues. To protect against harm to
        the rights, property, or safety of CO-convo-EP, our users, or the public
        as required or permitted by law. Updates We will update this privacy
        policy as needed so that it is current, accurate, and as clear as
        possible. Your continued use of our Services confirms your acceptance of
        our updated Privacy Policy.
        <br />
        Terms Please also read our Terms which also governs the terms of this
        Privacy Policy. Contact Us 1) Prajjwal Datir 2) Ganesh Gitte 3) Aditi
        Medhane
      </Paper>
    </React.Fragment>
  );
};

export default Terms;
