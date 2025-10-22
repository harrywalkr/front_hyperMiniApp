import type { Metadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import type { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import type { Robots } from "next/dist/lib/metadata/types/metadata-types";
import { site } from "../config";

/**
 * Represents an image with its metadata
 */
type Image = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

/**
 * Site configuration type
 */
type SiteConfig = {
  name: string;
  url?: string;
};

/**
 * Base metadata configuration for building page metadata
 */
type BaseMeta = {
  title: string;
  description: string;
  keywords?: string[];
  indexable?: boolean;
  tags?: string[];
  category?: string;
  modifiedTime?: string;
  images?: Image | Image[];
  url?: string;
};

/**
 * A builder class for constructing Next.js metadata objects
 * Provides a fluent interface for configuring various metadata aspects
 * including OpenGraph, Twitter cards, robots, and custom meta tags
 */
export class MetadataBuilder {
  private state: Metadata;

  /**
   * Creates a new MetadataBuilder instance with the provided base configuration
   * @param base - The base metadata configuration
   */
  constructor(private base: BaseMeta) {
    const imagesArray = Array.isArray(base?.images)
      ? base?.images
      : base?.images
        ? [base?.images]
        : [];

    this.state = {
      title: base?.title,
      description: base?.description,
      keywords: base?.keywords ?? [],
      category: base?.category,
      applicationName: site.name,
      robots: {
        index: base?.indexable ?? true,
        follow: base?.indexable ?? true,
      },
      openGraph: {
        title: base?.title,
        description: base?.description,
        url: base?.url,
        siteName: site.name,
        locale: "en_US",
        type: "website",
        images: imagesArray,
        ...(base?.modifiedTime && { modifiedTime: base?.modifiedTime }),
      } as OpenGraph,
      twitter: {
        title: base?.title,
        description: base?.description,
        site: "dextradingapp",
        card: "summary_large_image",
        images: imagesArray,
      } as Twitter,
      alternates: {
        canonical: base?.url,
      },
    } as Metadata;
  }

  /**
   * Builds and returns the final metadata object
   * @returns The complete metadata configuration
   */
  build(): Metadata {
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Internal method to patch metadata properties
   * @param key - The metadata property to update
   * @param overrides - The new values to apply
   * @returns The builder instance for method chaining
   */
  private patch<K extends keyof Metadata>(
    key: K,
    overrides: Partial<Metadata[K]>
  ): this {
    this.state[key] = {
      ...(this.state[key] as object),
      ...overrides,
    } as Metadata[K];
    return this;
  }

  /**
   * Updates OpenGraph metadata
   * @param overrides - The OpenGraph properties to update
   * @returns The builder instance for method chaining
   */
  openGraph(overrides: Partial<OpenGraph>): this {
    return this.patch("openGraph", overrides);
  }

  /**
   * Updates Twitter card metadata
   * @param overrides - The Twitter card properties to update
   * @returns The builder instance for method chaining
   */
  twitter(overrides: Partial<Twitter>): this {
    return this.patch("twitter", overrides);
  }

  /**
   * Updates alternate URLs metadata
   * @param overrides - The alternate URLs to update
   * @returns The builder instance for method chaining
   */
  alternates(overrides: Partial<Metadata["alternates"]>): this {
    return this.patch("alternates", overrides);
  }

  /**
   * Adds custom meta tags
   * @param entries - Key-value pairs for custom meta tags
   * @returns The builder instance for method chaining
   */
  customMeta(
    entries: Record<string, string | number | Array<string | number>>
  ): this {
    const other = {
      ...(this.state.other || {}),
      ...Object.fromEntries(
        Object.entries(entries).filter(([, v]) => v != null)
      ),
    };
    this.state.other = other;
    return this;
  }

  /**
   * Sets the authors metadata
   * @param authors - Array of author objects with name and optional URL
   * @returns The builder instance for method chaining
   */
  authors(authors: Array<{ name: string; url?: string }>): this {
    this.state.authors = authors;
    return this;
  }

  /**
   * Sets the favicon and apple touch icon
   * @param icons - Icon configuration with optional custom paths
   * @returns The builder instance for method chaining
   */
  icons(icons: { icon?: string; apple?: string }): this {
    this.state.icons = {
      icon: icons?.icon ?? "/favicon.ico",
      apple: icons?.apple ?? `${site.urls.domain}/apple-touch-icon.png`,
    };
    return this;
  }

  /**
   * Updates robots meta tag configuration
   * @param options - Robot directives to update
   * @returns The builder instance for method chaining
   */
  robots(options: Partial<Robots>): this {
    const current =
      typeof this.state.robots === "string"
        ? { index: true, follow: true }
        : this.state?.robots || { index: true, follow: true };

    this.state.robots = {
      index: options?.index ?? current?.index,
      follow: options?.follow ?? current?.follow,
      ...options,
    } as Robots;
    return this;
  }
}
