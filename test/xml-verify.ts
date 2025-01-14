import * as assert from "assert";
import * as path from "path";
import * as xmldsig from "../src";
import { readXml } from "./config";

context('Verify XML with InclusiveNamespaces', () => {

    it('Verify XML signed with InclusiveNamespace inside SignedInfo', async() => {
        const xmlDocument = `<authentication:authenticationResponse id="uniqueId" xmlns:authentication="http://www.epaslaugos.lt/services/authentication" xmlns:dsig="http://www.w3.org/2000/09/xmldsig#" xmlns:ns3="http://viisp.ivpk.lt/systemHealth" xmlns:ns4="http://www.w3.org/2001/10/xml-exc-c14n#"><authentication:ticket>b3d0fcc2-9b52-434f-828a-221309757bb6</authentication:ticket><Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"><InclusiveNamespaces PrefixList="authentication" xmlns="http://www.w3.org/2001/10/xml-exc-c14n#"/></CanonicalizationMethod><SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/><Reference URI="#uniqueId"><Transforms><Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"><InclusiveNamespaces PrefixList="authentication" xmlns="http://www.w3.org/2001/10/xml-exc-c14n#"/></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/><DigestValue>27vHN7GYLnwxrc8toEkV6pGnTLc=</DigestValue></Reference></SignedInfo><SignatureValue>TwsMbNckl+vWsyD5AJNm0BqDJe45AdN2bx5oIQa++TWLytWaZrJv3ssOLyQ9XtKm3ZloU7xSaVXb
        BPX8cTFUV57RbEIrzqeW5AErkmqIU5tTlQU2K3/kjf0WZ5Lbg9RrWZX3gxZC3f3TSb7BTdYhQ1Vq
        phJHskUif5Eyye7D4QogIgjeuzZjlWGwc4cFihP0yA1eKxBF+oAQc+ZycZAaVcsRqrySI6xLgpWY
        7/oapMRzhnHMmKxiiiNzZteQmm2a6lk4xLrh/B9pJtNXgGDBX1Ivj2TJsCrkxQEUIHyyLDmGjdwi
        DoQvOJzC8QGYzjOqoY2cjeIQG8YUt78tGZTUE5Jb3eywwgPrO7pRlXmOUiIo7XZWYZplsxu8INvv
        Te5FE6+vuiGU+I/V5Ymvp1VjNK5ep+YdcL+7Xd0g5N/7tqdsGM/s357LBiNV/UpMvMG+TR8VIomp
        M4nHNAjzcOO9Yh/n5CgbhRQ/sE6i2B9CyoddSnbS8yhCDZqnqoJe4f0vPXb52uu/9Kdeb1juigHT
        D4pOOJLRNuka7G8VkXvDAQmfBnicTAKUBMjQFazCFA4F5lbMesRjcKFACK1xuH1Ie43fuYFi8YaG
        vdchwpVE4mPMRRZUSse52K6DeZpo3szGQqPD6Z2NCO6mFX6EubJq2/5WyZo4LAJGzXQCTB/f0GY=</SignatureValue><KeyInfo><KeyValue><RSAKeyValue><Modulus>1eLXOsYhpkazXq1iCGf+NUh82ISSQB8BiCnua04LP6ts1gKaTgy2KQAww4GQx0m+5qXPqaqCNALl
        TmdqzILugokUhmHW2C5lH49VmVO85cFDqpPe6Qnv7rEnBEkfHricXNi+9vWvt+KKEPja6o0nIPAQ
        CCqdnn/ThdptIt7B5qvzB59NxKbfKMjhylfc3aYi7gTZ+jP6pUGL5ci7JwVFg65rkwxUZLUhuxu8
        Px+s8Gmdey/u0sD8XoEE/4B2sNcUcuRF3VResSCkS7VY7ZngHMGVSfvt0ZDXjrLmwTP+JhS+68EW
        itv+5T82zoTKb3sueSncUfB6nJPTZBeTw03Z98t+/+wu819qm/vWaPQ1oB7YDzy5cLiJGRoXVH3A
        a3r7vWxlPka3/kTVEmXfQNlYwdYpymhrPuCqruih3wgCuYDEqvgjtCol8M1522v163keeqpZzMkg
        OaQHhV4jkfFJmgFaNNCak2FTYIeWrxx+lGJhFzMKzXhMNjoqxlZqdAi0FSAeqGnkY+JsCrj+DIzP
        jm4PccTJYsiYcPgZD6wOO/Al2H3e4Rx1iyJ6RY8L3VIkVh49J4SNjOIgHbQc/tE3aVk8Io/wZJCY
        HcD3NBluDjYKlk1j9eO6p/C4loqZ156GKfhMMdFcddheI4W50CJ/C7Rm4jPA82UWGSAI+kEArgs=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue></KeyValue></KeyInfo></Signature></authentication:authenticationResponse>`;

        const signedDocument = xmldsig.Parse(xmlDocument);
        const xmlSignature = signedDocument.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");
        const signedXml = new xmldsig.SignedXml(signedDocument);
        signedXml.LoadXml(xmlSignature[0]);
        const valid = await signedXml.Verify();
        assert.strictEqual(valid, true);

    })

    it('Verify XML signed with InclusiveNamespace and attributes with dash', async () => {
        const xmlDocument = `<saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:eidas="http://eidas.europa.eu/attributes/naturalperson" xmlns:eidas-natural="http://eidas.europa.eu/attributes/naturalperson" xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xs="http://www.w3.org/2001/XMLSchema" Consent="urn:oasis:names:tc:SAML:2.0:consent:obtained" Destination="https://api.atib.es/auth/authentication-response?returnUrl=%2Fcartero-virtual%2Fdeuda-pagada%2F" ID="_kgabUUHToscTKXGNc.R8yAmCOAR5-OHZVgR3JZmRWjx0_Fb.pBGyuxveOHcuEk9" InResponseTo="SP_6e7e85bda9904c7c96050f7634b42f67" IssueInstant="2020-05-19T09:46:12.570Z" Version="2.0"><saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">https://pasarela.clave.gob.es/Proxy2</saml2:Issuer><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" /><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha512" /><ds:Reference URI="#_kgabUUHToscTKXGNc.R8yAmCOAR5-OHZVgR3JZmRWjx0_Fb.pBGyuxveOHcuEk9"><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" /><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"><ec:InclusiveNamespaces xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#" PrefixList="eidas-natural xs" /></ds:Transform></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512" /><ds:DigestValue>TfEgyIgsHTIgzoX4xNXp7uyZPjhFcoCxBLkAdMgAcZC6oa1gEe2Bd7tHF3f1s9f0HfwzuBfYh4yMOC7V3/ktiA==</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>B3/JaVEiaF9JWySeCzjN2B6fEt6wooHWE5+T/vX1BsSAt17xLSca3c4Zm42AaDszxhLpuswPk2jHNUFwgNsDuMkdn3edTKme1PqL/KH/lgwyxqWMYsQlYBAILqcRgAgUJQptTVFIkG5zYv/llYw8zt5PiSQXiR3szxF76iUXSDmLtJEoFQ8E2og/x5YJBCuytD4Yqw1E4J4ynlGLmV1qPBlXpmFXHn/tTqzjA/NCZsmkirRSd6R06Rq0Nhfsta+LsY16FoX9H8uk5TYCti+hiKyACrltAGYYGR4pAda44Fy6DPNZstUUaHYQ8tZ8Y4Vuu74Fr0xH4mbPgc+LtbjclA==</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>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</ds:X509Certificate></ds:X509Data></ds:KeyInfo></ds:Signature><saml2p:Status><saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" /><saml2p:StatusMessage>urn:oasis:names:tc:SAML:2.0:status:Success</saml2p:StatusMessage></saml2p:Status><saml2:Assertion ID="_6snscotz8bTmyvT-B0zDM4.ix9skyxkT38son-Pg-KHjStBC9nwn4yEH0ZkKh1p" IssueInstant="2020-05-19T09:46:12.570Z" Version="2.0"><saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">https://pasarela.clave.gob.es/Proxy2</saml2:Issuer><saml2:Subject><saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" NameQualifier="https://pasarela.clave.gob.es/Proxy2">42960914L</saml2:NameID><saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer"><saml2:SubjectConfirmationData Address="10.252.131.20" InResponseTo="SP_6e7e85bda9904c7c96050f7634b42f67" NotOnOrAfter="2020-05-19T10:01:12.570Z" Recipient="https://api.atib.es/auth/authentication-response?returnUrl=%2Fcartero-virtual%2Fdeuda-pagada%2F" /></saml2:SubjectConfirmation></saml2:Subject><saml2:Conditions NotBefore="2020-05-19T09:46:12.570Z" NotOnOrAfter="2020-05-19T10:01:12.570Z"><saml2:AudienceRestriction><saml2:Audience>https://api.atib.es/auth/authentication-response?returnUrl=%2Fcartero-virtual%2Fdeuda-pagada%2F</saml2:Audience></saml2:AudienceRestriction><saml2:OneTimeUse /></saml2:Conditions><saml2:AuthnStatement AuthnInstant="2020-05-19T09:46:12.570Z"><saml2:AuthnContext><saml2:AuthnContextClassRef>http://eidas.europa.eu/LoA/substantial</saml2:AuthnContextClassRef><saml2:AuthnContextDecl /></saml2:AuthnContext></saml2:AuthnStatement><saml2:AttributeStatement><saml2:Attribute FriendlyName="FamilyName" Name="http://eidas.europa.eu/attributes/naturalperson/CurrentFamilyName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="eidas-natural:CurrentFamilyNameType">RICHE FELIU</saml2:AttributeValue></saml2:Attribute><saml2:Attribute FriendlyName="FirstName" Name="http://eidas.europa.eu/attributes/naturalperson/CurrentGivenName" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="eidas-natural:CurrentGivenNameType">PEDRO</saml2:AttributeValue></saml2:Attribute><saml2:Attribute FriendlyName="PersonIdentifier" Name="http://eidas.europa.eu/attributes/naturalperson/PersonIdentifier" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="eidas-natural:PersonIdentifierType">42960914L</saml2:AttributeValue></saml2:Attribute><saml2:Attribute FriendlyName="FirstSurname" Name="http://es.minhafp.clave/FirstSurname" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">RICHE</saml2:AttributeValue></saml2:Attribute><saml2:Attribute FriendlyName="PartialAfirma" Name="http://es.minhafp.clave/PartialAfirma" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">PFBhcnRpYWxfQWZpcm1hX1Jlc3BvbnNlIHhtbG5zOmFmeHA9InVybjphZmlybWE6ZHNzOjEuMDpwcm9maWxlOlhTUzpzY2hlbWEiIHhtbG5zOmRzcz0idXJuOm9hc2lzOm5hbWVzOnRjOmRzczoxLjA6Y29yZTpzY2hlbWEiPjxkc3M6UmVzdWx0Pjxkc3M6UmVzdWx0TWFqb3I+dXJuOm9hc2lzOm5hbWVzOnRjOmRzczoxLjA6cmVzdWx0bWFqb3I6U3VjY2VzczwvZHNzOlJlc3VsdE1ham9yPjxkc3M6UmVzdWx0TWlub3I+dXJuOm9hc2lzOm5hbWVzOnRjOmRzczoxLjA6cHJvZmlsZXM6WFNTOnJlc3VsdG1pbm9yOnZhbGlkOmNlcnRpZmljYXRlOkRlZmluaXRpdmU8L2RzczpSZXN1bHRNaW5vcj48ZHNzOlJlc3VsdE1lc3NhZ2UgeG1sOmxhbmc9ImVzIj5FbCBjZXJ0aWZpY2FkbyBlcyB2w6FsaWRvPC9kc3M6UmVzdWx0TWVzc2FnZT48L2RzczpSZXN1bHQ+PGFmeHA6UmVhZGFibGVDZXJ0aWZpY2F0ZUluZm8+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5Pk9yZ2FuaXphY2lvbkVtaXNvcmE8L2FmeHA6RmllbGRJZGVudGl0eT48YWZ4cDpGaWVsZFZhbHVlPkZOTVQtUkNNPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PnZlcnNpb25Qb2xpdGljYTwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+MjM8L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+dXNvQ2VydGlmaWNhZG88L2FmeHA6RmllbGRJZGVudGl0eT48YWZ4cDpGaWVsZFZhbHVlPmRpZ2l0YWxTaWduYXR1cmUgfCBub25SZXB1ZGlhdGlvbiB8IGtleUVuY2lwaGVybWVudDwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5wYWlzPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5FUzwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5zdWJqZWN0PC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5DPUVTLE89TUVSSVNMQSBTTCwyLjUuNC45Nz0jMEMwRjU2NDE1NDQ1NTMyRDQyMzAzNzMwMzAzNTMyMzczNSxDTj00Mjk2MDkxNEwgUEVEUk8gUklDSEUgKFI6IEIwNzAwNTI3NSksU049UklDSEUgRkVMSVUsZ2l2ZW5OYW1lPVBFRFJPLHNlcmlhbE51bWJlcj1JRENFUy00Mjk2MDkxNEwsZGVzY3JpcHRpb249UmVmOkFFQVQvQUVBVDAyMDcvUFVFU1RPIDEvMzk0NDAvMDkxMDIwMTkxMzQyNTM8L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+Y2VydFF1YWxpZmllZDwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+WUVTPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5Pm51bWVyb1NlcmllPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT4zODM1NjczNDI5ODA2Njg1MTYwNTE5NzI4MDA3NDYxNjc4ODEzNjwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5Ob21icmVBcGVsbGlkb3NSZXNwb25zYWJsZTwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+UEVEUk8gUklDSEUgRkVMSVU8L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+aWRQb2xpdGljYTwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+TUlUeUM8L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+dGlwb0NlcnRpZmljYWRvPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5GTk1UIENlcnRpZmljYWRvIGRlIFJlcHJlc2VudGFjacOzbiBkZSBQZXJzb25hIEp1cmlkaWNhPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PmNlcnRDbGFzc2lmaWNhdGlvbjwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+RVNJRzwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5jbGFzaWZpY2FjaW9uPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT4xMTwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5PSV9FdXJvcGVvPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5WQVRFUy1CMDcwMDUyNzU8L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+TklGUmVzcG9uc2FibGU8L2FmeHA6RmllbGRJZGVudGl0eT48YWZ4cDpGaWVsZFZhbHVlPjQyOTYwOTE0TDwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5ub21icmVSZXNwb25zYWJsZTwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+UEVEUk88L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+QXBlbGxpZG9zUmVzcG9uc2FibGU8L2FmeHA6RmllbGRJZGVudGl0eT48YWZ4cDpGaWVsZFZhbHVlPlJJQ0hFIEZFTElVPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PnNlZ3VuZG9BcGVsbGlkb1Jlc3BvbnNhYmxlPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5GRUxJVTwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5yYXpvblNvY2lhbDwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+TUVSSVNMQSBTTDwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT5wcmltZXJBcGVsbGlkb1Jlc3BvbnNhYmxlPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5SSUNIRTwvYWZ4cDpGaWVsZFZhbHVlPjwvYWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6RmllbGRJZGVudGl0eT52YWxpZG9IYXN0YTwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+MjAyMS0xMC0wOSBzw6FiIDEzOjQ2OjMzICswMjAwPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PkRvY3VtZW50byByZXByZXNlbnRhY2nDs248L2FmeHA6RmllbGRJZGVudGl0eT48YWZ4cDpGaWVsZFZhbHVlPlJlZjpBRUFUL0FFQVQwMjA3L1BVRVNUTyAxLzM5NDQwLzA5MTAyMDE5MTM0MjUzPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PnZhbGlkb0Rlc2RlPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT4yMDE5LTEwLTA5IG1pw6kgMTM6NDY6MzMgKzAyMDA8L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+SURfZXVyb3BlbzwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+SURDRVMtNDI5NjA5MTRMPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PmVtYWlsPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5jb250YUBlc2dhYmlvLmVzPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PnFzY2Q8L2FmeHA6RmllbGRJZGVudGl0eT48YWZ4cDpGaWVsZFZhbHVlPk5PPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PmlkRW1pc29yPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5DTj1BQyBSZXByZXNlbnRhY2nDs24sT1U9Q0VSRVMsTz1GTk1ULVJDTSxDPUVTPC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PmV4dGVuc2lvblVzb0NlcnRpZmljYWRvPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT5LZXlQdXJwb3NlSWQgMDogIFRMUyBXZWIgY2xpZW50IGF1dGhlbnRpY2F0aW9uCktleVB1cnBvc2VJZCAxOiAgRS1tYWlsIHByb3RlY3Rpb248L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpSZWFkYWJsZUZpZWxkPjxhZnhwOkZpZWxkSWRlbnRpdHk+TklGLUNJRjwvYWZ4cDpGaWVsZElkZW50aXR5PjxhZnhwOkZpZWxkVmFsdWU+QjA3MDA1Mjc1PC9hZnhwOkZpZWxkVmFsdWU+PC9hZnhwOlJlYWRhYmxlRmllbGQ+PGFmeHA6UmVhZGFibGVGaWVsZD48YWZ4cDpGaWVsZElkZW50aXR5PnBvbGl0aWNhPC9hZnhwOkZpZWxkSWRlbnRpdHk+PGFmeHA6RmllbGRWYWx1ZT4xLjMuNi4xLjQuMS41NzM0LjMuMTEuMiwwLjQuMC4xOTQxMTIuMS4wLDIuMTYuNzI0LjEuMy41Ljg8L2FmeHA6RmllbGRWYWx1ZT48L2FmeHA6UmVhZGFibGVGaWVsZD48L2FmeHA6UmVhZGFibGVDZXJ0aWZpY2F0ZUluZm8+PC9QYXJ0aWFsX0FmaXJtYV9SZXNwb25zZT4=</saml2:AttributeValue></saml2:Attribute><saml2:Attribute FriendlyName="SelectedIdP" Name="http://es.minhafp.clave/SelectedIdP" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">AFIRMA</saml2:AttributeValue></saml2:Attribute><saml2:Attribute FriendlyName="RelayState" Name="http://es.minhafp.clave/RelayState" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"><saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="eidas-natural:PersonIdentifierType">6e7e85bd-a990-4c7c-9605-0f7634b42f67</saml2:AttributeValue></saml2:Attribute></saml2:AttributeStatement></saml2:Assertion></saml2p:Response>`;
        const signedDocument = xmldsig.Parse(xmlDocument);
        const xmlSignature = signedDocument.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");
        const signedXml = new xmldsig.SignedXml(signedDocument);
        signedXml.LoadXml(xmlSignature[0]);
        const valid = await signedXml.Verify();
        assert.strictEqual(valid, true);
    });

});

