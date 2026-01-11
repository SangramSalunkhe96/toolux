"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";

/* NORMAL TOOLS */
import InstagramCaptionTool from "./InstagramCaptionTool";
import InstagramHashtagTool from "./InstagramHashtagTool";
import YouTubeTitleTool from "./YouTubeTitleTool";
import YouTubeDescriptionTool from "./YouTubeDescriptionTool";
import BioGeneratorTool from "./BioGeneratorTool";
import FancyTextTool from "./FancyTextTool";
import GSTInvoiceGenerator from "./GSTInvoiceGenerator";
import ColdEmailGenerator from "./ColdEmailGenerator";
import ResumeSummaryGenerator from "./ResumeSummaryGenerator";
import InstagramReelDownloader from "./InstagramReelDownloader";
import ResumeBuilderIndia from "./ResumeBuilderIndia";
import OfferLetterGenerator from "./OfferLetterGenerator";
import MergePdfTool from "./MergePdfTool";
import ReelHookGeneratorTool from "./ReelHookGeneratorTool";
import ImageCompressorTool from "./ImageCompressorTool";
import PdfUnlockTool from "./PdfUnlockTool";

import ImageToPdfTool from "./ImageToPdfTool";
const CompressPdfTool = dynamic(
  () => import("./CompressPdfTool"),
  { ssr: false }
);


import WordCounterTool from "./WordCounterTool";
import CaseConverterTool from "./CaseConverterTool";
import PasswordGeneratorTool from "./PasswordGeneratorTool";
import QRGeneratorTool from "./QRGeneratorTool";
import URLEncoderTool from "./URLEncoderTool";

import JSONFormatterTool from "./JSONFormatterTool";
import JWTDecoderTool from "./JWTDecoderTool";
import MetaTagGeneratorTool from "./MetaTagGeneratorTool";
import UTMBuilderTool from "./UTMBuilderTool";
import ResumeAtsCheckerTool from "./ResumeAtsCheckerTool";
import ComingSoonTool from "./ComingSoonTool";
import WhatsAppLinkGeneratorTool from "./WhatsAppLinkGeneratorTool";
import ChatMockupGeneratorTool from "./ChatMockupGeneratorTool";
import SplitPdfTool from "./SplitPdfTool";

/* 🔥 PDF TOOL (DYNAMIC, CLIENT‑ONLY) */
const PdfToImageTool = dynamic(
  () => import("./PdfToImageTool"),
  { ssr: false }
);

const TOOL_COMPONENTS: Record<string, React.ComponentType<any>> = {

  // SOCIAL
  "instagram-caption-generator": InstagramCaptionTool,
  "reel-hook-generator": ReelHookGeneratorTool,
  "instagram-hashtag-generator": InstagramHashtagTool,
  "youtube-title-generator": YouTubeTitleTool,
  "youtube-description-generator": YouTubeDescriptionTool,
  "bio-generator": BioGeneratorTool,
  "fancy-text-generator": FancyTextTool,
  "instagram-reel-downloader": InstagramReelDownloader,

// ✅ VIRAL TOOLS (ADD THESE)
  "whatsapp-link-generator": WhatsAppLinkGeneratorTool,
  "chat-mockup-generator": ChatMockupGeneratorTool,

  // DAILY
  "word-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "password-generator": PasswordGeneratorTool,
  "qr-generator": QRGeneratorTool,
  "url-encoder": URLEncoderTool,

  // DEV
  "json-formatter": JSONFormatterTool,
  "jwt-decoder": JWTDecoderTool,
  "meta-tag-generator": MetaTagGeneratorTool,
  "utm-builder": UTMBuilderTool,

  // BUSINESS / CAREER
  "resume-ats-checker": ResumeAtsCheckerTool,
  "gst-invoice-generator": GSTInvoiceGenerator,
  "cold-email-generator": ColdEmailGenerator,
  "resume-summary-generator": ResumeSummaryGenerator,
  "resume-builder-india": ResumeBuilderIndia,
  "offer-letter-generator": OfferLetterGenerator,
  

  // PDF
  "image-compressor": ImageCompressorTool,
"pdf-unlock": PdfUnlockTool,
  "pdf-to-image": PdfToImageTool,
  "image-to-pdf": ImageToPdfTool,
  "compress-pdf": CompressPdfTool,
  "merge-pdf": MergePdfTool,
  "split-pdf": SplitPdfTool,
};


export default function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = TOOL_COMPONENTS[slug] || ComingSoonTool;
  return <ToolComponent />;
}
