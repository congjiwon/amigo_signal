import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  ogTitle: string;
  ogUrl: string;
  ogDescription: string;
  ogImage: string;
  ogImageWidth: string;
  ogImageHeight: string;
}

const MetaTags = ({ title, ogTitle, ogUrl, ogDescription, ogImage, ogImageWidth, ogImageHeight }: MetaTagsProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
    </Helmet>
  );
};

export default MetaTags;