context("Verify XML signatures", function () {

    this.timeout(3500);

    async function verifyXML(name: string, res = true) {
        const file = path.join(__dirname, "static", name);
        const xml = readXml(file);

        const signatures = xml.getElementsByTagNameNS("http://www.w3.org/2000/09/xmldsig#", "Signature");
        const sig = new xmldsig.SignedXml(xml);
        sig.LoadXml(signatures[0]);
        const ok = await sig.Verify();
        assert.equal(ok, res, "Wrong signature");
    }

    async function verifyExternalXML(name: string, externalName: string, res = true) {
        const file = path.join(__dirname, "static", name);
        const externalFile = path.join(__dirname, "static", externalName);
        const xml = readXml(file);
        const externalXml = readXml(externalFile);

        const signature = xmldsig.Select(xml, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
        const sig = new xmldsig.SignedXml(externalXml);
        sig.LoadXml(signature as Element);
        const ok = await sig.Verify();
        assert.equal(ok, res, "Wrong signature");
    }

    it("Init SignedXml from Element", () => {
        const xmlText = "<root><first></first><second/></root>";
        const xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
        assert.equal(!!xmlDoc, true);
        assert.equal(xmlDoc.documentElement.nodeName, "root");

        const first = xmldsig.Select(xmlDoc, "//*[local-name()='first']")[0];
        assert.equal(!!first, true);

        const sx = new xmldsig.SignedXml(first as Element);
        assert.equal(!!sx, true);
    });

    context("some", () => {
        [
            "valid_signature_utf8",
            "valid_signature_office",
            "valid_saml",
            "saml_external_ns",
            "wsfederation_metadata",
            "tl-mp",
            "tl-mp-repeated-namespace",
        ].forEach((file) =>
            it(file, async () => {
                await verifyXML(`${file}.xml`);
            }));
    });

    context("aleksey.com", () => {

        [
            "enveloping-rsa-x509chain",
            "enveloping-sha1-rsa-sha1",
            "enveloping-sha256-rsa-sha256",
            "enveloping-sha384-rsa-sha384",
            "enveloping-sha512-rsa-sha512",
        ].forEach((file) =>
            it(file, async () => verifyXML(`${file}.xml`)));

    });

    [
        ["valid_signature_asic", "ping"],
    ].forEach((file) =>
        it(file[0], async () => verifyExternalXML(`${file[0]}.xml`, `${file[1]}.xml`)));

});
