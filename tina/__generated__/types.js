export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomePartsFragmentDoc = gql`
    fragment HomeParts on Home {
  __typename
  seoTitle
  seoDescription
  announcement
  nav {
    __typename
    label
    href
  }
  headerCta {
    __typename
    label
    href
  }
  hero {
    __typename
    badge
    h1Line1
    h1Highlight
    h1Line3
    lead
    ctaPrimary {
      __typename
      label
      href
    }
    ctaSecondary {
      __typename
      label
      href
    }
    avatars
    socialProofCount
    socialProofText
    videoEmbed
    chipPrice
    chipPriceUnit
    chipNote
    handNote
  }
  marquee {
    __typename
    tools
    phrases
    forLabel
    platforms
  }
  entry01 {
    __typename
    eyebrow
    heading
    para1
    listTools
    para2
    cons
    para3
    question
    handNote
  }
  entry02 {
    __typename
    eyebrow
    heading
    para1
    para2
    para3
    cardALabel
    cardAText
    cardBLabel
    cardBText
    para4
    handNote
  }
  entry03 {
    __typename
    eyebrow
    heading
    beforeLabel
    beforeValue
    beforeUnit
    beforeText
    afterBadge
    afterLabel
    afterValue
    afterUnit
    afterText
    closer
  }
  programa {
    __typename
    eyebrow
    heading
    lead
    cards {
      __typename
      media
      type
      badge
      cornerTag
      title
      text
    }
    highlight {
      __typename
      badge
      title
      text
      media
    }
  }
  class01 {
    __typename
    eyebrow
    badge
    heading
    lead
    body
    media
    bullets
  }
  class02 {
    __typename
    eyebrow
    badge
    heading
    lead
    body
    media
    bullets
  }
  metrics {
    __typename
    value
    text
  }
  included {
    __typename
    heading
    headingHighlight
    lead
    items
    highlightItem
    cta {
      __typename
      label
      href
    }
    ctaNote
  }
  philosophy {
    __typename
    headingA
    headingB
    para1
    para2
    para3
  }
  notIs {
    __typename
    eyebrow
    heading
    cards {
      __typename
      title
      text
    }
    isText
  }
  testimonials {
    __typename
    eyebrow
    heading
    screenshots {
      __typename
      src
      alt
    }
    sliderNote
    quotes {
      __typename
      quote
      initials
      name
      role
    }
    cta {
      __typename
      label
      href
    }
  }
  certificate {
    __typename
    eyebrow
    heading
    para1
    para2
    para3
    cardBody
    founderName
    founderRole
  }
  founder {
    __typename
    eyebrow
    heading
    image
    imageAlt
    para1
    para2
    handNote
  }
  pricing {
    __typename
    eyebrow
    heading
    headingHighlight
    lead
    includesTitle
    includes
    bonusTitle
    bonuses
    totalValueLabel
    totalValue
    boxImage
    boxImageAlt
    boxTitle
    discountBadge
    anchorLabel
    anchorPrice
    price
    priceNote
    priceSub
    cta {
      __typename
      label
      href
    }
    guaranteeNote
    boxBullets
    boxFooter
  }
  guarantee {
    __typename
    days
    daysLabel
    heading
    para1
    para2
  }
  faq {
    __typename
    eyebrow
    heading
    items {
      __typename
      q
      a
    }
  }
  closing {
    __typename
    eyebrow
    heading
    body
    handNote
    cta {
      __typename
      label
      href
    }
    note
  }
  footer {
    __typename
    brandSuffix
    links {
      __typename
      label
      href
    }
    copyright
  }
  stickyBar {
    __typename
    price
    anchorPrice
    note
    cta {
      __typename
      label
      href
    }
  }
}
    `;
export const HomeDocument = gql`
    query home($relativePath: String!) {
  home(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeParts
  }
}
    ${HomePartsFragmentDoc}`;
export const HomeConnectionDocument = gql`
    query homeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeFilter) {
  homeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeParts
      }
    }
  }
}
    ${HomePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    home(variables, options) {
      return requester(HomeDocument, variables, options);
    },
    homeConnection(variables, options) {
      return requester(HomeConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/92034dbd-e458-48e0-8b06-c8e004a401c0/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
