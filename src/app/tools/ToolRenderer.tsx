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


import ImageToPdfTool from "./ImageToPdfTool";
import CompressPdfTool from "./CompressPdfTool";

import WordCounterTool from "./WordCounterTool";
import CaseConverterTool from "./CaseConverterTool";
import PasswordGeneratorTool from "./PasswordGeneratorTool";
import QRGeneratorTool from "./QRGeneratorTool";
import URLEncoderTool from "./URLEncoderTool";

import JSONFormatterTool from "./JSONFormatterTool";
import JWTDecoderTool from "./JWTDecoderTool";
import MetaTagGeneratorTool from "./MetaTagGeneratorTool";
import UTMBuilderTool from "./UTMBuilderTool";

import ComingSoonTool from "./ComingSoonTool";

/* 🔥 PDF TOOL (DYNAMIC, CLIENT‑ONLY) */
const PdfToImageTool = dynamic(
  () => import("./PdfToImageTool"),
  { ssr: false }
);

const TOOL_COMPONENTS: Record<string, FC> = {
  // SOCIAL
  "instagram-caption-generator": InstagramCaptionTool,
  "instagram-hashtag-generator": InstagramHashtagTool,
  "youtube-title-generator": YouTubeTitleTool,
  "youtube-description-generator": YouTubeDescriptionTool,
  "bio-generator": BioGeneratorTool,
  "fancy-text-generator": FancyTextTool,
  "instagram-reel-downloader": InstagramReelDownloader,

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
  "gst-invoice-generator": GSTInvoiceGenerator,
  "cold-email-generator": ColdEmailGenerator,
  "resume-summary-generator": ResumeSummaryGenerator,
  "resume-builder-india": ResumeBuilderIndia,
  "offer-letter-generator": OfferLetterGenerator,

  // PDF
  "pdf-to-image": PdfToImageTool,
  "image-to-pdf": ImageToPdfTool,
  "compress-pdf": CompressPdfTool,
};


export default function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = TOOL_COMPONENTS[slug] || ComingSoonTool;
  return <ToolComponent />;
}
