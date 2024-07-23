const ShareButton = ({ speed }) => {
  const handleShare = () => {
    const url = `${window.location.origin}?speed=${speed}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard: " + url);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="bg-blue-700 text-white p-2 font-semibold rounded-sm mt-10"
    >
      Share
    </button>
  );
};

export default ShareButton;
