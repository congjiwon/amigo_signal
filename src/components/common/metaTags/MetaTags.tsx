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
      <meta property="title" content={ogTitle} />
      <meta property="url" content={ogUrl} />
      <meta property="type" content="website" />
      <meta property="image" content={ogImage} />
      <meta property="description" content={ogDescription} />
      <meta property="site_name" content="Amigo Signal" />
      <meta property="locale" content="en_US" />
      <meta property="image:width" content={ogImageWidth} />
      <meta property="image:height" content={ogImageHeight} />
    </Helmet>
  );
};

export default MetaTags;
