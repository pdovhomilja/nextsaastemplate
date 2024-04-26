import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  email: string;
  storyTitle: string;
  url: string;
}

export const NewStoryNotificationEmail = ({
  email,
  storyTitle,
  url,
}: VercelInviteUserEmailProps) => {
  const previewText = "Nový článek na - " + process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {storyTitle}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Dobrý den,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Na webu <strong>{process.env.NEXT_PUBLIC_APP_NAME}</strong> byl
              publikován nový článek s názvem <strong>{storyTitle}</strong>.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Podívejte se na něj na následujícím odkazu: Link:{" "}
              <Link href={url}>{url}</Link>
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-slate-800 rounded-md text-white  py-3 px-4 text-[12px] font-semibold no-underline text-center"
                href={url}
              >
                Zobrazit článek
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewStoryNotificationEmail;
