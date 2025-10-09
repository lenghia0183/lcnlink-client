interface ShareOptions {
  url: string;
  title?: string;
  description?: string;
}

export const shareOnFacebook = ({ url }: ShareOptions): void => {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  window.open(facebookShareUrl, "_blank", "width=600,height=400");
};

export const shareOnTwitter = ({ url, title }: ShareOptions): void => {
  const text = title ? `${title} ${url}` : url;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;
  window.open(twitterShareUrl, "_blank", "width=600,height=400");
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  }
};
