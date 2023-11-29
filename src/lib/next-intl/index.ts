import { notFound } from "next/navigation";

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

const locales = ["en", "cn", "ko"];

export { getMessages, locales };
