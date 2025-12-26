import type { LucideIcon } from "lucide-react";
import {
  Instagram,
  Hash,
  Youtube,
  FileImage,
  FileText,
  FileDown,
  Code,
  KeyRound,
  CaseSensitive,
  TextCursorInput,
  Receipt,

  Mail,
  FileSignature,
  FileBadge,
  Download,
  Briefcase,
} from "lucide-react";



export type Tool = {
  name: string;
  slug: string;
  category: string;
  description: string;
  popular?: boolean;
  icon: LucideIcon;
};




export const tools: Tool[] = [
  // SOCIAL MEDIA
  {
    name: "Instagram Caption Generator",
    slug: "instagram-caption-generator",
    category: "Social Media",
    description: "Generate Instagram captions instantly",
    popular: true,
    icon: Instagram,
  },
  {
    name: "Instagram Hashtag Generator",
    slug: "instagram-hashtag-generator",
    category: "Social Media",
    description: "Generate trending hashtags",
    icon: Hash,
  },
  {
    name: "YouTube Title Generator",
    slug: "youtube-title-generator",
    category: "Social Media",
    description: "Generate catchy YouTube titles",
    popular: true,
    icon: Youtube,
  },

  // DOCUMENT TOOLS
  {
    name: "PDF to Image",
    slug: "pdf-to-image",
    category: "Document Tools",
    description: "Convert PDF pages to images",
    popular: true,
    icon: FileImage,
  },
  {
    name: "Image to PDF",
    slug: "image-to-pdf",
    category: "Document Tools",
    description: "Convert images to PDF",
    icon: FileDown,
  },
  {
    name: "Compress PDF",
    slug: "compress-pdf",
    category: "Document Tools",
    description: "Reduce PDF size",
    icon: FileText,
  },

  // DEVELOPER TOOLS
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    category: "Developer Tools",
    description: "Format JSON online",
    popular: true,
    icon: Code,
  },
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    category: "Developer Tools",
    description: "Decode JWT tokens",
    icon: KeyRound,
  },

  // TEXT TOOLS
  {
    name: "Case Converter",
    slug: "case-converter",
    category: "Text Tools",
    description: "Convert text case",
    icon: CaseSensitive,
  },
  {
    name: "Word Counter",
    slug: "word-counter",
    category: "Text Tools",
    description: "Count words and characters",
    icon: TextCursorInput,
  },

  // BUSINESS
 // BUSINESS / CAREER TOOLS
{
  name: "GST Invoice Generator",
  slug: "gst-invoice-generator",
  category: "Business Tools",
  description: "Generate GST invoices instantly",
  icon: Receipt,
},
{
  name: "Cold Email Generator",
  slug: "cold-email-generator",
  category: "Career Tools",
  description: "Generate professional cold emails",
  icon: Mail,
},
{
  name: "Resume Summary Generator",
  slug: "resume-summary-generator",
  category: "Career Tools",
  description: "Create resume summaries for freshers",
  icon: FileSignature,
},
{
  name: "Instagram Reel Downloader",
  slug: "instagram-reel-downloader",
  category: "Social Media",
  description: "Download Instagram reels without login",
  icon: Download,
},
{
  name: "Resume Builder (India)",
  slug: "resume-builder-india",
  category: "Career Tools",
  description: "Create simple resumes for Indian freshers",
  icon: Briefcase,
},
{
  name: "Offer Letter Generator",
  slug: "offer-letter-generator",
  category: "Business Tools",
  description: "Generate offer letters instantly",
  icon: FileBadge,
},


];
