import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import constant from './contant';

function Seo({
  title,
  description,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogImageAltTag,
  ogMediaType,
  isNoIndex,
  prevUrl,
  nextUrl,
  canonicalUrl,
  customMetaTags,
}) {
  const getTitle = () => {
    return title ? title : constant.seo.title;
  };
  const getDescription = () => {
    return description ? description : constant.seo.description;
  };
  const getMediaTitle = () => {
    return `${ogTitle ? ogTitle : constant.seo.title} | emresandikci.com`;
  };
  const getMediaDescription = () => {
    return ogDescription ? ogDescription : constant.seo.description;
  };
  const getMediaUrl = () => {
    return ogUrl ? ogUrl : constant.seo.baseUrl;
  };
  const getMediaImageUrl = () => {
    return ogImage ? ogImage : constant.seo.logoUrl;
  };
  const getMediaImageAltTag = () => {
    return ogImageAltTag ? ogImageAltTag : constant.seo.ogImageDefaulAltTag;
  };
  const getMediaType = (site) => {
    switch (site) {
      case 'facebook':
        return ogMediaType ? ogMediaType : constant.seo.ogType.website;
      case 'twitter':
        return ogMediaType ? ogMediaType : constant.seo.ogType.summary;
    }
  };
  return (
    <Helmet defaultTitle={`${getTitle()} | emresandikci.com`}>
      {/* site meta tags */}
      <meta name="description" content={getDescription()} />
      {isNoIndex ? <meta name="robots" content="noindex" /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {prevUrl ? <link rel="prev" href={prevUrl} /> : null}
      {nextUrl ? <link rel="next" href={nextUrl} /> : null}
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {/* site meta tags */}

      {/* twitter shareable link */}
      <meta name="twitter:card" content={getMediaType('twitter')} />
      <meta name="twitter:site" content={constant.seo.twitterUserName} />
      <meta name="twitter:domain" content={getMediaUrl()} />
      <meta name="twitter:image" content={getMediaImageUrl()} />
      <meta name="twitter:image:alt" content={getMediaImageAltTag()} />
      <meta name="twitter:title" content={getMediaTitle()} />
      <meta name="twitter:description" content={getMediaDescription()} />
      {/* twitter shareable link */}

      {/* facebook shareable link */}
      <meta property="og:url" content={getMediaUrl()} />
      <meta property="og:type" content={getMediaType('facebook')} />
      <meta property="og:title" content={getMediaTitle()} />
      <meta property="og:description" content={getMediaDescription()} />
      <meta property="og:image" content={getMediaImageUrl()} />
      {/* facebook shareable link */}

      {customMetaTags && customMetaTags}
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalUrl: PropTypes.string,
  prevUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  ogMediaType: PropTypes.string,
  customMetaTags: PropTypes.element,
  isNoIndex: PropTypes.bool,
};

Seo.defaultProps = {
  title: null,
  description: null,
  isNoIndex: null,
  canonicalUrl: null,
  prevUrl: null,
  nextUrl: null,
  ogTitle: null,
  ogDescription: null,
  ogImage: null,
  ogMediaType: null,
  customMetaTags: null,
};

export default Seo;
